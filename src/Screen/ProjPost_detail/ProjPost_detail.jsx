import RouteName from "../../Components/RouteName/RouteName";
import styles from "./ProjPost_detail.module.css";
import PostInfo from "./PostInfo/PostInfo";
import Button from "../../Components/Button/Button";
import BookmarkIcon from "../../Image/Icons/BookmarkIcon";
import CommentItem from "./CommentItem/CommentItem";
import UserCircleIcon from "../../Image/Icons/UserCircleIcon";
import Loading from "../../Components/Loading/Loading";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../atoms/atoms";
import { useEffect, useRef, useState } from "react";
import { getComments, getPosts } from "../../service/postService";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../service/commentService";

const mock_post = {
  peopleNum: 5,
  createdAt: "2024-04-06, 15:30",
  recruitDueDate: "2024-07-31",
  preference: "관련 경력 3년 이상, Git 사용 경험",
  onOff: "대면",
  region: "서울",
  subRegion: "강남구",
  projectPeriod: "3개월",
  ageGroup: "20대 후반 ~ 30대 초반",
  difficulty: "입문",
  stack: ["Java", "React"],
  content: `    [프로젝트 주제]
    안녕하세요. 저희는 현재 한국에 거주하거나 방문한 또는 방문할 외국인을 위해 다양한 정보를 제공할 수 있는 커뮤니티 사이트를 만들고 있습니다. 
    현재 150명 정도 있는 디스코드 채널에서 외국인들에게 필요한 정보들을 수집 및 정리하고 있으며 이러한 정보들을 외국인 친화적인 방법으로 제공하려고 합니다.
    현재 MVP기능은 단순 게시판 기능으로 생각하고 있으며 운영하면서 다양한 기능들을 추가해보려고 합니다. 
    현재 생각해 둔 기능을 다음과 같습니다.
    맛집 및 관광지 지도
    언어교환 첨삭 기능
    물품 공구 기능
    
    [ 팀 구성 ]
    현재는 주니어 백엔드 개발자 2명으로 이루어져 있으며, 프론트 개발까지 같이 하다보니 힘이 들어 프론트엔드 개발자님을 모시고 있습니다.
    
    [ 저희는 이렇게 협업하고 있어요 ]
    슬랙을 통해 업무 내용을 주고 받고 있습니다.
    Jira를 통해 일주일 단위로 작업을 공유하고 스프린트 하고 있습니다.
    Figma를 통해 간단한 와이어프레임을 그리고 있습니다. 
    최대한 이상적인 협업을 하기위해 노력하고 있으나 적은 경험으로 부족할 수 있습니다만, 부정적인 피드백에도 항상 열려있습니다 :)
    
    [ 기술 스택 ]
    - 프론트 : Nuxt.js로 되어 있으나 Next.js로 다시 구성하셔도 괜찮습니다.
    - 백엔드 : Java, Spring
    `,
  scrapCount: 20,
  viewCount: 50,
  userId: "1",
  title: "웹 사이드 프로젝트 팀원 모집",
};

const mock_comments = [
  {
    id: 1,
    writer: "CODER.",
    createDate: "2024-04-06, 15:30",
    updateDate: "2024-04-06, 15:30",
    content: `정기적으로 모이는 요일이 있을까요? 스택을 다뤄본 적은 없지만 이론적인 지식만 있는데 참여 가능할까요?`,
  },
  /*
  {
    id: 0,
    writer: "CODER.",
    createDate: "2024-04-06, 15:30",
    updateDate: "2024-04-06, 15:30",
    content: `정기적으로 모이는 요일이 있을까요? 스택을 다뤄본 적은 없지만 이론적인 지식만 있는데 참여 가능할까요?`,
  },
  {
    id: 1,
    writer: 1,
    createDate: "2024-04-06, 15:30",
    updateDate: "2024-04-06, 16:00",
    content: `모임 요일은 팀원 모집 후 상의하여 결정하려고 합니다.
    해당 스택을 조금이라도 사용해보신 분을 찾고있습니다.`,
  },*/
];

const ProjPost_detail = () => {
  const loginUserId = useAtomValue(userIdAtom);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(mock_post);
  const postId = useParams().postId;

  const [comments, setComments] = useState(mock_comments);
  const commentIdRef = useRef(2);
  const commentInputRef = useRef();

  const [isBookmark, setIsBookmark] = useState(false);

  const nav = useNavigate();

  const isWriter = () => {
    return String(post.userId) === String(loginUserId);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getPosts(postId)
  //     .then((data) => {
  //       setPost(data);
  //       setLoading(false);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log("post detail error(ProjPost_Datil.jsx): ", error);
  //       //alert("게시글을 불러오는데 실패했습니다.");
  //       setLoading(false);
  //       //nav(-1);
  //     });
  //   /*
  //   getComments(postId)
  //     .then((data) => {
  //       setComments(data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("comment list error(ProjPost_Datil.jsx): ", error);
  //       alert("댓글 목록을 불러오는데 실패했습니다.");
  //       setLoading(false);
  //     });*/
  // }, []);

  const onCraeteComment = (content) => {
    setComments([
      ...comments,
      {
        id: commentIdRef.current++,
        writer: loginUserId,
        createDate: new Date().getTime(),
        updateDate: new Date().getTime(),
        content: content,
      },
    ]);
    const res = createComment(Number(postId), Number(loginUserId), {
      comContent: content,
    });
    console.log(res.data);
  };

  const onUpdateComment = (commentId, content) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              updateDate: new Date().getTime(),
              content: content,
            }
          : comment
      )
    );
    const res = updateComment(
      Number(postId),
      Number(commentId),
      Number(loginUserId),
      {
        comContent: content,
      }
    );
    console.log(res.data);
  };

  const onDeleteComment = (commentId) => {
    setComments(
      comments.filter((comment) => String(comment.id) !== String(commentId))
    );
    deleteComment(Number(postId), Number(commentId));
  };

  const onClickCreateComment = () => {
    if (commentInputRef.current.value === "") {
      commentInputRef.current.focus();
      return;
    }
    onCraeteComment(commentInputRef.current.value);
    commentInputRef.current.value = "";
  };

  const onClickApply = () => {
    nav(`/apply/${postId}`);
  };

  const onClickUpdate = () => {
    alert("게시글 수정버튼 클릭");
  };

  const onClickScrap = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <div className={styles.ProjPost_detail}>
      {loading && <Loading />}
      <main>
        <div className={styles.ProjPost_detail__route}>
          <RouteName route={["프로젝트 찾기", "구인글 상세 보기"]} />
        </div>
        <div>
          <div className={styles.ProjPost_detail__header}>
            <PostInfo
              post={post}
              isBookmark={isBookmark}
              onClickScrap={onClickScrap}
            />
          </div>
          <div className={styles.ProjPost_detail__content}>
            <div className={styles.ProjPost_detail__label}>상세 내용</div>
            <div className={styles.ProjPost_detail__description}>
              {post.content}
            </div>
          </div>
        </div>
      </main>
      <div className={styles.ProjPost_detail__commentsWarp}>
        <div className={styles.ProjPost_detail__commentsContainer}>
          <div className={styles.ProjPost_detail__label}>
            댓글 <span>{comments.length}</span>
          </div>
          <div className={styles.ProjPost_detail__commentsContent}>
            <div className={styles.ProjPost_detail__commentList}>
              {comments.map((comment, index) => (
                <CommentItem
                  key={index}
                  {...comment}
                  postWriter={post.userId}
                  inputRef={commentInputRef}
                  onDelete={onDeleteComment}
                  onUpdate={onUpdateComment}
                />
              ))}
            </div>
            <div className={styles.ProjPost_detail__commentInput}>
              <UserCircleIcon color="var(--main-color2)" />
              <textarea
                ref={commentInputRef}
                placeholder="자유롭게 질문을 남겨주세요"
              />
              <Button
                text="등록"
                type="MC2_120x40"
                onClick={onClickCreateComment}
              />
            </div>
          </div>
        </div>
      </div>
      {isWriter() ? null : (
        <footer>
          <div className={styles.ProjPost_detail__scrap} onClick={onClickScrap}>
            <BookmarkIcon width="30px" height="30px" isBookmark={isBookmark} />
          </div>
          {isWriter() ? (
            <Button text="수정" type="SEC_120x40" onClick={onClickUpdate} />
          ) : (
            <Button text="신청" type="MC2_180x40" onClick={onClickApply} />
          )}
        </footer>
      )}
    </div>
  );
};

export default ProjPost_detail;
