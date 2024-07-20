import { useEffect, useState } from "react";
import { getApply } from "../../../../service/applyService";
import { getProfile } from "../../../../service/profileService";

//프로필 + 지원서 db 가져오는 훅
const useProfileView = (applyId) => {
  //db받아올 state설정 (해당 페이지에서만 이용, 전역x)
  const [applicantView, setApplicantView] = useState(null);
  const [profileView, setProfileView] = useState(null);
  useEffect(() => {
    //지원서 db 호출
    getApply(applyId)
      .then((res) => {
        setApplicantView(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [applyId]);
  useEffect(() => {
    //프로필 db 호출,  applicantView가 호출된 이후 가능
    if (applicantView.length > 0) {
      getProfile(applicantView.userId)
        .then((res) => {
          setProfileView(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [applicantView]);
  return { applicantView, profileView };
};
export default useProfileView;
