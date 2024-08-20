import styles from "./FormInput.module.css";

const FormInput = ({
  name = undefined,
  width = "100%",
  height = "20px",
  onChange = null,
  error, //에러가 발생한 key 값
}) => {
  return (
    <textarea
      className={`${styles.formInput__textarea} ${
        error.includes(name) ? styles.formError : ""
      }`}
      name={name}
      style={{
        width: width,
        height: height,
      }}
      onChange={onChange}
    />
  );
};

export default FormInput;
