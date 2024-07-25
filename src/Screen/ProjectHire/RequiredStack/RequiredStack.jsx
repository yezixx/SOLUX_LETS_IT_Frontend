import { useState } from "react";
import SearchIcon from "../../../Image/Icons/SearchIcon";
import { Stack } from "../../Stack";
import styles from "./RequiredStack.module.css";

const RequiredStack = () => {
  /*검색창에 focus 시에만 연관검색어를 보여주도록 설정*/
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    // Delay to allow clicking on the search result before losing focus
    setTimeout(() => {
      setIsFocus(false);
    }, 100);
  };
  /*검색한 value 값 searchValue state에 담음 */
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const data = Stack.filter(
    //소문자로 비교 시 같은 것만 배열에 담음
    (item) =>
      searchValue === ""
        ? Stack.slice(0, 5)
        : item.toLowerCase().includes(searchValue.toLowerCase())
  );
  /*검색한 값 클릭 시 스택 컴포넌트 만들어짐 */
  return (
    <div className={styles.projectHire__requiredStack}>
      <div className={styles.projectHire__subTitle}>필요스택</div>
      <div className={styles.projectHire__detail}>
        <input
          name="stack"
          onChange={handleSearch}
          className={styles.projectHire__inputStyle2}
          placeholder="JavaScript"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={styles.projectHire__searchIcon}>
          <SearchIcon />
        </div>
      </div>
      {isFocus && (
        <ul className={styles.projectHire__relatedSearch}>
          {/*미리 필터링된 데이터 중 일부만 연관검색어에 보여줌 */}
          {data.slice(0, 5).map((item, idx) => (
            <li key={idx} className={styles.projectHire__relatedSearchItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequiredStack;
