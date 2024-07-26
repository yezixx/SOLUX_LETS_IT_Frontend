import { useEffect, useState } from "react";
import { KoreaArea } from "../../KoreaArea";
import { useSetAtom } from "jotai";
import { postProjectAtom } from "../../../atoms/atoms";
import { useRegionId } from "./useRegionId";

/*subRegion, region 등 독특한 이벤트 핸들러 처리 */
export const useProjInfo = () => {
  /*state */
  const [selectedArea, setSelectedArea] = useState(""); // 선택된 지역 상태
  const setPostProj = useSetAtom(postProjectAtom); //백엔드에 보낼 데이터

  /*region 이벤트 핸들러*/
  const handleSelectedArea = (e) => {
    const { value } = e.target;
    setSelectedArea(value);
    setPostProj((prevData) => ({
      //백엔드 포스트
      ...prevData,
      regionId: useRegionId(value), // Id를 계산해주는 useRegionId 호출
    }));
  };

  /*subRegion 버튼 이벤트 핸들러*/
  const onClick = (e) => {
    const { value } = e.target;
    setPostProj((prevData) => ({
      ...prevData,
      subRegionId: Number(value),
    }));
  };
  /*선택한 region 변경 시 subRegion 데이터 0으로 초기화 */
  useEffect(() => {
    setPostProj((prevData) => ({
      ...prevData,
      subRegionId: 0, // subRegionId를 0으로 초기화
    }));
  }, [selectedArea, setPostProj]);

  /*subRegion 시작번호*/
  const startSubRegion = useRegionId(selectedArea);
  /*선택된 지역에 맞는 데이터 찾기 (area + subArea), subArea map시 이용*/
  const selectedAreaData = KoreaArea.find((area) => area.name === selectedArea);
  return {
    handleSelectedArea,
    selectedAreaData,
    startSubRegion,
    onClick,
  };
};
