import useHover from "../../../Hooks/useHover";
import QuestionMarkIcon from "../../../Image/Icons/QuestionMarkIcon";
import GraphBar from "../../Graph/GraphBar";
import ProfileToolTip from "../Profile__ToolTip/ProfileTooltip";
import { tierColor } from "../ProfileTierMap";
import styles from "./ProfileTier.module.css";

const ProfileTier = ({ tierScore, tooltipShow }) => {
  const { ishovered, handleMouseEnter, handleMouseLeave } = useHover();
  //tierScore에 따른 색상 매핑

  return (
    <div className={styles.myProfile__tier}>
      {/*매너티어 - title */}
      <div className={styles.myProfile__title}>
        매너
        <span>티어</span>
        {/*물음표 표시, hover 시 tooltip 생성 */}
        <div
          className={styles.questionmark}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {tooltipShow && <QuestionMarkIcon width="15px" height="15px" />}
        </div>
        {/*물음표 표시, hover 시 tooltip 생성 */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.myProfile__tooltip}
        >
          {tooltipShow && ishovered && <ProfileToolTip />}
        </div>
        {/*스킬 그래프 */}
      </div>
      <div className={styles.myProfile__tier__graph}>
        {tierScore && (
          <GraphBar
            showNumbers="true"
            borderRadius="100px"
            bgc={tierColor(tierScore)}
            color={tierColor(tierScore)}
            value={tierScore}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileTier;
