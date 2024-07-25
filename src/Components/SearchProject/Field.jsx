import styles from "./Field.module.css";
import SearchIcon from "../../Image/Icons/SearchIcon";
import Button from "../Button/Button";
import Stack from "./GrayBox";

const f = ["웹", "앱", "인공지능", "데이터 분석", "클라우드"];
const s = ["React", "Javascript", "Java", "Python", "Spring"];

const Field = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchContainer__field}>
          <h1 className={styles.title}>개발 분야</h1>
          <div className={styles.nav__searchBar_container}>
            <div className={styles.nav__searchBar}>
              <input
                className={styles.nav__searchbar_input}
                placeholder="개발 분야 검색"
              ></input>
              <button className={styles.nav__searchIcon}>
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className={styles.listWrap}>
            {/*프로젝트 찾으면 나오는 회색 타원 */}
            {f.map((tech, index) => (
              <Stack tech={tech} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.searchContainer__stack}>
          <h1 className={styles.title}>필요 스택</h1>
          <div className={styles.nav__searchBar_container}>
            <div className={styles.nav__searchBar}>
              <input
                className={styles.nav__searchbar_input}
                placeholder="스택 검색"
              ></input>
              <button className={styles.nav__searchIcon}>
                <SearchIcon />
              </button>
            </div>
          </div>
          {/*프로젝트 찾으면 나오는 회색 타원 */}
          <div className={styles.listWrap}>
            {s.map((tech, index) => (
              <Stack tech={tech} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/*검색 버튼 */}
      <div className={styles.searchbtn}>
        <Button text="검색" height="40px" borderRadius="8px" />
      </div>
    </div>
  );
};

export default Field;
