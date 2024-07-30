import { useEffect, useState } from "react";
import {
  getMyApplyProjects,
  getMyProjects,
} from "../../../service/projectService";
import { completePosts, deletePosts } from "../../../service/postService";
import { useNavigate } from "react-router-dom";
import { approveApplicants } from "../../../service/applyService";

export const useApplyHire = () => {
  // 클릭하면 팀원을 보여주도록 state 설정
  const [showMember, setShowMember] = useState({});
  // 구인/신청 프로젝트 data 담을 state
  const [hireProj, setHireProj] = useState([]);
  const [applyProj, setApplyProj] = useState([]);
  // 팀원 data를 담을 state
  const [, setMemberList] = useState([]);
  const navigate = useNavigate();
  // 프로젝트 리스트 db에서 갖고 와서 hireProj 저장
  useEffect(() => {
    getMyProjects()
      .then((res) => {
        console.log(res.data);
        setHireProj(res.data);
      })
      .catch((error) => {
        console.log("프로젝트 데이터 가져오기 오류:", error);
      });
    getMyApplyProjects()
      .then((res) => {
        setApplyProj(res.data);
      })
      .catch((error) => {
        console.log(`apply 프로젝트 데이터 가져오는 중 에러 발생 : ${error}`);
      });
  }, []);

  // 클릭했을 시 멤버 보여주는 함수
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

  // 모집 마감 버튼
  const completeHire = (postId) => {
    if (window.confirm("마감하시겠습니까? (마감 후 취소는 불가능합니다.)")) {
      completePosts(postId)
        .then(() => {
          alert("마감되었습니다");
          // 팀게시판 생성 navigate 추가해야 함
          console.log(`모집 마감 성공`);
          navigate("/teamboard/new");
          // 모집 마감 후 프로젝트 목록을 새로 가져오기
          return getMyProjects();
        })
        .then((res) => {
          setHireProj(res.data);
        })
        .catch((error) => {
          console.log("모집 마감 처리 오류:", error);
        });
    }
  };

  // 글 삭제
  const deleteHireProj = (postId) => {
    const isConfirm = window.confirm(
      "구인글을 삭제하시겠습니까? (삭제 후 취소는 불가능합니다.)"
    );
    if (isConfirm) {
      deletePosts(postId)``
        .then(() => {
          alert("삭제되었습니다");
          // 팀게시판 생성 navigate 추가해야 함
          console.log(`구인글 삭제 성공`);
          // 모집 마감 후 프로젝트 목록을 새로 가져오기
          return getMyProjects();
        })
        .then((res) => {
          setHireProj(res.data);
        })
        .catch((error) => {
          console.log("구인글 삭제 오류:", error);
        });
    } else {
      alert("취소되었습니다.");
    }
  };

  return {
    hireProj,
    applyProj,
    showMember,
    handleClickMember,
    completeHire,
    deleteHireProj,
  };
};
