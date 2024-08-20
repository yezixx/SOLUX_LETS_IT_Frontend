import { useEffect, useState } from "react";
import { getProfile } from "../../../service/profileService";

const useMyProfileGet = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log(res.data); // 확인 필요
        setProfileData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return { profileData };
};
export default useMyProfileGet;
