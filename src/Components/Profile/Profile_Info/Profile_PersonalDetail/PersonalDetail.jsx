import styles from './PersonalDetail.module.css'

const PersonalDetail = ({name,age})=>{
    return(
        <div className={styles.myProfile__info__personalDetail}>
                        
        {/*이름*/}
            <span className={styles.myProfile__info__name}>{name}</span>

        {/*나이*/}
            <span className={styles.myProfile__info__age}>{age}</span>
        </div>
    )
}

export default PersonalDetail