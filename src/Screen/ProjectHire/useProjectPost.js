import { useAtom, useAtomValue } from "jotai";
import { postProjectAtom, userIdAtom } from "../../atoms/atoms";
import { createPosts } from "../../service/postService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useProjectPost = () => {
  const [postProj, setPostProj] = useAtom(postProjectAtom);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const warning = () => {
    return window.confirm("제출하시겠습니까?");
  };

  //form 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    Object.keys(postProj).forEach((key) => {
      if (
        postProj["onOff"] === "비대면" &&
        (key === "regionId" || key === "subRegionId")
      ) {
        // 비대면일 때는 regionId와 subRegionId의 값을 무시
        if (postProj[key] === null) {
          return;
        }
      } else if (
        (key === "stack" || key === "categoryId") &&
        postProj[key]?.length === 0
      ) {
        newErrors[key] = true;
      } else if (
        (key === "regionId" || key === "subRegionId") &&
        (postProj[key] === 17 || postProj[key] === 1701)
      ) {
        newErrors[key] = true;
      } else if (postProj[key] === "" || !postProj[key]) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    // Errors가 있는지 여부 확인
    if (Object.keys(newErrors).length > 0) {
      alert("폼을 모두 작성해 주세요");
      //에러 key값 확인용
      console.log(JSON.stringify(errors, null, 2));
      console.log(JSON.stringify(newErrors, null, 2));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (warning()) {
        createPosts(postProj)
          .then((res) => {
            console.log(`반환 : ${res}`);
            alert("제출되었습니다.");
            navigate("/myproj/hiring-and-applied");
          })
          .catch((error) => {
            console.log(error);
            alert("에러가 발생했습니다. 다시 시도해 주세요,.");
          });
      } else {
        alert("취소되었습니다");
      }
    }
  };
  return { onChange, handleSubmit, errors };
};

export default useProjectPost;
