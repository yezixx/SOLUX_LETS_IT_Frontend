import { useLocation } from "react-router-dom";
import Profile from "../../../components/profile/Profile";
import styles from "./MemberProfile.module.css";
import { useEffect, useState } from "react";
import { getApplyProfile } from "../../../service/profileService";

const MemberProfile = () => {
  const location = useLocation();
  const { userId } = location.state;
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await getApplyProfile(userId);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.memberProfile}>
      <Profile user={user} type={"INTEAMBOARD"} />
    </div>
  );
};

export default MemberProfile;
