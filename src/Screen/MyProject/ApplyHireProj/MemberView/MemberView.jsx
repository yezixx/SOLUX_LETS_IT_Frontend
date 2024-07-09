import MemberItem from '../../../../Components/MemberItem/MemberItem'
import styles from './MemberView.module.css'

const MemberView = ()=>{
    return(
        <div className={styles.teammateView}>
            <div className={styles.teammateView__MemberItems}>
                <MemberItem />
                <MemberItem />
                <MemberItem />
            </div>
        </div>
    )
}

export default MemberView