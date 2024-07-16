import styles from "./UpdateProj.module.css";
import MemberItem from "../../../Components/MemberItem/MemberItem";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import ProjNameForm from "../../../Components/ProjNameForm/ProjNameForm";
import CollabLinkForm from "../../../Components/CollabLinkForm/CollabLinkForm";
import { useState } from "react";

const mock_teamData = {
  title: "학원 청구 정산 서비스",
  collabLink: [
    {
      id: 1,
      link: "https://www.notion.so/ko-kr",
    },
    {
      id: 2,
      link: "https://github.com/",
    },
  ],
  leader: "yuming",
};

const mock_members = [
  { id: 1, userId: "yuming", name: "유밍 BE" },
  { id: 2, userId: "dora", name: "도라" },
  { id: 3, userId: "tom", name: "Tom BE" },
];

const UpdateProj = () => {
  const [teamData, setTeamData] = useState(mock_teamData);
  const [selectedMember, setSelectedMember] = useState(teamData.leader);

  const nav = useNavigate();

  const onClickSave = () => {
    if (teamData.title === "") {
      alert("프로젝트명을 입력해주세요.");
      return;
    }
    if (
      teamData.collabLink[0].link === "" ||
      teamData.collabLink[1].link === ""
    ) {
      alert("협업툴 링크를 입력해주세요.");
      return;
    }
    onChangeLeader(selectedMember);
    nav("/teamboard/manage");
  };

  const onClickFinish = () => {
    if (
      confirm(
        '프로젝트를 종료하시겠습니까?\n종료된 프로젝트의 팀게시판은 수정할 수 없으며,\n"종료된 프로젝트는 내 프로젝트 > 참여 프로젝트 > 완료한 프로젝트"에서 확인이 가능합니다.'
      )
    ) {
      nav("/teamboard/feedback");
    }
  };

  const onChangeTitle = (input) => {
    setTeamData({
      ...teamData,
      title: input,
    });
  };

  const onChangeLink = (id, link) => {
    setTeamData({
      ...teamData,
      collabLink: teamData.collabLink.map((item) =>
        String(item.id) === String(id) ? { ...item, link: link } : item
      ),
    });
  };

  const onChangeLeader = (userId) => {
    setTeamData({
      ...teamData,
      leader: userId,
    });
  };

  return (
    <div className={styles.updateProj}>
      <div className={styles.updateProj__label}>프로젝트 정보 수정</div>
      <div className={styles.updateProj__projName}>
        <ProjNameForm title={teamData.title} onChange={onChangeTitle} />
      </div>
      <div className={styles.updateProj__toolLink}>
        <CollabLinkForm
          links={teamData.collabLink}
          onChange={onChangeLink}
          type="SCROLL"
        />
      </div>
      <div className={styles.updateProj__delegation}>
        <div className={styles.updateProj__innerLabel}>팀장 위임</div>
        <div className={styles.updateProj__bottomInner}>
          <div className={styles.updateProj__members}>
            {mock_members.map((member) =>
              String(member.userId) === String(selectedMember) ? (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.userId)}
                >
                  <MemberItem memberName={member.name} type="SELECTED" />
                </div>
              ) : (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.userId)}
                >
                  <MemberItem memberName={member.name} />
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
