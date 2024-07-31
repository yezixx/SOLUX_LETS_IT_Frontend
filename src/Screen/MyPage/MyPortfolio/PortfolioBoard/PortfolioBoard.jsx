import Button from "../../../../Components/Button/Button";
import styles from "./PortfolioBoard.module.css";
import { useEffect, useState } from "react";
import Paging from "../../../../Components/Paging/Paging";
import { useNavigate, useParams } from "react-router-dom";
import { getMyPortfolios } from "../../../../service/portfolioService";
// import { userAtom } from "../../../../atoms/atoms";

const PortfolioBoard = () => {
  const navigate = useNavigate();

  // const { prjId } = useParams();
  const { teamId } = useParams();
  console.log(teamId);
  // //클릭 핸들링
  // const handleClickCount = ()=>{
  //   incrementClickCount
  //   .then((res)=>
  //     {console.log('count 횟수 증가')

  //     })
  //   .catch((error)=>console.log(`count 증가 시 오류 발생 : ${error}`))
  // }
  //포트폴리오 리스트업
  const [portfolioList, setPortfolioList] = useState([]);
  useEffect(() => {
    getMyPortfolios(teamId)
      .then((res) => {
        console.log(res.data);
        setPortfolioList(res.data);
        console.log(portfolioList);
      })
      .catch((error) => alert(`에러가 발생했습니다 : ${error}`));
  }, [setPortfolioList]);

  /*페이지네이션 */
  //현재 페이지
  const [activePage, setActivePage] = useState(1);
  //한 페이지 당 보여줄 아이템 개수
  const itemsCountPerPage = 10;
  //페이지네이션 한 번에 몇 번까지 보여줄 건지
  const pageRangeDisplayed = 5;
  //페이지 변경 핸들링 함수
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  //실제 렌더링할 데이터 (data를 슬라이스 함 0-9 / 10-19..)
  const renderData = portfolioList.slice(
    (activePage - 1) * itemsCountPerPage,
    activePage * itemsCountPerPage
  );

  return (
    <div className={styles.PortfolioBoard__contentWrap}>
      {/*포트폴리오명 */}
      <div className={styles.PorfolioBoard__portfolioTitle}>프로젝트 명</div>

      {/*포트폴리오 리스트 */}
      <ul className={styles.PortfolioBoard__table}>
        {/*행 제목 : 순번, 제목, 작성 일자 */}
        <li>
          <ul className={styles.PortfolioBoard__rowHeader}>
            <li className={styles.PortfolioBoard__headerCell}>순번</li>
            <li className={styles.PortfolioBoard__headerCell}> 제목</li>
            <li className={styles.PortfolioBoard__headerCell}>작성 일자</li>
          </ul>
        </li>

        {/*포트폴리오 data 순회(renderData-몇 개씩 출력할 건지 계산된), li 로 출력*/}
        {renderData.map((data, idx) => (
          <li key={data.prtId}>
            <ul className={styles.PortfolioBoard__list}>
              <li className={styles.PortfolioBoard__cell}>
                {idx + (activePage - 1) * itemsCountPerPage}
              </li>
              <li
                onClick={() => navigateTo(`detail/${data.prtId}`)}
                className={styles.PortfolioBoard__cell}
              >
                {data.prtTitle}
              </li>
              <li className={styles.PortfolioBoard__cell}>
                {data.prtCreateDate}
              </li>
              <Button text="수정" type="NONE__TEXT-MC2-16" />
            </ul>
          </li>
        ))}
      </ul>

      <div className={styles.PortfolioBoard__btnWrap}>
        <Button
          onClick={() => {
            navigate(`/mypage/portfolio/post/summaryAI/${teamId}`);
          }}
          text="AI포트폴리오"
          type="741EFF_150x40"
        />
        <Button
          onClick={() => {
            navigate(`/mypage/portfolio/post/${teamId}`);
          }}
          text="글쓰기"
        />
      </div>

      <Paging
        activePage={activePage} //현재 페이지
        totalItemsCount={portfolioList.length} //전체 data의 개수
        itemsPerPage={itemsCountPerPage} //페이지 당 보여줄 아이템 개수
        handlePageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
      />
    </div>
  );
};

export default PortfolioBoard;
