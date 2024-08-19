import Button from "../../../../components/Button/Button";
import FormInput from "./FormInput";
import styles from "./PortfolioWrite.module.css";
import usePortPost from "./usePortPost";

const PortfolioWrite = () => {
  const { portfolioData, ApplyFormError, onChange, handleSubmit } =
    usePortPost();

  console.log(portfolioData);

  return (
    <div className={styles.portfolioWrite__contentWrap}>
      {/*프로젝트명 + 포트폴리오 작성 폼 */}

      {/*포트폴리오 작성 폼 */}
      <form className={styles.portfolioWrite__form} onSubmit={handleSubmit}>
        <input
          name="prtTitle"
          onChange={onChange}
          className={`${styles.portfolioWrite__form__title} ${
            ApplyFormError.includes("prtTitle") ? styles.formError : ""
          }`}
          placeholder="제목을 입력하세요"
        />
        {/*추가한다면 css 변경 필요 */}
        {/* <label htmlFor="role">
          담당역할
          <FormInput
            name="role"
            onChange={onChange}
            width="60%"
            placeholder="백엔드"
          />
        </label>

        <label htmlFor="stack">
          사용스택
          <FormInput
            name="stack"
            onChange={onChange}
            width="60%"
            placeholder="Spring"
          />
          <SearchIcon bgc="var(--text-color2)" />
        </label> */}

        <div className={styles.portfolioWrite__form__tasks}>
          <label htmlFor="workDescription">이번 주 한 일</label>
          <FormInput
            name="workDescription"
            error={ApplyFormError}
            onChange={onChange}
            height="90px"
          />
        </div>

        <div>
          <label htmlFor="issues">발생한 문제 / 어려움</label>
          <FormInput
            name="issues"
            error={ApplyFormError}
            onChange={onChange}
            height="200px"
          />
        </div>

        <div>
          <label htmlFor="solutions">해결 방법</label>
          <FormInput
            name="solutions"
            error={ApplyFormError}
            onChange={onChange}
            height="200px"
          />
        </div>

        <div className={styles.portfolioWrite__form__thoughts}>
          <label htmlFor="feedback">새로 알게된 점 / 깨달은 점</label>
          <FormInput
            name="feedback"
            error={ApplyFormError}
            onChange={onChange}
            height="195px"
          />
        </div>

        {/*폼 제출 버튼*/}
        <div className={styles.portfolioWrite__form__btnWrap}>
          <Button text="저장" type="MC2_120x40" />
        </div>
      </form>
    </div>
  );
};

export default PortfolioWrite;
