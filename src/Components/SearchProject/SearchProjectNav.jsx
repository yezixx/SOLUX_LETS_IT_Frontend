// SearchProjectNav.js
import React from 'react';
import styles from './SearchProjectNav.module.css';
import ProjectList from './ProjectList';
import useArea from '../../Hooks/useArea.jsx';

const SearchProjectNav = () => {
  const { selectedArea, selectedSubAreas } = useArea();

  const projects = [
    {
      title: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "경기 성남시",
      onoff: "오프라인",
      difficulty: "초급",
      stack: ["react", "spring", "R"],
      content:
        "1안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
    },

    {
      title: "앱 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "서울 용산구",
      onoff: "오프라인",
      difficulty: "초급",
      stack: ["react", "spring"],
      content:
        "2안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
    },

    {
      title: "리액트 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "서울 강남구",
      onoff: "오프라인",
      difficulty: "초급",
      stack: ["react", "spring"],
      content:
        "3안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
    },

    {
      title: "딥러닝 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "경기 광명시",
      onoff: "오프라인",
      difficulty: "초급",
      stack: ["react", "spring"],
      content:
        "4안녕하세요, 저희는 숙명여자대학교 IT공학전공 5명으로 구성된 팀입니다. 현재 백엔드 2명, 프론트엔드 2명이 참여 중이며, 프론트엔드 개발자 분을 우선적으로 모집하려고 합니다.",
    },

  ];

  const filteredProjects = projects.filter((project) => {
    if (!selectedArea) return true;
    const areaMatch = project.location.startsWith(selectedArea.name);
    const subAreaMatch = selectedSubAreas.length === 0 || selectedSubAreas.some(sub => project.location.includes(sub));
    return areaMatch && subAreaMatch;
  });

  return (
    <div className={styles.searchProjWrap}>
      <div className={styles.list}>
        <ProjectList projects={filteredProjects} />
      </div>
    </div>
  );
};

export default SearchProjectNav;
