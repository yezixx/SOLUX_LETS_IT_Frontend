import { startTransition, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitApply } from "../../service/applyService";
import { useAtomValue, useSetAtom } from "jotai";
import { applicant, userIdAtom } from "../../atoms/atoms";

const useApplyPost = () => {
  // input data 수집
  const [applyData, setApplyData] = useState({
    preferStack: "",
    desiredField: "",
    applyContent: "",
    contact: "",
  });
  //제출 전 유효값 검사
  const [ApplyFormError, setApplyFormError] = useState([]);
  const validation = () => {
    const errorArray = Object.keys(applyData).filter(
      (key) => applyData[key] === ""
    );
    setApplyFormError(errorArray);
    //에러 배열 길이가 0일 경우 true (모든 폼 작성 완료)
    return errorArray.length === 0;
  };

  // 제출 전 alert
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/myproj/hiring-and-applied");
  };
  const warning = (message) => {
    if (window.confirm(message)) {
      alert("제출되었습니다");
      navigateTo();
    } else {
      alert("취소되었습니다");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setApplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //제출
  //postId 기반으로 프로젝트명 갖고오는 기능 구현 필요
  //'신청하기' 버튼 눌렀을 때 postId 할당
  const { postId } = useParams();
  const setApplicant = useSetAtom(applicant);
  // 로그인 시 받아둔 유저 아이디값 가져옴
  const userId = useAtomValue(userIdAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      startTransition(() => {
        submitApply(postId, userId, applyData)
          .then((response) => {
            // 서버 응답 처리
            setApplicant(response.data);
            warning(
              '프로젝트를 신청할 경우, 구인글 작성자에게 "실명, 이메일, 프로필"이 제공됩니다. 계속하시겠습니까?'
            );
          })
          .catch((error) => {
            //이미 신청했을 때 발생하는 에러, 단순 네트워크 에러 등 에러 구분 필요
            console.error("신청 제출 중 오류 발생:", error);
            alert("이미 신청하였습니다.");
          });
      });
    } else {
      alert("폼을 모두 작성해 주세요");
    }
  };
  return {
    navigateTo,
    applyData,
    onChange,
    warning,
    handleSubmit,
    ApplyFormError,
  };
};

export default useApplyPost;
