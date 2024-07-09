import Button from '../../../../Components/Button/Button'
import ProfilePhoto from '../../../../Components/Profile/Profile_Info/Profile_Photo/ProfilePhoto'
import styles from './ApplicantBtn.module.css'

const ApplicantBtn= ()=>{
    return(
        <div className={styles.Applicant}>
            {/*사용자 사진 */}
            <ProfilePhoto type='applicant'/>

            <div className={styles.Applicant__Application}>
                {/*이름 + 지원서 보기 버튼 */}
                <div className={styles.Applicant__ApplicationBtn}>
                김코더 FE<span>|</span> 
                <Button text='지원서 보기' type='NONE__TEXT-MC2-16'/>
                </div>

                {/*수락, 거절 버튼 */}
                <div className={styles.Applicant__buttonWrap}>
                    <Button text='거절' type='SEC_70x40'/>
                    <Button text='수락' type='MC2_70x40' />
                </div>

            </div>


        </div>
    )
}

export default ApplicantBtn