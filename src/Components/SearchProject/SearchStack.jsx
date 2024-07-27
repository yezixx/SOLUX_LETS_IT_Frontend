import { useEffect } from "react";
import SearchIcon from "../../Image/Icons/SearchIcon";
import { Stack } from "../../Screen/Stack";
import styles from "./SearchStack.module.css";
import GrayBox from "../../Components/SearchProject/GrayBox";
import { useSearch } from "../../Hooks/useSearch";
import { useAtomValue, useSetAtom } from "jotai";
import { postProjectAtom } from "../../atoms/atoms";

const SearchStack = () => {
  /*프로젝트 search 훅 */
  const {
    isFocus,
    handleFocus,
    handleBlur,
    handleSearch,
    handleCreateBox,
    deleteGrayBox,
    data,
    tech,
  } = useSearch(Stack);

  /*백엔드에 보낼 데이터에 push */
  const setPostProj = useSetAtom(postProjectAtom);
  useEffect(() => {
    //tech가 변경될 시 백엔드에 보낼 데이터 재렌더링
    setPostProj((prev) => ({
      ...prev,
      stack: [...tech],
    }));
  }, [tech, setPostProj]);

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
