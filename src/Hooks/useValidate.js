//input type text만 유효성 검사 가능함

import { useState } from "react";

export const useValidate = (data = {}) => {
  const [ApplyFormError, setApplyFormError] = useState([]);
  const validation = () => {
    const errorArray = Object.keys(data).filter((key) => data[key] === "");
    setApplyFormError(errorArray);
    //에러 배열 길이가 0일 경우 true (모든 폼 작성 완료)
    return errorArray.length === 0;
  };

  return { validation, ApplyFormError };
};
