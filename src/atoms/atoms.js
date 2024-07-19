import { atom } from "jotai";
//userData
export const userId = atom("test");
// 구인/신청 프로젝트 리스트
export const apHireProjAtom = atom([]);
//지원자 목록 (내 프로젝트 -> 구인/신청 프로젝트 -> 지원자 프로필사진+이름)
export const applicantListAtom = atom([]);
//프로젝트 신청창 form
export const applicant = atom([]);
