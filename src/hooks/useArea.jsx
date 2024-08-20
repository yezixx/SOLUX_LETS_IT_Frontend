// hooks/useArea.jsx
import { createContext, useContext, useState } from 'react';

const AreaContext = createContext();

export const AreaProvider = ({ children }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSubAreas, setSelectedSubAreas] = useState([]);
  const [isSubAreaVisible, setIsSubAreaVisible] = useState(false);

  const handleAreaClick = (area) => {
    if (selectedArea === area) {
      // 같은 상위 지역 클릭 시 전체 지역으로 돌아가기
      setSelectedArea(null);
      setSelectedSubAreas([]);
      setIsSubAreaVisible(false);
    } else {
      // 새로운 상위 지역 클릭 시 하위 지역 표시
      setSelectedArea(area);
      setSelectedSubAreas([]); // 하위 지역 초기화
      setIsSubAreaVisible(true); // 하위 지역 표시
    }
  };

  const handleSubAreaClick = (sub) => {
    setSelectedSubAreas((prevSelected) => {
      if (prevSelected.includes(sub)) {
        return prevSelected.filter((item) => item !== sub);
      } else {
        return [...prevSelected, sub];
      }
    });
  };

  return (
    <AreaContext.Provider
      value={{ selectedArea, selectedSubAreas, isSubAreaVisible, handleAreaClick, handleSubAreaClick }}
    >
      {children}
    </AreaContext.Provider>
  );
};

const useArea = () => {
  const context = useContext(AreaContext);
  if (context === undefined) {
    throw new Error('useArea must be used within an AreaProvider');
  }
  return context;
};

export default useArea;
