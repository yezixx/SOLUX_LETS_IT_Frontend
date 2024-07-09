import Pagination from "react-js-pagination";
import paginationStyles from './Paging.module.css'
 
const Paging = ({ activePage, totalItemsCount, handlePageChange, itemsCountPerPage,pageRangeDisplayed}) => {
  return (
    <div>
      <Pagination
        activePage={activePage} //현재페이지
        itemsCountPerPage={itemsCountPerPage} //한 페이지당 보여줄 아이템 개수
        totalItemsCount={totalItemsCount} // 총 아이템 개수
        pageRangeDisplayed={pageRangeDisplayed} //paginator 페이지 범위
        prevPageText={"<"} // 이전을 나타낼 텍스트
        nextPageText={">"} // 이후를 나타낼 텍스트
        onChange={handlePageChange} //페이지 변경 핸들링

      //css 설정을 위한 className
        itemClass={paginationStyles['pagination-item']}
        linkClass={paginationStyles['pagination-link']}
        activeClass={paginationStyles['pagination-active']}
        disabledClass={paginationStyles['pagination-disabled']}
        innerClass={paginationStyles['pagination-container']}
      />
    </div>
  );
};
 
export default Paging;