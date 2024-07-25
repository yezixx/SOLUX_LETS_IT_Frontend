import CalendarIcon from "../../../Image/Icons/CalendarIcon";
import UserIcon from "../../../Image/Icons/UserIcon";
import styles from "./PostInfo.module.css";
import PlusCircleIcon from "../../../Image/Icons/PlusCircleIcon";
import BookmarkIcon from "../../../Image/Icons/BookmarkIcon";
import CheckIcon from "../../../Image/Icons/CheckIcon";

const PostInfo = ({ post, isBookmark, onClickScrap }) => {
  return (
    <div className={styles.PostInfo}>
      <div className={styles.PostInfo__container}>
        <div className={styles.PostInfo__header}>
          <div className={styles.PostInfo__title}>{post.title}</div>
          <div className={styles.PostInfo__scrap} onClick={onClickScrap}>
            <BookmarkIcon isBookmark={isBookmark} />
          </div>
        </div>
        <div className={styles.PostInfo__body}>
          <div className={styles.PostInfo__postInfo}>
            <div>
              <CalendarIcon />
              <div className={styles.PostInfo__subLabel}>모집마감</div>
              {`${post.recruitEndDate}`}
            </div>
            <div>
              <UserIcon />
              <div className={styles.PostInfo__subLabel}>모집인원</div>
              {`${post.recruitmentCount}명`}
            </div>
            <div>
              <PlusCircleIcon />{" "}
              <div className={styles.PostInfo__subLabel}>우대사항</div>
              <div className={styles.PostInfo__preferred}>
                {post.preference}
              </div>
            </div>
          </div>
          <div className={styles.PostInfo__projInfo}>
            <div className={styles.PostInfo__label}>프로젝트 정보</div>
            <div className={styles.PostInfo__projInfoDetail}>
              <div>
                <div className={styles.PostInfo__subLabel}>예상 기간</div>
                {post.projectInfo.projectPeriod}
              </div>
              <div>
                <div className={styles.PostInfo__subLabel}>진행 방식</div>
                {post.projectInfo.method}
              </div>
              <div>
                <div className={styles.PostInfo__subLabel}>지역</div>
                {post.projectInfo.regionId}
              </div>
              <div>
                <div className={styles.PostInfo__subLabel}>난이도</div>
                {"중급"}
              </div>
              <div>
                <div className={styles.PostInfo__subLabel}>연령대</div>
                {post.projectInfo.ageGroup}
              </div>
            </div>
          </div>
          <div className={styles.PostInfo__skillInfo}>
            <div>
              <div className={styles.PostInfo__label}>
                필요 스택
                {post.isNegotiable && (
                  <span>
                    <CheckIcon
                      color="var(--main-color2)"
                      width="14px"
                      height="14px"
                    />
                    협의 가능
                  </span>
                )}
              </div>
              <div className={styles.PostInfo__skill}>
                {post.requiredSkills.map((skill, index) => (
                  <div key={index}>{skill}</div>
                ))}
              </div>
            </div>
            <div className={styles.PostInfo__meta}>{`${"2024-07-04"} . 조회 ${
              post.viewCount
            } . 스크랩${post.scrapCount}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
