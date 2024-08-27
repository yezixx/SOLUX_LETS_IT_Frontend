import { useContext, useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import MemberItem from "../../../components/memberItem/MemberItem";
import CheckCircleIcon from "../../../image/icons/CheckCircleIcon";
import FeedbackFormItem from "./feedbackFormItem/FeedbackFormItem";
import styles from "./TeamFeedback.module.css";
import { TeamStateContext } from "../Teamboard";
import { useNavigate } from "react-router-dom";
import {
  checkTeamCompleted,
  evaluateMember,
  getEvaluatedList,
} from "../../../service/teamService";
import Loading from "../../../components/loading/Loading";

// 본인을 제외한 팀원 목록 반환
const getMembersExcludingSelf = (loginUserId, members) => {
  return members.filter(
    (member) => String(member.userId) !== String(loginUserId)
  );
};

// 이미 평가한 팀원인지 확인
const isCompletedMember = (feedbackTargetId, evaluatedList) => {
  if (!evaluatedList) return false; // 평가한 팀원 목록이 없을 경우
  const isIncluded = evaluatedList.find(
    (member) => String(member.userId) === String(feedbackTargetId)
  );
  return isIncluded;
};

const TeamFeedback = () => {
  // 팀원 정보, 팀 아이디
  const { teamData, teamId } = useContext(TeamStateContext);
  const members = teamData.teamMemberInfo;

  // 선택된 팀원 아이디
  const [selectedMemberId, setSelectedMemberId] = useState();

  // 평가 항목 값
  const [promiseValue, setPromiseValue] = useState();
  const [frequencyValue, setFrequencyValue] = useState();
  const [participateValue, setParticipateValue] = useState();
  const [kindnessValue, setKindnessValue] = useState();

  // 평가한 팀원 목록
  const [evaluatedList, setEvaluatedList] = useState([]);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 로그인한 유저 아이디
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const nav = useNavigate();

  // 본인을 제외한 팀원 목록 가져옴
  const membersExcludingSelf = getMembersExcludingSelf(loginUserId, members);

  console.log(evaluatedList);

  // 백엔드로부터 평가한 팀원 목록 가져오기
  const fetchEvaluatedListData = async () => {
    try {
      const response = await getEvaluatedList(teamId, loginUserId);
      setEvaluatedList(response.data);
    } catch (error) {
      console.error("Error fetching evaluated member list", error);
      alert("평가한 팀원 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 백엔드로부터 프로젝트 완료되었는지 확인
  const fetchIsTeamCompleted = async () => {
    try {
      const response = await checkTeamCompleted(teamId);
      console.log("isTeamCompleted", response.data);
      if (!response.data) {
        alert("프로젝트가 완료되지 않았습니다.");
        nav(-1, { replace: true });
      }
    } catch (error) {
      console.error("Error fetching team completed", error);
      alert("프로젝트 여부를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // 백엔드 데이터 처리될 때까지 대기
      // 초기 데이터 로드
      fetchIsTeamCompleted();
      fetchEvaluatedListData();
    }, 1000);
  }, []);

  // 평가 항목 값 state 변경 관리
  const onChangePromise = (value) => {
    setPromiseValue(value);
  };
  const onChangeFrequency = (value) => {
    setFrequencyValue(value);
  };
  const onChangeParticipate = (value) => {
    setParticipateValue(value);
  };
  const onChangeKindness = (value) => {
    setKindnessValue(value);
  };

  // from validation
  const isValidate = () => {
    if (!selectedMemberId) {
      alert("평가할 팀원을 선택해주세요.");
      return false;
    }

    if (
      !promiseValue ||
      !frequencyValue ||
      !participateValue ||
      !kindnessValue
    ) {
      alert("모든 항목에 체크해주세요.");
      return false;
    }
    return true;
  };

  // 평가 제출
  const submitFeedback = async () => {
    if (!confirm("평가를 제출하시겠습니까?\n제출된 평가는 수정할 수 없습니다."))
      return;
    try {
      // 백엔드로 평가 데이터 전송
      await evaluateMember(
        teamId,
        String(loginUserId),
        String(selectedMemberId),
        {
          promise: Number(promiseValue),
          frequency: Number(frequencyValue),
          participate: Number(participateValue),
          kindness: Number(kindnessValue),
        }
      );
    } catch (error) {
      console.error("Error fetching evaluate member", error);
      throw error;
    }
    // 평가 제출 후 초기화
    setSelectedMemberId(null);
    setPromiseValue(null);
    setFrequencyValue(null);
    setParticipateValue(null);
    setKindnessValue(null);
  };

  // 제출하기 버튼 클릭
  const onClickSubimt = async () => {
    if (!isValidate()) return;
    await submitFeedback();
    // 평가한 팀원 목록 다시 가져오기
    await fetchEvaluatedListData();
  };

  // 평가 종료 버튼 클릭 (마지막 평가일 경우)
  const onClickFinish = async () => {
    if (!isValidate()) return;
    await submitFeedback();
    alert("팀원 평가를 완료합니다.");
    nav("/myproj/attendproj", { replace: true });
  };

  return (
    <div className={styles.teamFeedback}>
      {loading && <Loading />}
      <div className={styles.teamFeedback__label}>팀원 평가</div>
      <div className={styles.teamFeedback__container}>
        {/*상단 텍스트*/}
        <div className={styles.teamFeedback__innerLabel}>
          <CheckCircleIcon
            width={"26px"}
            height={"26px"}
            color={"var(--main-color2)"}
          />
          평가할 팀원을 선택해주세요
        </div>
        {/*팀원 목록(본인제외)*/}
        <div className={styles.teamFeedback__item}>
          {membersExcludingSelf.map((member, index) => (
            <MemberItem
              key={index}
              memberName={member.userName}
              profilePic={member.profileImageUrl}
              type={
                isCompletedMember(member.userId, evaluatedList)
                  ? "COMPLETED"
                  : String(selectedMemberId) === String(member.userId)
                    ? "ONLYBORDER_SELECTED"
                    : "ONLYBORDER"
              }
              onClick={() => {
                setSelectedMemberId(member.userId);
              }}
            />
          ))}
        </div>
        {/*평가 항목*/}
        <div className={styles.teamFeedback__formContainer}>
          <div className={styles.teamFeedback__form}>
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"시간 / 기한은 잘 지켰나요?"}
              answer={promiseValue}
              onChange={onChangePromise}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"답장 속도는 적절했나요?"}
              answer={frequencyValue}
              onChange={onChangeFrequency}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"적극적으로 프로젝트에 참여했나요?"}
              answer={participateValue}
              onChange={onChangeParticipate}
            />
            <FeedbackFormItem
              targetId={selectedMemberId}
              question={"상대방을 존중하고 배려했나요?"}
              answer={kindnessValue}
              onChange={onChangeKindness}
            />
          </div>
        </div>
        {/*제출 버튼*/}
        <div className={styles.teamFeedback__submitButton}>
          {evaluatedList.length >= membersExcludingSelf.length - 1 ? (
            <Button
              text={"평가종료"}
              type={"RAD-10__FONT-M"}
              onClick={onClickFinish}
            />
          ) : (
            <Button
              text={"제출하기"}
              type={"RAD-10__FONT-M"}
              onClick={onClickSubimt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamFeedback;
