const ProjectBtnPhoto = ({ imgSrc }) => {
  //프로필 사진 불러오기
  return (
    <img
      src={imgSrc}
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "var(--line-color)",
      }}
    ></img>
  );
};

export default ProjectBtnPhoto;
