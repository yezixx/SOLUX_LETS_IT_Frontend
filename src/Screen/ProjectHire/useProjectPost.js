import { useSetAtom } from "jotai";
import { postProjectAtom } from "../../atoms/atoms";

const useProjectPost = () => {
  const setPostProj = useSetAtom(postProjectAtom);
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
    console.log("제출완 "); // 백엔드 연동 코드로 수정 예정
  };

  return { onChange, onClick, handleSubmit };
};
export default useProjectPost;
