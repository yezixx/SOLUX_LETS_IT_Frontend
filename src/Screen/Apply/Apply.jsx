import Button from "../../Components/Button/Button";
import RouteName from "../../Components/RouteName/RouteName";
import styles from "./Apply.module.css";
import BriefProfile from "./BriefProfile/BriefProfile";
import useApplyPost from "./useApplyPost";
import useMyProfileGet from "../MyPage/MyProfile/useMyProfileGet";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../service/postService";

const Apply = () => {
  //지원자 프로필
  const { profileData } = useMyProfileGet();
  //프로젝트명
  const { postId } = useParams();
  const [title, setTitle] = useState();

  useEffect(() => {
    getPosts(postId)
      .then((res) => setTitle(res.data.title))
      .catch((error) => console.error(error));
  }, []);
  // applyData - onChange를 통해 input으로 받은 값을 모아둔 객체
  const { onChange, handleSubmit, ApplyFormError } = useApplyPost();
  //CSS className 분리 - 오류 시 focus
  const getInputClassName = (name) => {
    return `${styles.apply__input} ${
      ApplyFormError.includes(name) ? styles.formError : ""
    }`;
  };
  return (
    <div>
      <RouteName route={["프로젝트 신청"]} />
      <div className={styles.apply}>
        {/*프로필 미리보기 */}
        <div className={styles.apply__profile}>
          <div className={styles.apply__title}>프로필 미리보기</div>
          {/*프로필을 담을 box */}
          <div className={styles.apply__profile_container}>
            <BriefProfile user={profileData} />
          </div>
        </div>

        {/*지원서  폼 */}
        <form className={styles.apply__form} onSubmit={handleSubmit}>
          {/*지원 정보 확인 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>지원정보확인</div>
            <span>
              <div>프로젝트명 </div>
              <div> | </div>
              {/*프로젝트 제목 */}
              {title}
            </span>
          </div>
          {/*선호 스택 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>선호 스택</div>
            <input
              name="preferStack"
              onChange={onChange}
              className={getInputClassName("preferStack")}
              placeholder="리액트"
            />
          </div>
          {/*희망 분야 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>희망 분야</div>
            <input
              name="desiredField"
              onChange={onChange}
              className={getInputClassName("desiredField")}
              placeholder="프론트엔드"
            />
          </div>
          {/*전달메세지 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>전달 메세지</div>
            <textarea
              onChange={onChange}
              name="applyContent"
              placeholder="사용할 수 있는 기술 스택, 자기 소개 등"
              className={`${
                styles[`apply__input--textarea`]
              } ${getInputClassName("applyContent")}`}
            />
          </div>
          {/*연락 수단 */}
          <div className={styles.apply__container}>
            <div className={styles.apply__title}>연락 수단</div>
            <input
              onChange={onChange}
              name="contact"
              className={getInputClassName("contact")}
              placeholder="1234@gmail.com"
            />
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
