import apiClient from "./apiClient";

// 전체 프로젝트 조회 - 프로젝트 찾기 (전체) 화면
export const getPostsList = () => {
  return apiClient.get(`/posts/list`);
};

// 구인글 등록 - 구인글 작성 화면에서 업로드 버튼
export const createPosts = async (postData) => {
  try {
    const response = await apiClient.post("/posts/upload", postData);
    return response.data;
  } catch (error) {
    console.error("Error fetching create post:", error);
    throw error;
  }
};

// 구인글 수정 - 구인글 상세 보기 화면에서 수정 버튼
export const updatePosts = (postId, userId, updatedPostData) => {
  return apiClient.patch(`/posts/${postId}/update/${userId}`, updatedPostData);
};

// 구인글 삭제 - 내 프로젝트 > 구인/신청 프로젝트 화면에서 글 삭제 버튼
export const deletePosts = (userId) => {
  return apiClient.delete(`/posts/${userId}/delete`);
};

// 댓글 목록 - 구인글 상세 보기 화면
export const getComments = (postId) => {
  return apiClient.get(`/posts/${postId}`);
};

// 프로젝트 상세 조회 - 구인글 상세 보기
export const getPosts = (postId) => {
  return apiClient.get(`/posts/${postId}`);
};
