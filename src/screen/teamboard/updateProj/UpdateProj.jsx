import styles from "./UpdateProj.module.css";
import MemberItem from "../../../components/memberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import ProjNameForm from "../../../components/projNameForm/ProjNameForm";
import CollabLinkForm from "../../../components/collabLinkForm/CollabLinkForm";
import { useContext, useEffect, useRef, useState } from "react";
import { TeamDispatchContext, TeamStateContext } from "../Teamboard";
import { completeProject } from "../../../service/teamService";
import { isLeader } from "../isLeader";

const UpdateProj = () => {
  const { onUpdateTeamData } = useContext(TeamDispatchContext);
  const { teamData, teamId, loading } = useContext(TeamStateContext);

  const [title, setTitle] = useState(teamData.teamName);
  const [links, setLinks] = useState([
    { tool: "notion", link: teamData.notionLink },
    { tool: "github", link: teamData.githubLink }
  ]);
  const [selectedMember, setSelectedMember] = useState();

  const nav = useNavigate();
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const titleRef = useRef();
  const linkRef1 = useRef();
  const linkRef2 = useRef();

  useEffect(() => {
    if (!loading) {
      if (isLeader(teamData.teamMemberInfo, loginUserId) === false) {
        alert("팀장만 접근 가능한 페이지입니다.");
        nav(`/teamboard/?team=${teamId}`, { replace: true });
        return;
      }
      setSelectedMember(
        teamData.teamMemberInfo.find(
          (member) => member.position === "Team_Leader"
        ).userId
      );
      setTitle(teamData.teamName);
      setLinks([
        { tool: "notion", link: teamData.notionLink },
        { tool: "github", link: teamData.githubLink }
      ]);
      console.log(teamData);
    }
  }, [loading]);

  const onFocusElement = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const onClickSave = () => {
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
    console.log(title, links[0].link, links[1].link, selectedMember);
    if (confirm("수정된 정보를 저장하시겠습니까?")) {
      onUpdateTeamData(title, links[0].link, links[1].link, selectedMember);

      nav(`/teamboard/?team=${teamId}`);
    }
  };

  const onClickFinish = () => {
    if (
      confirm(
        '프로젝트를 종료하시겠습니까?\n종료된 프로젝트의 팀게시판은 수정할 수 없으며,\n"종료된 프로젝트는 내 프로젝트 > 참여 프로젝트 > 완료한 프로젝트"에서 확인이 가능합니다.'
      )
    ) {
      try {
        completeProject(teamId);
      } catch (error) {
        console.error("Error fetching complete project", error);
        throw error;
      }
      teamData.teamMemberInfo.length < 2
        ? nav("/myproj/attendproj")
        : nav(`/teamboard/feedback/?team=${teamId}`, { replace: true });
    }
  };

  const onChangeTitle = (input) => {
    if (input.length > 15) {
      return;
    }
    setTitle(input);
  };

  const onChangeLink = (id, input) => {
    if (id === 0) {
      setLinks(
        links.map((item) =>
          item.tool === "notion"
            ? {
                ...item,
                link: input
              }
            : item
        )
      );
    } else if (id === 1) {
      setLinks(
        links.map((item) =>
          item.tool === "github"
            ? {
                ...item,
                link: input
              }
            : item
        )
      );
    }
  };

  return (
    <div className={styles.updateProj}>
      <div className={styles.updateProj__label}>프로젝트 정보 수정</div>
      <div className={styles.updateProj__projName}>
        <ProjNameForm title={title} onChange={onChangeTitle} ref={titleRef} />
      </div>
      <div className={styles.updateProj__toolLink}>
        <CollabLinkForm
          links={links}
          onChange={onChangeLink}
          ref={[linkRef1, linkRef2]}
        />
      </div>
      <div className={styles.updateProj__delegation}>
        <div className={styles.updateProj__innerLabel}>팀장 위임</div>
        <div className={styles.updateProj__bottomInner}>
          <div className={styles.updateProj__members}>
            {teamData.teamMemberInfo.map((member, index) =>
              String(member.userId) === String(selectedMember) ? (
                <div
                  key={index}
                  onClick={() => setSelectedMember(member.userId)}
                >
                  <MemberItem
                    memberName={member.userName}
                    profilePic={member.profileImageUrl}
                    type="SELECTED"
                  />
                </div>
              ) : (
                <div
                  key={index}
                  onClick={() => setSelectedMember(member.userId)}
                >
                  <MemberItem
                    memberName={member.userName}
                    profilePic={member.profileImageUrl}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.updateProj__saveButton}>
        <Button text={"저장"} type={"MC2_120x40"} onClick={onClickSave} />
      </div>
      <div className={styles.updateProj__finishButton}>
        <Button
          text="프로젝트 종료"
          type="NONE__TEXT-POINT"
          onClick={onClickFinish}
        />
      </div>
    </div>
  );
};

export default UpdateProj;
