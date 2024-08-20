import { startTransition, useState } from "react";
import { postPortfolios } from "../../../../service/portfolioService";
import { useNavigate, useParams } from "react-router-dom";
import { useValidate } from "../../../../hooks/useValidate";

const usePortPost = () => {
  //화면 이동
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };
  //백엔드에 보낼 데이터 담을 state
  const [portfolioData, setPortfolioData] = useState({
    prtTitle: "",
    // role: "",
    // stack: "",
    workDescription: "",
    issues: "",
    solutions: "",
    feedback: ""
  });
  //백엔드 보낼 데이터 저장
  const onChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  //유효성 검사
  const { validation, ApplyFormError } = useValidate(portfolioData);

  //teamId
  const { teamId } = useParams();

  //백엔드 전송 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      const confirmSubmit = window.confirm("포트폴리오를 제출하시겠습니까?");
      if (confirmSubmit) {
        startTransition(async () => {
          //데이터 전송이 완료된 이후 페이지 이동
          await postPortfolios(teamId, portfolioData);
          navigateTo(`/mypage/portfolio/board/${teamId}`);
        });
        // setTimeout(()=>{
        // },1000)
      } else {
      }
    } else {
      alert("폼을 모두 작성해 주세요");
    }
  };
  return { portfolioData, onChange, handleSubmit, navigateTo, ApplyFormError };
};
export default usePortPost;
