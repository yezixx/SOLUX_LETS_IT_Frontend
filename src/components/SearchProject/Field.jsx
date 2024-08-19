import styles from "./Field.module.css";
import SearchIcon from "../../Image/Icons/SearchIcon";
import Button from "../Button/Button";
import Stack from "./GrayBox";
import SearchField from "./SearchField"
import SearchStack from "./SearchStack"
const f = ["웹", "앱", "인공지능", "데이터 분석", "클라우드"];
const s = ["React", "Javascript", "Java", "Python", "Spring"];

const Field = () => {
  return (
    <div className={styles.container}>
     
            <SearchField/>    
            <SearchStack/>
      
    </div>
    
  );
};

export default Field;
