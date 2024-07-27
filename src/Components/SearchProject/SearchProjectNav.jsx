import React, { useState, useEffect } from 'react';
import styles from './SearchProjectNav.module.css';
import ProjectList from './ProjectList';
import useArea from '../../Hooks/useArea.jsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { postProjectAtom } from '../../atoms/atoms';

const SearchProjectNav = () => {
  const { selectedArea, selectedSubAreas } = useArea();
  const navCont = ["최신순", "스크랩순", "조회순"];
  const OnOff = ["대면", "비대면"];

  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [selectedOnOff, setSelectedOnOff] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("전체");

  const { stack: selectedStacks, field: selectedFields } = useAtomValue(postProjectAtom);
  const resetPostProjectAtom = useSetAtom(postProjectAtom); // 아톰 초기화 함수

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 필터 상태를 초기화합니다.
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

  const projects = [
    {
      title: "웹 사이드 프로젝트 팀원 모집",
      period: "1개월 미만",
      location: "경기 성남시",
      onoff: "대면",
      difficulty: "초급",
      stack: ["React", "spring", "R"],
      content: "1안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
      ageGroup: "20대",
      field: ["웹 프론트", "웹 백"]
    },
    {
      title: "앱 사이드 프로젝트 팀원 모집",
      period: "1개월~3개월",
      location: "서울 용산구",
      onoff: "대면",
      difficulty: "초급",
      stack: ["React", "spring"],
      content: "2안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
      ageGroup: "30대",
      field: ["앱 프론트"]
    },
    {
      title: "리액트 프로젝트 팀원 모집",
      period: "3개월~6개월",
      location: "서울 강남구",
      onoff: "대면",
      difficulty: "초급",
      stack: ["React", "spring", "JavaScript"],
      content: "3안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
      ageGroup: "대학생",
      field: ["웹 백"]
    },
    {
      title: "딥러닝 프로젝트 팀원 모집",
      period: "1년 이상",
      location: "경기 광명시",
      onoff: "비대면",
      difficulty: "초급",
      stack: ["R", "spring"],
      content: "4안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
      ageGroup: "40대 이상",
      field: ["앱 백"]
    },
  ];

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    console.log('Selected Difficulty:', e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    console.log('Selected Period:', e.target.value);
  };

  const handleOnOffChange = (menu) => {
    setSelectedOnOff(prev =>
      prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]
    );
    console.log('Selected OnOff:', menu);
  };

  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
    console.log('Selected Age Group:', e.target.value);
  };

  const filteredProjects = projects.filter((project) => {
    const areaMatch = selectedArea ? project.location.startsWith(selectedArea.name) : true;
    const subAreaMatch = selectedSubAreas.length === 0 || selectedSubAreas.some(sub => project.location.includes(sub));
    const difficultyMatch = selectedDifficulty === "전체" || project.difficulty === selectedDifficulty;
    const periodMatch = selectedPeriod === "전체" || project.period === selectedPeriod;
    const onOffMatch = selectedOnOff.length === 0 || selectedOnOff.includes(project.onoff);
    const ageGroupMatch = selectedAgeGroup === "전체" || project.ageGroup === selectedAgeGroup;

    // Check if all selectedFields are included in project.field, case-insensitive
    const fieldMatch = selectedFields.length === 0 || selectedFields.every(field =>
      project.field.map(f => f.toLowerCase()).includes(field.toLowerCase())
    );

    // Check if all selectedStacks are included in project.stack, case-insensitive
    const stackMatch = selectedStacks.length === 0 || selectedStacks.every(stack =>
      project.stack.map(s => s.toLowerCase()).includes(stack.toLowerCase())
    );

    console.log('Filtering:', project.title, areaMatch, subAreaMatch, difficultyMatch, periodMatch, onOffMatch, ageGroupMatch, fieldMatch, stackMatch);

    return areaMatch && subAreaMatch && difficultyMatch && periodMatch && onOffMatch && ageGroupMatch && fieldMatch && stackMatch;
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
              <button className={styles.nav2__button}>{menu}</button>
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
            <select value={selectedDifficulty} onChange={handleDifficultyChange}>
              <option value="" disabled>난이도</option>
              <option value="전체">전체</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>
          <div className={styles.dropdownGroup}>
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="" disabled>예상 기간</option>
              <option value="전체">전체</option>
              <option value="1개월 미만">1개월 미만</option>
              <option value="1개월~3개월">1개월~3개월</option>
              <option value="3개월~6개월">3개월~6개월</option>
              <option value="6개월~1년">6개월~1년</option>
              <option value="1년 이상">1년 이상</option>
            </select>
          </div>
          <div className={styles.dropdownGroup}>
            <select value={selectedAgeGroup} onChange={handleAgeGroupChange}>
              <option value="" disabled>연령대</option>
              <option value="전체">전체</option>
              <option value="20대 미만">20대 미만</option>
              <option value="대학생">대학생</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대 이상">40대 이상</option>
            </select>
          </div>
        </div>
      </div>

      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default SearchProjectNav;
