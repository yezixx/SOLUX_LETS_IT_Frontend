// components/SearchProjectNav.js
import React, { useState, useEffect } from "react";
import styles from "./SearchProjectNav.module.css";
import ProjectList from "../../../components/projectList/ProjectList.jsx";
import useArea from "../../../hooks/useArea.jsx";
import { useFilter } from "../FilterContext.jsx";
import { getPostsList } from "../../../service/postService.js";
import QuestionMarkIcon from "../../../image/icons/QuestionMarkIcon.jsx";
import useHover from "../../../hooks/useHover.js";

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
  const [noResults, setNoResults] = useState(false);

  const { selectedStacks, selectedCategoryIds } = useFilter();

  useEffect(() => {
    getPostsList()
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filteredProjects = (projects ? projects : []).filter((project) => {
      const areaMatch = selectedArea
        ? project.region.startsWith(selectedArea.name)
        : true;

      const subAreaMatch =
        selectedSubAreas.length === 0 ||
        selectedSubAreas.some((sub) => project.subRegion.includes(sub));

      const difficultyMatch =
        selectedDifficulty === "전체" ||
        project.difficulty === selectedDifficulty;

      const periodMatch =
        selectedPeriod === "전체" || project.projectPeriod === selectedPeriod;

      const onOffMatch =
        selectedOnOff.length === 0 || selectedOnOff.includes(project.onOff);

      const ageGroupMatch =
        selectedAgeGroup === "전체" || project.ageGroup === selectedAgeGroup;

      const fieldMatch =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.every((field) =>
          project.categoryId
            .map((f) => f.toLowerCase())
            .includes(field.toLowerCase())
        );

      const stackMatch =
        selectedStacks.length === 0 ||
        selectedStacks.every((stack) =>
          project.stack
            .map((s) => s.toLowerCase())
            .includes(stack.toLowerCase())
        );

      return (
        areaMatch &&
        subAreaMatch &&
        difficultyMatch &&
        periodMatch &&
        onOffMatch &&
        ageGroupMatch &&
        fieldMatch &&
        stackMatch
      );
    });

    setNoResults(filteredProjects.length === 0);
  }, [
    projects,
    selectedArea,
    selectedSubAreas,
    selectedDifficulty,
    selectedPeriod,
    selectedOnOff,
    selectedAgeGroup,
    selectedCategoryIds,
    selectedStacks
  ]);

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleOnOffChange = (menu) => {
    setSelectedOnOff((prev) => {
      const newSelected = prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu];
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
    const areaMatch = selectedArea
      ? project.region.startsWith(selectedArea.name)
      : true;

    const subAreaMatch =
      selectedSubAreas.length === 0 ||
      selectedSubAreas.some((sub) => project.subRegion.includes(sub));

    const difficultyMatch =
      selectedDifficulty === "전체" ||
      project.difficulty === selectedDifficulty;

    const periodMatch =
      selectedPeriod === "전체" || project.projectPeriod === selectedPeriod;

    const onOffMatch =
      selectedOnOff.length === 0 || selectedOnOff.includes(project.onOff);

    const ageGroupMatch =
      selectedAgeGroup === "전체" || project.ageGroup === selectedAgeGroup;

    const fieldMatch =
      selectedCategoryIds.length === 0 ||
      selectedCategoryIds.every((field) =>
        project.categoryId
          .map((f) => f.toLowerCase())
          .includes(field.toLowerCase())
      );

    const stackMatch =
      selectedStacks.length === 0 ||
      selectedStacks.every((stack) =>
        project.stack.map((s) => s.toLowerCase()).includes(stack.toLowerCase())
      );

    return (
      areaMatch &&
      subAreaMatch &&
      difficultyMatch &&
      periodMatch &&
      onOffMatch &&
      ageGroupMatch &&
      fieldMatch &&
      stackMatch
    );
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
            <div className={styles.nav2__contents} key={id}>
              <button
                className={`${styles.nav2__button} ${
                  sortCriteria === menu ? styles.selected : ""
                }`}
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
              className={`${styles.onoff__contents} ${
                selectedOnOff.includes(menu) ? styles.selected : ""
              }`}
              key={id}
              onClick={() => handleOnOffChange(menu)}
            >
              <button
                className={`${styles.onoff__button} ${
                  selectedOnOff.includes(menu) ? styles.selected : ""
                }`}
              >
                {menu}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownGroup}>
            <div className={styles.iconAndDropdown}>
              <div
                className={styles.questionmark}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <QuestionMarkIcon width="15px" height="15px" />
              </div>
              {ishovered && (
                <div className={styles.tooltip}>
                  <span>난이도</span>
                  <ul>
                    <li>입문 : 프로젝트 경험 0번</li>
                    <li>초급 : 프로젝트 경험 1~3번</li>
                    <li>중급 : 프로젝트 경험 4번 이상</li>
                    <li>고급 : 배포 경험 유</li>
                  </ul>
                </div>
              )}
              <select
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option value="" disabled>
                  난이도
                </option>
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
              <option value="" disabled>
                예상 기간
              </option>
              <option value="전체">전체</option>
              <option value="1개월">1개월</option>
              <option value="2개월">2개월</option>
              <option value="3개월">3개월</option>
              <option value="4개월">4개월</option>
            </select>
          </div>
          <div className={styles.dropdownGroup}>
            <select value={selectedAgeGroup} onChange={handleAgeGroupChange}>
              <option value="" disabled>
                연령대
              </option>
              <option value="전체">전체</option>
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대">60대 이상</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.list_wrap}>
        <ProjectList projects={sortedProjects} />
        {noResults && (
          <div className={styles.noResults}>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchProjectNav;
