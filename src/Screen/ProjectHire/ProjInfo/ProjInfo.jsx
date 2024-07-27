import { useState } from "react";
import { KoreaArea } from "../../KoreaArea";
import useProjectPost from "../useProjectPost";
import styles from "./ProjInfo.module.css";
import { useProjInfo } from "./useProjInfo";
import { useSetAtom } from "jotai";
import { postProjectAtom } from "../../../atoms/atoms";

const ProjInfo = ({ errors }) => {
  //ProjInfo 화면에서만 사용하는 훅
  const {
    onClick,
    handleSelectedArea,
    selectedAreaData,
    startSubRegion,
    isFace,
    handleIsFace,
    isSubRegSelected,
  } = useProjInfo();
  //select에 필요한 이벤트 핸들러 (폼 공통)
  const { onChange } = useProjectPost();
  //백엔드에 보낼 data
  const setPostProj = useSetAtom(postProjectAtom);
  // console.log(setPostProj)

  return (
    <div className="프로젝트 정보">
      <div className={styles.projectHire__subTitle}>프로젝트 정보</div>
      <div className={styles.projectHire__detail}>
        <select
          className={`${errors["onOff"] ? styles.formError : ""} `}
          defaultValue=""
          name="onOff"
          onChange={handleIsFace}
        >
          <option value="">진행방식</option>
          <option value="대면">대면</option>
          <option value="비대면">비대면</option>
        </select>
        <select
          className={`${errors["difficulty"] ? styles.formError : ""} `}
          defaultValue=""
          name="difficulty"
          onChange={onChange}
        >
          <option value="">난이도</option>
          <option>입문</option>
          <option>초급</option>
          <option>중급</option>
          <option>고급</option>
        </select>
        <select
          className={`${errors["projectPeriod"] ? styles.formError : ""} `}
          defaultValue=""
          name="projectPeriod"
          onChange={onChange}
        >
          <option value="">예상 기간</option>
          <option>1개월</option>
          <option>3개월</option>
          <option>6개월</option>
          <option>1년 이상</option>
        </select>
        <select
          className={`${errors["ageGroup"] ? styles.formError : ""} `}
          defaultValue=""
          name="ageGroup"
          onChange={onChange}
        >
          <option value="">연령대</option>
          <option>10대</option>
          <option>20대</option>
          <option>30대</option>
          <option>40대 이상</option>
        </select>
      </div>
      {/* 지역 선택창 */}
      {isFace && (
        <div className={styles.projectHire__selectArea}>
          <select
            className={`${errors["regionId"] ? styles.formError : ""} `}
            defaultValue=""
            name="regionId"
            onChange={handleSelectedArea}
          >
            {/* region 선택 */}
            <option value="">지역 선택</option>
            {KoreaArea.map((area, idx) => (
              <option key={idx} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
          {/*subRegion 선택 */}
          <div className={styles.projectHire__subArea}>
            {selectedAreaData &&
              selectedAreaData.subArea.map((subArea, idx) => (
                <button
                  className={`${
                    errors["subRegionId"] ? styles.formError : ""
                  } ${
                    isSubRegSelected[startSubRegion * 100 + (idx + 1)]
                      ? styles.selected
                      : styles.projectHire__subRegion
                  }`}
                  type="button"
                  value={startSubRegion * 100 + (idx + 1)}
                  name="subRegionId"
                  onClick={onClick}
                  key={idx}
                >
                  {subArea}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjInfo;
