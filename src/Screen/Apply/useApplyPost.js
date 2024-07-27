import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useApplyPost = () => {
  // input data 수집
  const [applyData, setApplyData] = useState({
    preferStack: "",
    desiredField: "",
    applyContent: "",
    contact: "",
  });
  //제출 전 유효값 검사
  const validation = () => {
    const errorArray = Object.keys(applyData).filter((key) => {
      applyData[key] === "";
    });
    console.log(errorArray);
  };
  validation();
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
  const handleSubmit = (e) => {
    e.preventDefault();
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
          console.error("신청 제출 중 오류 발생:", error);
          alert("이미 신청하였습니다.");
        });
    });
  };
  return { navigateTo, applyData, onChange, warning, handleSubmit };
};

export default useApplyPost;
