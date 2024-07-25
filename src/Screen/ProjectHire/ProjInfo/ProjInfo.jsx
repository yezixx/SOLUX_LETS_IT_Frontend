import { KoreaArea } from "../../KoreaArea";
import useProjectPost from "../useProjectPost";
import styles from "./ProjInfo.module.css";
import { useProjInfo } from "./useProjInfo";

const ProjInfo = () => {
  const { selectedArea, handleSelectedArea, selectedAreaData } = useProjInfo();
  const { onChange, onClick } = useProjectPost();
  return (
    <div className="프로젝트 정보">
      <div className={styles.projectHire__subTitle}>프로젝트 정보</div>
      <div className={styles.projectHire__detail}>
        <select defaultValue="" name="method" onChange={onChange}>
          <option value="">진행방식</option>
          <option>대면</option>
          <option>비대면</option>
        </select>
        <select defaultValue="" name="level" onChange={onChange}>
          <option value="">난이도</option>
          <option>입문</option>
          <option>초급</option>
          <option>중급</option>
          <option>고급</option>
        </select>
        <select defaultValue="" name="projectPeriod" onChange={onChange}>
          <option value="">예상 기간</option>
          <option>1개월</option>
          <option>3개월</option>
          <option>6개월</option>
          <option>1년 이상</option>
        </select>
        <select defaultValue="" name="ageGroup" onChange={onChange}>
          <option value="">연령대</option>
          <option>10대</option>
          <option>20대</option>
          <option>30대</option>
          <option>40대 이상</option>
        </select>
      </div>
      {/* 지역 선택창 */}
      <div className={styles.projectHire__selectArea}>
        <select defaultValue="" name="regionId" onChange={handleSelectedArea}>
          {" "}
          {/* onChange 이벤트로 지역 선택 업데이트 */}
          <option value="">지역 선택</option>
          {KoreaArea.map((area, idx) => (
            <option key={idx} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        <div className={styles.projectHire__subArea}>
          {selectedAreaData &&
            selectedAreaData.subArea.map((subArea, idx) => (
              <button
                value={subArea}
                name="subRegionId"
                onClick={onClick}
                key={idx}
              >
                {subArea}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
