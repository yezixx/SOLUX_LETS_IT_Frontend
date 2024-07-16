const FormInput = ({
  width = "100%",
  height = "20px",
  border = "1px solid var(--line-color)",
  placeholder = "",
  type = "",
  textarea = false,
}) => {
  return (
    //textarea 일 경우
    textarea ? (
      <textarea
        style={{
          width: width,
          height: height,
          border: border,
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "10px",
          resize: "none",
        }}
      ></textarea>
    ) : (
      //textarea외 input 태그일 경우
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: width,
          height: height,
          border: border,
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "10px",
        }}
      ></input>
    )
  );
};

export default FormInput;
