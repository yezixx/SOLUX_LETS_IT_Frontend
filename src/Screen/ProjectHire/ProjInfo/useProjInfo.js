import { useState } from "react";
import { KoreaArea } from "../../KoreaArea";
import useProjectPost from "../useProjectPost";
import { useSetAtom } from "jotai";
import { postProjectAtom } from "../../../atoms/atoms";

export const useProjInfo = () => {
  const [selectedArea, setSelectedArea] = useState(""); // 선택된 지역 상태
  const setPostProj = useSetAtom(postProjectAtom);
  // 사용자가 선택한 지역 업데이트
  const handleSelectedArea = (e) => {
    const { name, value } = e.target;
    setSelectedArea(value);
    setPostProj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 선택된 지역에 맞는 데이터 찾기
  const selectedAreaData = KoreaArea.find((area) => area.name === selectedArea);
  return { selectedArea, handleSelectedArea, selectedAreaData };
};
