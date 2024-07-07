import RouteName from "../../../Components/RouteName/RouteName"
import SideNav from "../../../Components/SideNav/SideNav"
import styles from './Scrap.module.css'

const route = ['내 프로젝트','스크랩']
const sidenavCont = ['구인/신청 프로젝트','참여 프로젝트','스크랩']

const Scrap = ()=>{
    return(
        <div className={styles.Scrap}>
        <RouteName route={route} />

            <div className={styles.Scrap__wrap}>

                {/*사이드 네비게이터 */}
                <div className={styles.sideNav}>
                    <SideNav content={sidenavCont}/>
                </div>

                {/*스크랩한 프로젝트*/}
                <div className={styles.Scrap__contWrap}>
                    <div className={styles.Scrap__title}>
                        스크랩
                    </div>
                    {/*스크랩한 프로젝트 나열*/}
                    <div className={styles.Scrap__cont}>
                        프로젝트 컴포넌트 불러오기
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Scrap