import { useAtomValue, useSetAtom } from "jotai";
import Button from "../../Components/Button/Button";
import RouteName from "../../Components/RouteName/RouteName";
import styles from "./Apply.module.css";
import BriefProfile from "./BriefProfile/BriefProfile";
import useApplyPost from "./useApplyPost";
import { applicant } from "../../atoms/atoms";
import { useParams } from "react-router-dom";
import { startTransition, useEffect } from "react";
import { submitApply } from "../../service/applyService";

//mock data
const user = {
  name: "김코더",
  age: "20대 초반",
  bio: "시각화로 소통하는 주니어 개발자",
};
const Apply = () => {
  //'신청하기' 버튼 눌렀을 때 postId 할당 될 것
  const postId = useParams();
  const setApplicant = useSetAtom(applicant);
  //applyData - onChange를 통해 input으로 받은 값을 모아둔 객체
  const { applyData, handleSubmit, onChange } = useApplyPost();
  //로그인 시 받아둔 유저 아이디값 가져옴
  const userId = useAtomValue();
  useEffect(() => {
    startTransition(() => {
      setApplicant(submitApply(postId, userId, applyData));
      //applicant라는 atom을 변경하는 함수 setApplicant
      //submitApply (axios로 미리 설정함) 를 통해 db에 보냄
    });
  }, []);
  return (
    <div>
      <RouteName route={["프로젝트 신청"]} />
      <div className={styles.apply}>
        {/*프로필 미리보기 */}
        <div className={styles.apply__profile}>
          <div className={styles.apply__title}>프로필 미리보기</div>
          {/*프로필을 담을 box */}
          <div className={styles.apply__profile_container}>
            <BriefProfile user={user} />
          </div>
        </div>

        {/*지원서  폼 */}
        <form className={styles.apply__form} onSubmit={handleSubmit}>
          {/*지원 정보 확인 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>지원정보확인</div>
            <span>프로젝트명 |</span>
          </div>
          {/*선호 스택 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>선호 스택</div>
            <input
              name="stack"
              onChange={onChange}
              className={styles.apply__input}
              placeholder="리액트"
            ></input>
          </div>
          {/*희망 분야 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>희망 분야</div>
            <input
              name="field"
              onChange={onChange}
              className={styles.apply__input}
              placeholder="프론트엔드"
            ></input>
          </div>
          {/*전달메세지 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>전달 메세지</div>
            <textarea
              onChange={onChange}
              name="message"
              placeholder="사용할 수 있는 기술 스택, 자기 소개 등"
              className={`${styles.apply__input} ${
                styles[`apply__input--textarea`]
              }`}
            ></textarea>
          </div>
          {/*연락 수단 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>연락 수단</div>
            <input
              onChange={onChange}
              name="contact"
              className={styles.apply__input}
              placeholder="1234@gmail.com"
            ></input>
          </div>
          <div className={styles.button__container}>
            <Button text="신청하기" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
