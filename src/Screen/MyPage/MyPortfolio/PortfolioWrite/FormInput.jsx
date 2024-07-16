const FormInput = ({
  name = undefined,
  width = "100%",
  height = "20px",
  border = "1px solid var(--line-color)",
  placeholder = "",
  type = "",
  textarea = false,
  onChange = null,
}) => {
  return (
    //textarea 일 경우
    textarea ? (
      <textarea
        name={name}
        style={{
          width: width,
          height: height,
          border: border,
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "10px",
          resize: "none",
        }}
        onChange={onChange}
      ></textarea>
    ) : (
      //textarea외 input 태그일 경우
      <input
        name={name}
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
        onChange={onChange}
      ></input>
    )
  );
};

export default FormInput;
