import styles from "./UpdateProj.module.css";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import ProjNameForm from "../../../Components/ProjNameForm/ProjNameForm";
import CollabLinkForm from "../../../Components/CollabLinkForm/CollabLinkForm";

const UpdateProj = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  const nav = useNavigate();

  const navigateToManage = () => {
    nav("/teamboard/manage");
  };

  const navigateToFeedback = () => {
    nav("/teamboard/feedback");
  };

  return (
    <div className={styles.updateProj}>
      <div className={styles.updateProj__label}>프로젝트 정보 수정</div>
      <div className={styles.updateProj__projName}>
        <ProjNameForm />
      </div>
      <div className={styles.updateProj__toolLink}>
        <CollabLinkForm type="SCROLL" />
      </div>
      <div className={styles.updateProj__delegation}>
        <div className={styles.updateProj__innerLabel}>팀장 위임</div>
        <div className={styles.updateProj__bottomInner}>
          <div className={styles.updateProj__members}>
            {members.map((member) => (
              <MemberItem key={member.id} memberName={member.name} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.updateProj__saveButton}>
        <Button text={"저장"} type={"MC2_120x40"} onClick={navigateToManage} />
      </div>
      <div className={styles.updateProj__finishButton}>
        <Button
          text="프로젝트 종료"
          type="NONE__TEXT-POINT"
          onClick={navigateToFeedback}
        />
      </div>
    </div>
  );
};

export default UpdateProj;
