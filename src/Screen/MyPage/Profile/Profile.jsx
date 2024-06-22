
import RouteName from '../../../Components/RouteName/RouteName.jsx'
import SideNav from '../../../Components/SideNav/SideNav.jsx'
import styles from './Profile.module.css'
import ProfileLink from './Profile_Info/ProfileLink/ProfileLink.jsx'
import TierIcon from '../../../Image/Tier/tier_B.svg?react';
import ProfilePhoto from './Profile_Info/Profile_Photo/ProfilePhoto.jsx';
import PersonalDetail from './Profile_Info/Profile_PersonalDetail/PersonalDetail.jsx';
import ProfileTier from './Profile_Tier/ProfileTier.jsx';
import ProfileIntroduce from './Profile_Introduce/ProfileIntroduce.jsx';
import ProfileSkills from './Profile_Skills/ProfileSkills.jsx';

const sidenavCont = ['프로필 관리','포트폴리오 관리','개인정보 수정']
const route = ['마이페이지','프로필 관리']

//mock user data
const user={
    name : '김코더',
    age : '20대 초반',
    bio : '시각화로 소통하는 주니어 개발자',
    sns : {
        gmail:'coderkim123@gmail.com',
        github: 'http://github.com',
        blog : 'htttp://vlog.com',
    },
    tierScore : 60,
    skills: {
     css: 95,
     HTML: 80,
     React: 50,
     JavaScript: 95
     },
     introduce: '안녕하세요! 저는 프론트엔드 개발자로서 사용자 경험을 끊임없이 개선하고, 풍부한 인터랙션과 시각적 효과를 구현하는 데 열정을 가지고 있는 김코더입니다. 팀 내외에서의 협업을 통해 문제를 해결하고, 새로운 아이디어를 제안하는 것을 즐기며, 항상 자기 계발에 주력합니다. '
}

const MyProfile = ()=>{
    return(
        <div className={styles.myProfile}>
        <RouteName route={route}/>
            <div className={styles.myProfile__wrap}>
                <SideNav content={sidenavCont}/>
                <div className={styles.myProfile__box}>
                    <div className={styles.myProfile__left}>
                        {/*프로필 사진, 이름, 이메일/깃허브 등 링크 */}

                        {/*프로필 사진*/}
                        <ProfilePhoto />
        
                        {/*이름, 나이 */}
                        <PersonalDetail name={user.name} age={user.age}/>

                        {/*바이오*/}
                        <div className={styles.myProfile__info__bio}>
                        {user.bio}</div>

                        {/*sns링크*/}
                        <div className={styles.myProfile__info__sns}></div>
                            <ProfileLink />
                            <ProfileLink />
                            <ProfileLink />
                            {/*객체를 순회하며 props로 값을 전달하도록 수정 예정 2024.06.20 */}
                        </div>

                    {/*매너티어 아이콘 */}
                    <div className={styles.myProfile__tierIcon}><TierIcon width='50px' height='50px'/></div>

                    <div className={styles.myProfile__right}>
                        {/*매너티어, 소개글, skills */}
                        <ProfileTier tierScore={user.tierScore}/>
                        <ProfileIntroduce introduce={user.introduce}/>
                        <ProfileSkills skills={user.skills}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile