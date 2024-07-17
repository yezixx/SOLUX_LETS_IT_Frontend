import styles from "./ProfileToolTip.module.css";
import TierA from "../../../assets/Tier/tier_A.svg?react";
import TierB from "../../../assets/Tier/tier_B.svg?react";
import TierC from "../../../assets/Tier/tier_C.svg?react";
import TierS from "../../../assets/Tier/tier_S.svg?react";
import TierF from "../../../assets/Tier/tier_F.svg?react";

const ProfileToolTip = () => {
  return (
    <div className={styles.ProfileToolTip}>
      <div className={styles.ProfileToolTip__tierWrap}>
        <TierS width="40px" height="40px" />
        <TierA width="40px" height="40px" />
        <TierB width="40px" height="40px" />
        <TierC width="40px" height="40px" />
        <TierF width="40px" height="40px" />
      </div>
      <div className={styles.ProfileToolTip__detail}>
        사용자가 참여했던 프로젝트의 팀원 평가, 신고 횟수 등을 분석하여 수치화한
        매너 점수를 등급으로 환산합니다
      </div>
    </div>
  );
};
export default ProfileToolTip;
