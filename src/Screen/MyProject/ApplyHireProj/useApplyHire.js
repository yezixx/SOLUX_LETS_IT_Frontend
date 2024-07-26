import { useEffect, useState } from "react";
import { getMyProjects } from "../../../service/projectService";
import { useAtomValue } from "jotai";
import { userAtom, userIdAtom } from "../../../atoms/atoms";

export const useApplyHire = () => {
  //클릭하면 팀원을 보여주도록 state 설정
  const [showMember, setShowMember] = useState(false);

  /*구인/신청 프로젝트 data 담을 state */
  const [apHireProj, setApHireProj] = useState([]);
  /*팀원 data를 담을 state */
  const [memberList, setMemberList] = useState([]);

  // /*로그인 x */
  const userId = useAtomValue(userIdAtom);

  // /*로그인 구동 시 - userId 전역 상태에서 불러오기 */
  // const user = useAtomValue(userAtom);
  // const userId = user.userId;

  /*프로젝트 리스트 db에서 갖고 와서 apHireProj에 저장 */
  useEffect(() => {
    getMyProjects(userId)
      .then((data) => {
        setApHireProj(data);
      })
      .catch((error) => {
        console.log("에러발생");
      });
  }, []);
  // 팀원 버튼 클릭 시 호출되는 함수
  const handleClickMember = (postId) => {
    if (showMember === postId) {
      setShowMember(null); // 이미 열려있는 경우 닫기
    } else {
      setShowMember(postId); // 클릭한 프로젝트 ID로 팀원 목록 표시
      approveApplicants(postId)
        .then((data) => {
          setMemberList(data);
        })
        .catch((error) => {
          console.log("승인 멤버 리스트 오류:", error);
        });
    }
  };
  return {
    apHireProj,
    showMember,
    setShowMember,
    memberList,
    setMemberList,
    handleClickMember,
  };
};
