import Button from "../../../Components/Button/Button";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import CollabLinkForm from "../../../Components/CollabLinkForm/CollabLinkForm";
import ProjNameForm from "../../../Components/ProjNameForm/ProjNameForm";
import styles from "./CreateBoard.module.css";

const CreateBoard = () => {
  const members = [
    { id: 1, name: "유밍 BE" },
    { id: 2, name: "도라" },
    { id: 3, name: "Tom BE" },
  ];

  return (
    <div className={styles.createBoard}>
      {/*진행 중인 프로젝트 + 팀원 평가*/}
      <div className={styles.createBoard__contWrap}>
        {/*진행중인 프로젝트 */}
        <div className={styles.createBoard__ongoingproj}>
          {/*제목 */}
          <div className={styles.createBoard__title}>팀게시판 생성</div>
          {/*팀게시판 생성 */}
          <div className={styles.createBoard__cont}>
            {/*팀원 리스트 */}
            <div className={styles.createBoard__memberItem}>
              <div className={styles.createBoard__innerLabel}>팀원</div>
              {members.map((member) => (
                <MemberItem key={member.id} memberName={member.name} />
              ))}
            </div>
            {/*프로젝트명 */}
            <div className={styles.createBoard__projName}>
              <ProjNameForm />
            </div>
            {/*협업툴 링크 */}
            <div className={styles.createBoard__linkForm}>
              <CollabLinkForm />
            </div>
            {/*생성 버튼 */}
            <div className={styles.createBoard__button}>
              <Button text="생성" type="RAD-10__FONT-M" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
