// components/SearchStack.js
import React, { useEffect } from "react";
import { useFilter } from "../../screen/searchProject/FilterContext";
import SearchIcon from "../../image/icons/SearchIcon";
import { Stack } from "../../screen/Stack";
import styles from "./SearchStack.module.css";
import GrayBox from "../grayBox/GrayBox";
import { useSearch } from "../../hooks/useSearch";

const SearchStack = () => {
  /* 프로젝트 search 훅 */
  const {
    isFocus,
    handleFocus,
    handleBlur,
    handleSearch,
    handleCreateBox,
    deleteGrayBox,
    data,
    tech
  } = useSearch(Stack);

  /* FilterContext에서 상태 관리 */
  const { selectedStacks, setSelectedStacks } = useFilter();

  useEffect(() => {
    // tech가 변경될 시 FilterContext의 selectedStacks 업데이트
    setSelectedStacks([...tech]);
  }, [tech, setSelectedStacks]);

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
        {isFocus && (
          <ul className={styles.projectHire__relatedSearch}>
            {data.slice(0, 5).map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleCreateBox(item)}
                className={styles.projectHire__relatedSearchItem}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.projectHire__techWrap}>
        {tech.map((item, idx) => (
          <GrayBox
            key={idx}
            showX={true}
            onClick={() => deleteGrayBox(item)}
            tech={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchStack;
