import { useState } from "react";

const usePortPost = () => {
  const [portfolioData, setPortfolioData] = useState({
    title: "",
    role: "",
    stack: "",
    tasks: "",
    difficulties: "",
    solutions: "",
    learnings: "",
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
