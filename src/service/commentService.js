import apiClient from "./apiClient";

// 댓글 등록 - 구인글 상세 보기 화면에서 댓글 작성 후 등록 버튼
export const createComment = (postId, commentData) => {
  return apiClient.post(`comments/${postId}/upload`, commentData);
};

// 댓글 수정 - 구인글 상세 보기 화면에서 댓글 수정 후 수정 버튼
export const updateComment = (postId, commentId, updatedCommentData) => {
  return apiClient.patch(
    `comments/${postId}/update/${commentId}`,
    updatedCommentData
  );
};

// 댓글 삭제 - 구인글 상세 보기 화면에서 댓글 삭제 버튼
export const deleteComment = (commentId) => {
  return apiClient.delete(`comments/${commentId}/delete`);
};
