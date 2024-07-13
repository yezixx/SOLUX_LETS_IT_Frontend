import RouteName from "../../Components/RouteName/RouteName";
import CalendarIcon from "../../Image/Icons/CalendarIcon";
import UserIcon from "../../Image/Icons/UserIcon";
import styles from "./ProjPost_detail.module.css";
import PlusCircleIcon from "../../Image/Icons/PlusCircleIcon";
import BookmarkIcon from "../../Image/Icons/BookmarkIcon";

const mock_post = {
  postInfo: {
    title: "웹 사이드 프로젝트 팀원 모집",
    writer: "홍길동",
    hireDate: {
      startDate: "2024-04-06",
      endDate: "2024-04-09",
    },
    hireTO: 0,
    preferred: ["배포 경험 1회", "지도 API 사용 경험"],
    postedDate: "2024-04-05, 14:30",
    hits: 160,
    scrap: 15,
  },
  projInfo: {
    expectedPeriod: {
      startDate: "2024-04-10",
      endDate: "2024-08-13",
    },
    field: "웹 개발",
    meetingType: "대면",
    area: "서울 강남구",
    level: "중급",
  },
  needSkill: ["React", "JavaScript"],
  detail: "프로젝트 설명",
};

const ProjPost_detail = () => {
  return (
    <div className={styles.ProjPost_detail}>
      <div className={styles.ProjPost_detail__route}>
        <RouteName route={["프로젝트 찾기", "구인글 상세 보기"]} />
      </div>
      <div>
        <div className={styles.ProjPost_detail__header}>
          <div className={styles.ProjPost_detail__info}>
            <div className={styles.ProjPost_detail__top}>
              <div className={styles.ProjPost_detail__title}>
                {mock_post.postInfo.title}
              </div>
              <div className={styles.ProjPost_detail__scrap}>
                <BookmarkIcon />
              </div>
            </div>
            <div className={styles.ProjPost_detail__postInfo}>
              <div>
                <CalendarIcon />{" "}
                <div className={styles.ProjPost_detail__label}>모집기간</div>
                {mock_post.postInfo.hireDate.startDate} ~
                {mock_post.postInfo.hireDate.endDate}
              </div>
              <div>
                <UserIcon />{" "}
                <div className={styles.ProjPost_detail__label}>모집인원</div>
                {mock_post.postInfo.hireTO === 0
                  ? "미정"
                  : mock_post.postInfo.hireTO + "명"}
              </div>
              <div>
                <PlusCircleIcon />{" "}
                <div className={styles.ProjPost_detail__label}>우대사항</div>
                <div className={styles.ProjPost_detail__preferred}>
                  {mock_post.postInfo.preferred.map((text, index) => (
                    <div key={index}>{text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.ProjPost_detail__projInfo}></div>
            <div className={styles.ProjPost_detail__skillInfo}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjPost_detail;
