import { useEffect, useState } from "react";
import {
  approveApply,
  getApplicantList,
  rejectApply,
} from "../../../../service/applyService";

const useApplicant = (postId) => {
  /*구인/신청 프로젝트 -> 신청자 리스트를 담아올 atom 설정 */
  const [applicantList, setApplicantList] = useState([]);

  useEffect(() => {
    getApplicantList(postId) // 가져오는 프로젝트 data에 따라 매개변수를 바꿔야 함
      .then((data) => {
        console.log(data);
        setApplicantList(data.data);
      })
      .catch((error) => {
        console.error("Applicant list fetch error:", error);
      });
  }, [setApplicantList]);

  /*수락, 거절을 눌렀을 때 */
  const applicantConfirm = (isApprove, applyId, postId) => {
    const message = isApprove
      ? "승인하시겠습니까? (승인 후엔 변경이 불가능합니다.)"
      : "거절하시겠습니까? (거절 후엔 변경이 불가능합니다.)";
    const isConfirmed = confirm(message);
    /*confirm 메세지 창 확인을 눌렀을 시 */
    if (isConfirmed)
      if (isApprove) {
        /*수락 시 */
        approveApply(postId, applyId)
          .then((res) => {
            alert("승인되었습니다.");
            //applicantList 리렌더링
            getApplicantList(postId) // 가져오는 프로젝트 data에 따라 매개변수를 바꿔야 함
              .then((data) => {
                console.log(data);
                setApplicantList(data.data);
              })
              .catch((error) => {
                console.error("Applicant list fetch error:", error);
              });
          })
          .catch((error) => console.log(error.response));
      } else {
        /*거절 시 */
        rejectApply(postId, applyId)
          .then(() => {
            alert("거절되었습니다.");
            //applicantList 리렌더링
            getApplicantList(postId) // 가져오는 프로젝트 data에 따라 매개변수를 바꿔야 함
              .then((data) => {
                console.log(data);
                setApplicantList(data.data);
              })
              .catch((error) => {
                console.error("Applicant list fetch error:", error);
              });
          })
          .catch((error) => console.log(error.response));
      }
  };
  return { applicantList, applicantConfirm };
};

export default useApplicant;
