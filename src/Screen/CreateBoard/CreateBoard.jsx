import Button from "../../components/button/Button";
import MemberItem from "../../components/memberItem/MemberItem";
import CollabLinkForm from "../../components/collabLinkForm/CollabLinkForm";
import ProjNameForm from "../../components/projNameForm/ProjNameForm";
import styles from "./CreateBoard.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createTeam } from "../../service/teamService";
import { approveApplicants } from "../../service/applyService";
import Loading from "../../components/loading/Loading";
import { getPosts } from "../../service/postService";

const mock_members = [
  {
    applyId: 0,
    nickname: "",
    profileImage: ""
  }
];
const init_collabLinks = [
  {
    id: 1,
    tool: "notion",
    link: ""
  },
  {
    id: 2,
    tool: "github",
    link: ""
  }
];

const CreateBoard = () => {
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState(init_collabLinks);
  const [applicantsList, setApplicantsList] = useState(mock_members);

  const [params] = useSearchParams();
  const postId = params.get("post");
  const [postInfo, setPostInfo] = useState({});

  const titleRef = useRef();
  const linkRef1 = useRef();
  const linkRef2 = useRef();

  const fetchApplicants = async (postId) => {
    try {
      const response = await approveApplicants(postId);
      await setApplicantsList(response.data);
      if (response.data.length === 0) {
        alert("팀원이 없습니다. 팀원을 추가해주세요.");
        nav(-1, { replace: true });
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      alert("팀원 목록을 불러오는데 실패했습니다. 다시 시도해주세요.");
      nav(-1, { replace: true });
    }
  };

  const fetchPostInfo = async (postId) => {
    try {
      const response = await getPosts(postId);
      await setPostInfo(response.data);
      if (response.data.userId !== loginUserId) {
        alert("게시글 작성자만 팀게시판을 생성할 수 있습니다.");
        nav(-1, { replace: true });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post info:", error);
      alert("게시글 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      nav(-1, { replace: true });
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchApplicants(postId);
      fetchPostInfo(postId);
    }, 1000);
  }, []);

  const onFocusElement = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleCreate = async (postId, newTeamData) => {
    try {
      const response = await createTeam(postId, newTeamData);
      return response.data; // 서버로부터 받은 teamID 반환
    } catch (error) {
      console.error("Error creating team:", error);
      return null; // 오류 발생 시 null 반환
    }
  };

  const onClickCreate = async () => {
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
      githubLink: links[1].link
    };
    if (confirm("팀게시판을 생성하시겠습니까?")) {
      const teamID = await handleCreate(postId, newTeamData);
      console.log(teamID);
      if (teamID) {
        // 정상적으로 teamID를 받았을 때
        nav(`/teamboard/?team=${teamID}`);
      } else {
        // teamID를 받지 못했을 때
        alert("팀 생성에 실패했습니다. 다시 시도해주세요.");
      }
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
      {loading && <Loading />}
      {/*팀게시판 생성*/}
      <div className={styles.createBoard__wrap}>
        {/*제목 */}
        <div className={styles.createBoard__title}>팀게시판 생성</div>
        {/*팀게시판 생성 */}
        <div className={styles.createBoard__cont}>
          {/*팀원 리스트 */}
          <div className={styles.createBoard__memberItem}>
            <div className={styles.createBoard__innerLabel}>팀원</div>
            {!loading &&
              applicantsList.map((member, index) => (
                <MemberItem
                  key={index}
                  memberName={member.nickname}
                  profilePic={member.profileImage}
                />
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
