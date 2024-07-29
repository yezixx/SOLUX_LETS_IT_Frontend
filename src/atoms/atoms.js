import { atom } from "jotai";
//삭제 예정
export const userIdAtom = atom(1);
export const userNameAtom = atom(1);

export const userAtom = atom({});
//프로젝트 신청창 form
export const applicant = atom([]);
//사용자 로그인 여부
export const isLoginAtom = atom(true);
//구인글 작성 (세부화면으로 쪼갰기에 atom 필요)
export const postProjectAtom = atom({
  title: "",
  content: "",
  peopleNum: "",
  recruitDueDate: "",
  preference: "",
  projectPeriod: "",
  ageGroup: "",
  stack: [],
  difficulty: "",
  onOff: "",
  regionId: 0,
  subRegionId: 0,
  categoryId: [],
});
