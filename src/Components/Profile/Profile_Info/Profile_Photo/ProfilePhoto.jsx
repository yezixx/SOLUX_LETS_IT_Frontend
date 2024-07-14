import styles from './ProfilePhoto.module.css'

const ProfilePhoto = ({type})=>{
    return(
        <div className={`${styles.myProfile__photo} ${styles[`myProfile__photo--${type}`]}`}>프로필 사진</div>
    )
}

export default ProfilePhoto