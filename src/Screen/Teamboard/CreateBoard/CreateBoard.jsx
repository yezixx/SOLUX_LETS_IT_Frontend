import Button from "../../../Components/Button/Button";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import CollabLinkForm from "../../../Components/CollabLinkForm/CollabLinkForm";
import ProjNameForm from "../../../Components/ProjNameForm/ProjNameForm";
import styles from "./CreateBoard.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const mock_members = [
  { id: 1, userId: "yuming", name: "유밍 BE" },
  { id: 2, userId: "dora", name: "도라" },
  { id: 3, userId: "tom", name: "Tom BE" },
];
const mock_collabLinks = [
  {
    id: 1,
    tool: "notion",
    link: "",
  },
  {
    id: 2,
    tool: "github",
    link: "",
  },
];

const CreateBoard = () => {
  const nav = useNavigate();
  const members = mock_members;
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState(mock_collabLinks);

  const titleRef = useRef();

  const onFocusTitle = () => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  const onClickCreate = () => {
    if (title === "") {
      onFocusTitle();
      return;
    }
    if (links[0].link === "" || links[1].link === "") {
      alert(
        '협업툴 링크를 입력해주세요.\n이후 "프로젝트 관리 > 프로젝트 정보 수정"에서 변경가능합니다.'
      );
      return;
    }
    if (confirm("팀게시판을 생성하시겠습니까?")) nav("/teamboard");
  };

  const onChangeTitleForm = (input) => {
    if (input.length > 15) {
      return;
    }
    setTitle(input);
  };

  const onChangeUrlForm = (id, url) => {
    setLinks(
      links.map((item) =>
        String(item.id) === String(id) ? { ...item, link: url } : item
      )
    );
  };

  const onClickIcon = (id, tool) => {
    setLinks(
      links.map((item) =>
        String(item.id) === String(id) ? { ...item, tool: tool.tool } : item
      )
    );
  };

  console.log(links);

  return (
    <div className={styles.createBoard}>
      {/*팀게시판 생성*/}
      <div className={styles.createBoard__wrap}>
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
            <ProjNameForm
              title={title}
              onChange={onChangeTitleForm}
              ref={titleRef}
            />
          </div>
          {/*협업툴 링크 */}
          <div className={styles.createBoard__linkForm}>
            <CollabLinkForm
              links={links}
              onChange={onChangeUrlForm}
              onClick={onClickIcon}
            />
          </div>
          {/*생성 버튼 */}
          <div className={styles.createBoard__button}>
            <Button text="생성" type="RAD-10__FONT-M" onClick={onClickCreate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
