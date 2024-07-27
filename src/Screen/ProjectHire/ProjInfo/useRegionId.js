export const useRegionId = (regionName) => {
  switch (regionName) {
    case "서울":
      return 1;
    case "경기":
      return 2;
    case "인천":
      return 3;
    case "대전광역시":
      return 4;
    case "대구광역시":
      return 5;
    case "부산광역시":
      return 6;
    case "울산광역시":
      return 7;
    case "광주광역시":
      return 8;
    case "강원도":
      return 9;
    case "충청북도":
      return 10;
    case "충청남도":
      return 11;
    case "경상북도":
      return 12;
    case "경상남도":
      return 13;
    case "전라북도":
      return 14;
    case "전라남도":
      return 15;
    case "제주도":
      return 16;
  }
  return;
};
