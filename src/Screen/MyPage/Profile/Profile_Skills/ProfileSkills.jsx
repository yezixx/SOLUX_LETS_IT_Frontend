import GraphBar from '../../Graph/GraphBar'
import styles from './ProfileSkills.module.css'

const ProfileSkills = ({skills})=>{
    const skillName = Object.keys(skills)
    const skillScore = Object.values(skills)

    console.log(skillName)
    return(
        <div className={styles.myProfile__skills}>
        <div className={styles.myProfile__title}>
                SKILLS
            <div className={styles.myProfile__skills__graph}>

                {/*skill명*/}
                    {skillName.map((name, key) => (
                        <div className={styles.myProfile__skills__graphName} key={key}>
                        {name}</div>))}

                {/*skillScore - 스킬 점수 / 그래프*/}
                    {skillScore.map((value, key) =>(
                        <GraphBar 
                        key = {key} 
                        border='none'
                        bgc='var(--sub-color2)' 
                        color='var(--text-color2)'
                        value={value}
                        showNumbers={false} />
                ))}
                
                <div className={styles.myProfile__skills__graphBar}>

                </div>

            </div>
        </div>
    </div>
    )
}

export default ProfileSkills