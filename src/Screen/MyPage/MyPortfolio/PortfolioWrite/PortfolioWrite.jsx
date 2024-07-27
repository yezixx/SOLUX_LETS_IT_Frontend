import { useNavigate } from "react-router-dom";
import Button from "../../../../Components/Button/Button";
import FormInput from "./FormInput";
import styles from "./PortfolioWrite.module.css";
import usePortPost from "./usePortPost";

const PortfolioWrite = () => {
  const { portfolioData, onChange } = usePortPost();
  const navigate = useNavigate();
  const navigatetTo = (link) => {
    navigate(link);
  };
  //백엔드 전송 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm("포트폴리오를 제출하시겠습니까?");
    if (confirmSubmit) {
      startTransition(() => {
        postPortfolios(postId, userId, portfolioData);
      });
      navigatetTo("/"); // 우선은 홈 화면으로 이동
    } else {
    }
  };
  return (
    <div className={styles.portfolioWrite__contentWrap}>
      {/*프로젝트명 + 포트폴리오 작성 폼 */}

      {/*프로젝트명 */}
      <h3 className={styles.portfolioWrite__title}>OPEN AI 활용 프로젝트</h3>

      {/*포트폴리오 작성 폼 */}
      <form className={styles.portfolioWrite__form} onSubmit={handleSubmit}>
        <input
          name="prtTitle"
          onChange={onChange}
          className={styles.portfolioWrite__form__title}
          placeholder="제목을 입력하세요"
        ></input>

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
            onChange={onChange}
            textarea={true}
            height="90px"
          />
        </div>

        <div>
          <label htmlFor="issues">발생한 문제 / 어려움</label>
          <FormInput
            name="issues"
            onChange={onChange}
            textarea={true}
            height="200px"
          />
        </div>

        <div>
          <label htmlFor="solutions">해결 방법</label>
          <FormInput
            name="solutions"
            onChange={onChange}
            textarea={true}
            height="200px"
          />
        </div>

        <div className={styles.portfolioWrite__form__thoughts}>
          <label htmlFor="feedback">새로 알게된 점 / 깨달은 점</label>
          <FormInput
            name="feedback"
            onChange={onChange}
            textarea={true}
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
