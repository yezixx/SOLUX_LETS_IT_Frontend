// components/SearchField.js
import React, { useEffect } from "react";
import { useSearch } from "../../../hooks/useSearch";
import SearchIcon from "../../../image/icons/SearchIcon";
import { category } from "../../../util/categoryList";
import styles from "./SearchField.module.css";
import GrayBox from "../../../components/grayBox/GrayBox";
import { useFilter } from "../FilterContext";

const SearchField = () => {
  const {
    isFocus,
    handleFocus,
    handleBlur,
    handleSearch,
    handleCreateBox,
    deleteGrayBox,
    data,
    tech
  } = useSearch(Field);

  const { setSelectedCategoryIds, setSelectedStacks } = useFilter(); // Context 사용

  useEffect(() => {
    setSelectedCategoryIds([...tech]); // tech 데이터를 Context에 설정
  }, [tech, setSelectedCategoryIds]);

  return (
    <div className={styles.projectHire__requiredStack}>
      <div className={styles.projectHire__subTitle}>개발 분야</div>
      <div className={styles.projectHire__detail}>
        <input
          name="field"
          onChange={handleSearch}
          className={styles.projectHire__inputStyle2}
          placeholder="프론트엔드"
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
        {tech.map((item) => (
          <GrayBox
            showX={true}
            onClick={() => deleteGrayBox(item)}
            key={item}
            tech={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchField;
