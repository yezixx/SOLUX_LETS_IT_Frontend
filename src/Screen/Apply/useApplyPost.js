import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useApplyPost = () => {
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

  // input data 수집
  const [applyData, setApplyData] = useState({
    preferStack: "",
    desiredField: "",
    applyContent: "",
    contact: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setApplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { navigateTo, applyData, onChange, warning };
};

export default useApplyPost;
