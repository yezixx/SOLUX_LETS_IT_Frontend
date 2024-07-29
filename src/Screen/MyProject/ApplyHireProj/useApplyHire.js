import { useEffect, useState } from "react";
import {
  getMyApplyProjects,
  getMyProjects,
} from "../../../service/projectService";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";
import { completePosts } from "../../../service/postService";

export const useApplyHire = () => {
  //클릭하면 팀원을 보여주도록 state 설정
  const [showMember, setShowMember] = useState({});
  /*구인/신청 프로젝트 data 담을 state */
  const [hireProj, setHireProj] = useState([]);
  const [applyProj, setApplyProj] = useState([]);
  /*팀원 data를 담을 state */
  const [memberList, setMemberList] = useState([]);
  /*userId 전역 상태에서 불러오기 */
  const userId = useAtomValue(userIdAtom);
  /*프로젝트 리스트 db에서 갖고 와서 hireProj 저장 */
  useEffect(() => {
    getMyProjects(userId)
      .then((res) => {
        setHireProj(res.projects);
      })
      .catch((error) => {
        console.log("에러발생");
      });
    getMyApplyProjects(userId)
      .then((res) => {
        setApplyProj(res.projects);
      })
      .catch((error) => {
        console.log(`apply 프로젝트 데이터 가져오는 중 에러 발생 : ${error}`);
      });
  }, [userId]);

  //클릭했을 시 멤버 보여주는 함수
  const handleClickMember = (postId) => {
    setShowMember((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // 해당 프로젝트의 팀원 목록 표시 상태를 토글
    }));

    if (!showMember[postId]) {
      approveApplicants(postId)
        .then((data) => {
          setMemberList((prevList) => ({
            ...prevList,
            [postId]: data, // 해당 프로젝트의 팀원 목록 업데이트
          }));
        })
        .catch((error) => {
          console.log("승인 멤버 리스트 오류:", error);
        });
    }
  };

  //모집마감버튼
  const completeHire = (postId) => {
    completePosts(postId)
      .then((res) => console.log(`모집 마감 성공 : ${res}`))
      .catch((error) => {
        console.log("승인 멤버 리스트 오류:", error);
      });
  };
  return {
    hireProj,
    applyProj,
    showMember,
    handleClickMember,
    completeHire,
  };
};
