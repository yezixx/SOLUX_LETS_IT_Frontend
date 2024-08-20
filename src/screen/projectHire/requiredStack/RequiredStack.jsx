import { useEffect } from "react";
import SearchIcon from "../../../image/icons/SearchIcon";
import { Stack } from "../../Stack";
import styles from "./RequiredStack.module.css";
import GrayBox from "../../../components/grayBox/GrayBox.jsx";
import { useSearch } from "../../../hooks/useSearch";
import { useAtomValue, useSetAtom } from "jotai";
import { postProjectAtom } from "../../../store/atom.js";

const RequiredStack = ({ errors }) => {
  /*프로젝트 search 훅 */
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
  /*x누를 시 데이터 없애기 */

  /*백엔드에 보낼 데이터에 push */
  const setPostProj = useSetAtom(postProjectAtom);
  const postProj = useAtomValue(postProjectAtom);
  useEffect(() => {
    //tech가 변경될 시 백엔드에 보낼 데이터 재렌더링
    setPostProj((prev) => ({
      ...prev,
      stack: [...tech]
    }));
  }, [tech, setPostProj]);

  return (
    <div className={styles.projectHire__requiredStack}>
      <div className={styles.projectHire__subTitle}>필요스택</div>
      <div className={styles.projectHire__detail}>
        <input
          name="stack"
          onChange={handleSearch}
          className={`${errors["stack"] ? styles.formError : ""} ${
            styles.projectHire__inputStyle2
          }`}
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
            <li
              key={idx}
              onMouseDown={() => handleCreateBox(item)}
              className={styles.projectHire__relatedSearchItem}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {/*만들어진 graybox wrap */}
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

export default RequiredStack;
