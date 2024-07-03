import CollabLink from "./CollabLink/CollabLink";
import styles from "./UpdateProj.module.css";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import ProjNameForm from "./ProjNameForm/ProjNameForm";

const UpdateProj = () => {
  const collabLinks = [
    {
      id: 0,
      link: "http://github.com",
    },
    {
      id: 1,
      link: "http://www.notion.org",
    },
    {
      id: 2,
      link: "https://www.atlassian.com/software/jira",
    },
  ];

  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  const nav = useNavigate();

  const navigateToManage = () => {
    nav("/manage");
  };

  const navigateToFeedback = () => {
    nav("/feedback");
  };

  return (
    <div className={styles.updateProj}>
      <div className={styles.updateProj__label}>프로젝트 정보 수정</div>
      <div className={styles.updateProj__top}>
        <ProjNameForm />
      </div>
      <div className={styles.updateProj__middle}>
        <div className={styles.updateProj__innerLabel}>협업툴 링크</div>
        <div className={styles.updateProj__linkItem}>
          {collabLinks.map((link) => (
            <CollabLink key={link.id} link={link.link} />
          ))}
        </div>
        <button className={styles.updateProj__addButton}>+ 추가</button>
      </div>
      <div className={styles.updateProj__bottom}>
        <div className={styles.updateProj__innerLabel}>팀장 위임</div>
        <div className={styles.updateProj__bottomInner}>
          <div className={styles.updateProj__item}>
            {members.map((member) => (
              <MemberItem key={member.id} memberName={member.name} />
            ))}
          </div>
          <div className={styles.updateProj__saveButton}>
            <Button
              text={"저장"}
              type={"MC2_120x40"}
              onClick={navigateToManage}
            />
          </div>
        </div>
        <button
          className={styles.updateProj__finishButton}
          onClick={navigateToFeedback}
        >
          프로젝트 종료
        </button>
      </div>
    </div>
  );
};

export default UpdateProj;
