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
    const { name, value } = e.currentTarget; // 클릭된 버튼
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value, // 또는 원하는 값으로 업데이트
    }));
  };
  return { onChange, onClick };
};
export default useProjectPost;
