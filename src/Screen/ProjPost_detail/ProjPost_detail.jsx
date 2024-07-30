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
import { getPosts } from "../../service/postService";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../service/commentService";

const ProjPost_detail = () => {
  // const loginUserId = useAtomValue(userIdAtom);
  const user = JSON.parse(localStorage.getItem("user"));
  const loginUserId = user.userId;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    totalPersonnel: 0,
    createdAt: "",
    recruitDueDate: "",
    preference: "",
    onOff: "",
    region: "",
    subRegion: "",
    projectPeriod: "",
    ageGroup: "",
    difficulty: "",
    stack: [],
    content: ``,
    scrapCount: 0,
    viewCount: 0,
    userId: "",
    title: "",
    comments: [
      {
        commentId: 1,
        userId: "",
        name: "",
        comCreateDate: "",
        comUpdateDate: "",
        comContent: ``,
      },
    ],
  });
  const postId = useParams().postId;

  const [comments, setComments] = useState(post.comments);
  const commentInputRef = useRef();

  const [isBookmark, setIsBookmark] = useState(false);

  const nav = useNavigate();

  const isWriter = () => {
    return String(post.userId) === String(loginUserId);
  };

  useEffect(() => {
    setLoading(true);
    getPosts(postId)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments);
        setLoading(false);
        console.log(res.data);
        console.log(res.data.comments);
      })
      .catch((error) => {
        console.log("post detail error(ProjPost_Detail.jsx): ", error);
        alert("게시글을 불러오는데 실패했습니다.");
        nav(-1);
      });
  }, []);

  const onCraeteComment = async (content) => {
    const res = await createComment(Number(postId), {
      comContent: content,
    });
    const commentData = res.data;
    console.log(res.data);
    setComments([
      ...comments,
      {
        commentId: commentData.commentId,
        userId: loginUserId,
        nickname: commentData.nickname,
        comCreateDate: commentData.comCreateDate,
        comUpdateDate: commentData.comUpdateDate,
        comContent: commentData.comContent,
      },
    ]);
  };

  const onUpdateComment = async (writerId, commentId, content) => {
    const res = await updateComment(Number(postId), Number(commentId), {
      comContent: content,
    });
    const commentData = res.data;
    console.log(res.data);
    setComments(
      comments.map((comment) =>
        comment.userId === writerId
          ? {
              ...comment,
              comUpdateDate: commentData.comUpdateDate,
              comContent: content,
            }
          : comment
      )
    );
  };

  const onDeleteComment = (commentId) => {
    setComments(
      comments.filter(
        (comment) => String(comment.commentId) !== String(commentId)
      )
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
                  commentId={comment.commentId}
                  userId={comment.userId}
                  nickname={comment.nickname}
                  comCreateDate={comment.comCreateDate}
                  comUpdateDate={comment.comUpdateDate}
                  comContent={comment.comContent}
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
