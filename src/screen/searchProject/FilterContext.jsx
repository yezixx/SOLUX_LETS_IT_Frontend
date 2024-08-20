// contexts/FilterContext.js
import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        selectedCategoryIds,
        setSelectedCategoryIds,
        selectedStacks,
        setSelectedStacks,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
