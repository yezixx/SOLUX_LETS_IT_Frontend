import { useState } from "react";

const usePortPost = () => {
  const [portfolioData, setPortfolioData] = useState({
    prtTitle: "",
    // role: "",
    // stack: "",
    workDescription: "",
    issues: "",
    solutions: "",
    feedback: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return { portfolioData, onChange };
};
export default usePortPost;
