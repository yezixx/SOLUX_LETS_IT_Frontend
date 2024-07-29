import apiClient from "./apiClient";

// 전체 프로젝트 조회 - 프로젝트 찾기 (전체) 화면
export const getPostsList = () => {
  return apiClient.get(`/posts/list`);
};

// 모집마감버튼
export const completePosts = async (postId) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/close`);
    return response.data;
  } catch (error) {
    console.error("Error fetching complete post:", error);
    throw error;
  }
};
// 구인글 등록 - 구인글 작성 화면에서 업로드 버튼
export const createPosts = async (userId, postData) => {
  try {
    const response = await apiClient.post(`/posts/${userId}/upload`, postData);
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
export const deletePosts = async (userId, postId) => {
  try {
    const response = await apiClient.delete(
      `/posts/${userId}/delete/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching create post:", error);
    throw error;
  }
};

// 댓글 목록 - 구인글 상세 보기 화면
export const getComments = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comment list:", error);
    throw error;
  }
};

// 프로젝트 상세 조회 - 구인글 상세 보기
export const getPosts = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${Number(postId)}`);
    console.log(response);
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("Error fetching post detail:");

    // 에러의 기본 메시지 출력
    console.error("Message:", error.message);
    throw error;
  }
};
