import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";

const ProjInfo = () => {
  return (
    <div className={styles.proj_info__wrapper}>
      <div className={styles.calendar__wrapper}>
        <TeamCalendar />
      </div>
      <div className={styles.right__wrapper}>
        <div className={styles.member_list__wrapper}>
          <MemberList />
        </div>
        <div className={styles.buttons__wrapper}>
          <div className={styles.collab_tools_container}>
            <CollabTool />
            <CollabTool />
          </div>
          <div className={styles.right_bottom_buttons__container}>
            <button className={styles.portfolio__button}>포트폴리오</button>
            <button className={styles.authmeeting__button}>회의 인증</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
