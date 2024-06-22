import GraphBar from '../../Graph/GraphBar'
import styles from './ProfileTier.module.css'

const ProfileTier = ({tierScore})=>{
    return(
        <div className={styles.myProfile__tier}>
        <div className={styles.myProfile__title}>
            매너<span> 티어</span> 
        </div>
        <div className={styles.myProfile__tier__graph}>
            <GraphBar 
            showNumbers='true' 
            borderRadius='100px' 
            bgc='#1f9a00' 
            color='#1f9a00'
            value={tierScore}/>
        </div>
    </div>
    )
}

export default ProfileTier