export const tierColor = (tierScore) => {
  if (tierScore >= 90 && tierScore <= 100) {
    return "#FFD700"; // S등급
  } else if (tierScore >= 80 && tierScore <= 89) {
    return "#DA0000"; // A등급
  } else if (tierScore >= 70 && tierScore <= 79) {
    return "#1F9A00"; // B등급
  } else if (tierScore >= 60 && tierScore <= 69) {
    return "#005A9A"; // C 등급
  } else {
    return "var(--text-color2)"; //F등급
  }
};
export const ageMapping = (age) => {
  if (!age) return "정보 없음";
  switch (age) {
    case "10~19":
      return "10대";
    case "20~29":
      return "20대";
    case "30~39":
      return "30대";
    default:
      "40대 이상";
  }
};
