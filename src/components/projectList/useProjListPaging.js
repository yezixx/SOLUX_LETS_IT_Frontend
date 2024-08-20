import { useState } from "react";

const useProjListPaging = () => {
  //현재 페이지
  const [activePage, setActivePage] = useState(1);

  //한 페이지 당 보여줄 아이템 개수
  const itemsCountPerPage = 5;

  //페이지네이션 한 번에 몇 번까지 보여줄 건지
  const pageRangeDisplayed = 5;

  //페이지 변경 핸들링 함수
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return {
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed,
    handlePageChange
  };
};
export default useProjListPaging;
