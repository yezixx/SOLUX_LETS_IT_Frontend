import { useState } from "react";

//사용하려는 screen에서 searchData 입력해주면 filter 함
export const useSearch = (searchData) => {
  /*검색창에 focus 시에만 연관검색어를 보여주도록 설정*/
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 200);
  };
  /*검색한 value 값 searchValue state에 담음 */
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const data = searchData.filter(
    //소문자로 비교 시 같은 것만 배열에 담음
    (item) =>
      searchValue === ""
        ? searchData.slice(0, 5)
        : item.toLowerCase().includes(searchValue.toLowerCase())
  );
  /*GrayBox 만들 배열, 백엔드로 전달할 배열 */
  const [tech, setTech] = useState([]);
  const handleCreateBox = (item) => {
    if (tech.length < 4) {
      !tech.includes(item) && setTech((prev) => [...prev, item]);
    } else {
      alert("4개까지만 가능합니다");
    }
  };
  /*graybox 제거 */
  const deleteGrayBox = (removeItem) => {
    setTech((prev) => prev.filter((item) => item != removeItem));
  };
  return {
    handleFocus,
    handleBlur,
    handleSearch,
    handleCreateBox,
    deleteGrayBox,
    data,
    tech,
    isFocus,
  };
};
