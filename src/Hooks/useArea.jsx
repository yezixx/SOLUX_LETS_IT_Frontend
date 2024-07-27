// useArea.jsx
import { createContext, useContext, useState } from 'react';

const AreaContext = createContext();

export const AreaProvider = ({ children }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSubAreas, setSelectedSubAreas] = useState([]);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setSelectedSubAreas([]); // 새로운 지역 선택 시 하위 지역 초기화
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
      value={{ selectedArea, selectedSubAreas, handleAreaClick, handleSubAreaClick }}
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
