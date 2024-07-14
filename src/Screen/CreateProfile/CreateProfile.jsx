import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import StepBar from "../../Components/StepBar/StepBar";
import styles from "./CreateProfile.module.css";

const CreateProfile = () => {
  return (
    <div className={styles.createProfile}>
      <div className={styles.createProfile__stepBar}>
        <StepBar type="COMPLETE" />
      </div>
      <div className={styles.createProfile__profileForm}>
        <ProfileForm />
      </div>
    </div>
  );
};

export default CreateProfile;
