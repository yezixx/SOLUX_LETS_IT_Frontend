import styles from "./MainTitle.module.css";
import Logo from "../../../assets/logo.svg?react";
import SearchIcon from "../../../Image/Icons/SearchIcon";

const MainTitle = () => {
  return (
    // eslint-disable-next-line react/jsx-key

    <div className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.h2}>토이 프로젝트부터 공모전까지!</div>
        <Logo width="340px" height="130px" />
        <div className={styles.nav__searchBar_container}>
          <div className={styles.nav__searchBar}>
            <input
              className={styles.nav__searchbar_input}
              placeholder="프로젝트부터 포트폴리오까지!"
            ></input>
            <button className={styles.nav__searchIcon}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
