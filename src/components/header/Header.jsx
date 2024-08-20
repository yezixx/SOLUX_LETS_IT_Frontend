import Nav from "./nav/Nav";
import Nav2 from "./nav2/Nav2";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Nav />
      <Nav2 />
    </div>
  );
};

export default Header;
