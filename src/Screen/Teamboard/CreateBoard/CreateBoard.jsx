import Button from "../../../Components/Button/Button";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import CollabLinkForm from "../../../Components/CollabLinkForm/CollabLinkForm";
import ProjNameForm from "../../../Components/ProjNameForm/ProjNameForm";
import styles from "./CreateBoard.module.css";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createTeam } from "../../../service/teamService";

const mock_members = [
  {
    userId: "letsit_backend.model.Member@72f9fde6",
    userName: "Alice",
    position: "Team_Leader",
  },
  {
    userId: "letsit_backend.model.Member@30b4fb38",
    userName: "Bob",
    position: "Team_Member",
  },
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

  const [params] = useSearchParams();
  const postId = params.get("post");

  const titleRef = useRef();
  const linkRef1 = useRef();
  const linkRef2 = useRef();

  const onFocusElement = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const onClickCreate = () => {
    if (title === "") {
      onFocusElement(titleRef);
      return;
    }
    if (links[0].link === "") {
      onFocusElement(linkRef1);
      return;
    }
    if (links[1].link === "") {
      onFocusElement(linkRef2);
      return;
    }
    const newTeamData = {
      teamName: title,
      notionLink: links[0].link,
      githubLink: links[1].link,
    };
    console.log(newTeamData);
    if (confirm("팀게시판을 생성하시겠습니까?")) {
      nav(`/teamboard/?team=${newTeamData.teamId}`);
      createTeam(postId, newTeamData);
    }
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
            {members.map((member, index) => (
              <MemberItem key={index} memberName={member.userName} />
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
              ref={[linkRef1, linkRef2]}
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
