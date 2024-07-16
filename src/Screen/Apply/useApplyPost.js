import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useApplyPost = () => {
  //제출 전 alert
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/myproj/hiring-and-applied");
  };
  const warning = () => {
    if (
      window.confirm(
        '프로젝트를 신청할 경우, 구인글 작성자에게 "실명, 이메일, 프로필"이 제공됩니다. 계속하시겠습니까?'
      )
    ) {
      alert("제출되었습니다");
      navigateTo();
    } else {
      alert("취소되었습니다");
    }
  };
  //input data 수집
  const [applyData, setApplyData] = useState({
    stack: "",
    field: "",
    message: "",
    contact: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setApplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return { navigateTo, warning, applyData, onChange };
};

export default useApplyPost;
