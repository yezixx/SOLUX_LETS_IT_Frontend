import { useAtom, useAtomValue } from "jotai";
import { postProjectAtom, userIdAtom } from "../../atoms/atoms";
import { createPosts } from "../../service/postService";

const useProjectPost = () => {
  const [postProj, setPostProj] = useAtom(postProjectAtom);
  //임의로 설정한 userId
  const userId = useAtomValue(userIdAtom);
  const onChange = (e) => {
    const { name, value } = e.target;
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //버튼 value 갖고오기
  const onClick = (e) => {
    // 버튼의 name 속성 가져옴
    const { name, value } = e.target; // 클릭된 버튼
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value, // 또는 원하는 값으로 업데이트
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
  //제출
  const handleSubmit = (e) => {
    e.preventDefault();
    warning();
    //백엔드 연동 코드
    createPosts(userId, postProj)
      .then((res) => console.log(`반환 : ${res}`))
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response from server:", error.response);
        } else if (error.request) {
          // No response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error setting up request:", error.message);
        }
        console.error("Full error object:", error);
        throw error;
      });
  };

  return { onChange, onClick, handleSubmit };
};
export default useProjectPost;
