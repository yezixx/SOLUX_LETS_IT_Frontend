import styles from './ProfileLink.module.css'

const ProfileLink = ()=>{
    return(
        <div className={styles.ProfileLink}>
            <div className={styles.ProfileLink__icon}>icon</div>
            <div className={styles.ProfileLink__link}>link</div>
        </div>
        
    )
}

export default ProfileLink