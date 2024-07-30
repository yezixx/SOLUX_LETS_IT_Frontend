import React, { useState, useEffect } from 'react'; // useEffect 추가
import styles from './SearchProjectNav.module.css';
import ProjectList from './ProjectList';
import useArea from '../../Hooks/useArea.jsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { postProjectAtom } from '../../atoms/atoms';
import { getPostsList } from '../../service/postService.js';
import QuestionMarkIcon from '../../Image/Icons/QuestionMarkIcon.jsx';
import useHover from '../../Hooks/useHover.js';

const SearchProjectNav = () => {
  const { selectedArea, selectedSubAreas } = useArea();
  const navCont = ["최신순", "스크랩순", "조회순"];
  const OnOff = ["대면", "비대면"];
  const { ishovered, handleMouseEnter, handleMouseLeave } = useHover();

  const [projects, setProjects] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [selectedOnOff, setSelectedOnOff] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("전체");
  const [sortCriteria, setSortCriteria] = useState("최신순");
  const [noResults, setNoResults] = useState(false); // 조건에 맞는 프로젝트가 없는지 여부를 나타내는 상태

  const { stack: selectedStacks, field: selectedFields } = useAtomValue(postProjectAtom);
  const resetPostProjectAtom = useSetAtom(postProjectAtom);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPostsList();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    return () => {
      resetPostProjectAtom({
        stack: [],
        field: [],
      });
      setSelectedDifficulty("전체");
      setSelectedPeriod("전체");
      setSelectedOnOff([]);
      setSelectedAgeGroup("전체");
    };
  }, [resetPostProjectAtom]);

  useEffect(() => {
    // 필터링된 프로젝트가 없을 경우 noResults 상태를 true로 설정
    setNoResults(filteredProjects.length === 0);
  }, [projects, selectedArea, selectedSubAreas, selectedDifficulty, selectedPeriod, selectedOnOff, selectedAgeGroup, selectedFields, selectedStacks]);

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleOnOffChange = (menu) => {
    setSelectedOnOff(prev => {
      const newSelected = prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu];
      return newSelected;
    });
  };

  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const filteredProjects = projects.filter((project) => {
    const areaMatch = selectedArea ? project.region.startsWith(selectedArea.name) : true;
    const subAreaMatch = selectedSubAreas.length === 0 || selectedSubAreas.some(sub => project.subRegion.includes(sub));
    const difficultyMatch = selectedDifficulty === "전체" || project.difficulty === selectedDifficulty;
    const periodMatch = selectedPeriod === "전체" || project.projectPeriod === selectedPeriod;
    const onOffMatch = selectedOnOff.length === 0 || selectedOnOff.includes(project.onOff);
    const ageGroupMatch = selectedAgeGroup === "전체" || project.ageGroup === selectedAgeGroup;

    const fieldMatch = selectedFields.length === 0 || selectedFields.every(field =>
      project.categoryId.map(f => f.toLowerCase()).includes(field.toLowerCase())
    );

    const stackMatch = selectedStacks.length === 0 || selectedStacks.every(stack =>
      project.stack.map(s => s.toLowerCase()).includes(stack.toLowerCase())
    );

    return areaMatch && subAreaMatch && difficultyMatch && periodMatch && onOffMatch && ageGroupMatch && fieldMatch && stackMatch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortCriteria === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortCriteria === "조회순") {
      return b.viewCount - a.viewCount;
    } else if (sortCriteria === "스크랩순") {
      return b.scrapCount - a.scrapCount;
    }
    return 0;
  });

  return (
    <div className={styles.searchProjWrap}>
      <div className={styles.nav2}>
        <div className={styles.nav2__container}>
          {navCont.map((menu, id) => (
            <div
              className={styles.nav2__contents}
              key={id}
            >
              <button
                className={`${styles.nav2__button} ${sortCriteria === menu ? styles.selected : ''}`}
                onClick={() => handleSortChange(menu)}
              >
                {menu}
              </button>
              {id < navCont.length - 1 && (
                <span className={styles.divider}>|</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.onoff__container}>
          {OnOff.map((menu, id) => (
            <div
              className={`${styles.onoff__contents} ${selectedOnOff.includes(menu) ? styles.selected : ''}`}
              key={id}
              onClick={() => handleOnOffChange(menu)}
            >
              <button className={`${styles.onoff__button} ${selectedOnOff.includes(menu) ? styles.selected : ''}`}>{menu}</button>
            </div>
          ))}
        </div>

        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownGroup}>
            <div className={styles.iconAndDropdown}>
              <div className={styles.questionmark}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}>
                <QuestionMarkIcon width="15px" height="15px" />
              </div>
              {ishovered && (
                <div className={styles.tooltip}>
                  <p>여기에는 난이도에 대한 설명이 표시됩니다.여기에는 난이도에 대한 설명이 표시됩니다.여기에는 난이도에 대한 설명이 표시됩니다.
                  여기에는 난이도에 대한 설명이 표시됩니다.여기에는 난이도에 대한 설명이 표시됩니다.여기에는 난이도에 대한 설명이 표시됩니다.
                  </p>
                </div>
              )}
              <select value={selectedDifficulty} onChange={handleDifficultyChange}>
                <option value="" disabled>난이도</option>
                <option value="전체">전체</option>
                <option value="입문">입문</option>
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
              </select>
            </div>
          </div>
          <div className={styles.dropdownGroup}>
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="" disabled>예상 기간</option>
              <option value="전체">전체</option>
              <option value="1개월">1개월</option>
              <option value="2개월">2개월</option>
              <option value="3개월">3개월</option>
              <option value="4개월">4개월</option>
            </select>
          </div>
          <div className={styles.dropdownGroup}>
            <select value={selectedAgeGroup} onChange={handleAgeGroupChange}>
              <option value="" disabled>연령대</option>
              <option value="전체">전체</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대 이상">40대 이상</option>
            </select>
          </div>
        </div>
      </div>

      {noResults ? (
        <div className={styles.noResultsMessage}>
          조건에 맞는 프로젝트가 없습니다.
        </div>
      ) : (
        <ProjectList projects={sortedProjects} />
      )}
    </div>
  );
};

export default SearchProjectNav;
