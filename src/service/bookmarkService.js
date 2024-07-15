import apiClient from "./apiClient";

// 북마크 저장 - 북마크 아이콘 클릭 시(북마크 저장)
export const saveBookmarks = (postId, userId, bookmarkData) => {
  return apiClient.post(`/${postId}/bookmarks/${userId}/save`, bookmarkData);
};

// 북마크 삭제 - 북마크 아이콘 클릭 시(북마크 해제)
export const deleteBookmarks = (postId, userId) => {
  return apiClient.delete(`/${postId}/bookmarks/${userId}/delete`);
};

// 북마크 리스트업 - 내 프로젝트 > 스크랩한 프로젝트 화면
export const getBookmarks = (userId) => {
  return apiClient.get(`/bookmarks/${userId}/list`);
};
