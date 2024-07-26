import { useAtom, useAtomValue } from "jotai";
import { postProjectAtom, userIdAtom } from "../../atoms/atoms";
import { createPosts } from "../../service/postService";
import { useState } from "react";

const useProjectPost = () => {
  const [postProj, setPostProj] = useAtom(postProjectAtom);
  const [errors, setErrors] = useState({}); //에러가 난 key값을 모아두는 객체
  //임의로 설정한 userId
  const userId = useAtomValue(userIdAtom);
  const onChange = (e) => {
    const { name, value } = e.target;
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //제출 전 warning
  const warning = () => {
    const isConfirm = confirm("제출하시겠습니까?");
    if (isConfirm) {
      alert("제출되었습니다.");
    } else {
      alert("취소되었습니다");
    }
  };
  //유효성 검사
  const validateForm = () => {
    const newErrors = {};
    Object.keys(postProj).forEach((key) => {
      if (key !== "stack" && key !== "categoryId" && postProj[key] == "") {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    //에러인 key값이 하나라도 있다면 false 반환
    if (errors) {
      alert("폼을 모두 작성해 주세요");
      console.log(errors);
    }
    Object.keys(newErrors).length === 0;
  };

  //제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //백엔드 연동 코드
      warning();
      createPosts(userId, postProj)
        .then((res) => console.log(`반환 : ${res}`))
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  };

  return { onChange, handleSubmit, errors };
};
export default useProjectPost;
