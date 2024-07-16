import Button from "../../../../Components/Button/Button";
import SearchIcon from "../../../../Image/Icons/SearchIcon";
import FormInput from "./FormInput";
import styles from "./PortfolioWrite.module.css";
import usePortPost from "./usePortPost";

const PortfolioWrite = () => {
  const { portfolioData, onChange } = usePortPost();
  //백엔드 전송 함수
  // const handleSubmit = (e) => {  //이 함수는 form에 onsubmit으로 붙임
  //   e.preventDefault();
  //   // 데이터 백엔드 전송 함수 호출
  // 예시
  /*    // Axios를 사용하여 서버로 데이터 전송
    axios.post('/api/portfolio', portfolioData)
      .then(response => {
        console.log("데이터 전송 성공:", response);
        // 서버로부터의 응답 처리
      })
      .catch(error => {
        console.error("데이터 전송 실패:", error);
        // 오류 처리
      });
  }; */
  //   submitFormData(formData);
  // };
  const {} = usePortPost();
  console.log(portfolioData);
  return (
    <div className={styles.portfolioWrite__contentWrap}>
      {/*프로젝트명 + 포트폴리오 작성 폼 */}

      {/*프로젝트명 */}
      <h3 className={styles.portfolioWrite__title}>OPEN AI 활용 프로젝트</h3>

      {/*포트폴리오 작성 폼 */}
      <form className={styles.portfolioWrite__form}>
        <input
          name="title"
          onChange={onChange}
          className={styles.portfolioWrite__form__title}
          placeholder="제목을 입력하세요"
        ></input>

        <label htmlFor="role">
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
        </label>

        <div className={styles.portfolioWrite__form__tasks}>
          <label htmlFor="tasks">이번 주 한 일</label>
          <FormInput
            name="tasks"
            onChange={onChange}
            textarea={true}
            height="90px"
          />
        </div>

        <div>
          <label htmlFor="difficulties">발생한 문제 / 어려움</label>
          <FormInput
            name="difficulties"
            onChange={onChange}
            textarea={true}
            height="200px"
          />
        </div>

        <div>
          <label htmlFor="result">해결 방법</label>
          <FormInput
            name="solutions"
            onChange={onChange}
            textarea={true}
            height="200px"
          />
        </div>

        <div className={styles.portfolioWrite__form__thoughts}>
          <label htmlFor="thoughts">새로 알게된 점 / 깨달은 점</label>
          <FormInput
            name="learnings"
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
