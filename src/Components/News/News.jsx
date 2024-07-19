

import React from 'react';
import NewsList from './NewsList';
import styles from './News.module.css';
import ReactDOM from 'react-dom';

function News() {
  const news = [
    { title: '웹 사이드 프로젝트 팀원 모집',
      content: '뉴스 세부내용 입니다.뉴스 세부내용 입니다.뉴스 세부내용 입니다.뉴스 세부내용 입니다.'},

      { title: '웹 사이드 프로젝트 팀원 모집',
        content: '뉴스 세부내용 입니다.뉴스 세부내용 입니다.뉴스 세부내용 입니다.뉴스 세부내용 입니다.'},

  ];




    
    return (
        
        <div>
      <div className={styles.text}>지금 뜨고있는 뉴스레터 📝</div>
      <div><NewsList news={news}/></div>
    </div>
    );}


export default News;
