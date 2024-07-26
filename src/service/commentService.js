import apiClient from "./apiClient";

// 댓글 등록 - 구인글 상세 보기 화면에서 댓글 작성 후 등록 버튼
export const createComment = async (postId, commentData) => {
  console.log(postId, commentData);
  try {
    const response = await apiClient.post(
      `/comments/${postId}/upload`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching create comment", error);
    throw error;
  }
};

// 댓글 수정 - 구인글 상세 보기 화면에서 댓글 수정 후 수정 버튼
export const updateComment = async (postId, commentId, updatedCommentData) => {
  console.log(postId, commentId, updatedCommentData);
  try {
    const response = await apiClient.patch(
      `/comments/${postId}/update/${commentId}`,
      updatedCommentData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching update comment", error);
    throw error;
  }
};

// 댓글 삭제 - 구인글 상세 보기 화면에서 댓글 삭제 버튼
export const deleteComment = async (commentId) => {
  console.log(commentId);
  try {
    const response = await apiClient.delete(`/comments/${commentId}/delete`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delete comment", error);
    throw error;
  }
};
