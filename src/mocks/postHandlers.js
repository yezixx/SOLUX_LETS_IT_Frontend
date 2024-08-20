import { http, HttpResponse } from "msw";

const projects = [
  {
    userId: 1,
    postId: 5,
    title: "프로젝트 제목5",
    content: "프로젝트 내용",
    totalPersonnel: "5명",
    recruitDueDate: "2024-12-31",
    preference: "특이사항 없음",
    stack: ["Java", "Spring Boot"],
    difficulty: "입문",
    onOff: "대면",
    deadline: false,
    categoryId: ["웹프론트", " 웹백엔드"],
    ageGroup: "20대",
    region: "서울",
    subRegion: "강남구",
    createdAt: "2024-07-27T10:39:46.129+00:00",
    updatedAt: "2024-07-27T10:39:46.129+00:00",
    viewCount: 0,
    scrapCount: 0,
    projectPeriod: "3개월"
  },
  {
    userId: 1,
    postId: 3,
    title: "프로젝트 제목3",
    content: "프로젝트 내용",
    totalPersonnel: "5명",
    recruitDueDate: "2024-12-31",
    preference: "특이사항 없음",
    stack: ["Java", "Spring Boot"],
    difficulty: "입문",
    onOff: "대면",
    deadline: false,
    categoryId: ["웹프론트", " 웹백엔드"],
    ageGroup: "20대",
    region: "서울",
    subRegion: "강남구",
    createdAt: "2024-07-27T10:39:30.464+00:00",
    updatedAt: "2024-07-27T10:39:30.464+00:00",
    viewCount: 0,
    scrapCount: 0,
    projectPeriod: "3개월"
  }
];

export const postHandlers = [
  // 프로젝트 목록
  http.get("api/posts/list", () => {
    return HttpResponse.json({
      data: projects
    });
  })
];
