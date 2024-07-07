import RouteName from '../../../Components/RouteName/RouteName'
import SideNav from '../../../Components/SideNav/SideNav'
import styles from './MyPortfolio.module.css'
import PortfolioBtn from '../../../Components/Project_Button/ProjectBtn'

const route = ['마이페이지', '포트폴리오 관리']
const sidenavCont = ['프로필 관리','포트폴리오 관리','개인정보 수정']

const MyPortfolio = ()=>{
    return(
        <div className={styles.myPortfolio}>
        <RouteName route={route}/>

        {/*사이드 네비게이터 + 포트폴리오 화면 컨텐츠*/}
        <div className={styles.myPortfolio__wrap}>

            {/*사이드 네비게이터 */}
            <SideNav content={sidenavCont}/>

            {/*지금 작성할 수 있는 포트폴리오 + 포트폴리오 열람 */}
            <div className={styles.myPortfolio__contentWrap}>
                
                 {/*지금 작성할 수 있는 포트폴리오 */}
                <div className={styles.myPortfolio__writePortfolio}>
                    {/*제목 */}
                    <div className={styles.myPortfolio__title}>
                        지금 작성할 수 있는 포트폴리오
                    </div>
                    {/*작성할 수 있는 포트폴리오 나열 */}
                    <div className={styles.myPortfolio__cont}>
                        <PortfolioBtn 
                        button1Text='작성하기' 
                        button2Text='삭제' />
                        <PortfolioBtn 
                        button1Text='작성하기' 
                        button2Text='삭제' />
                        <PortfolioBtn
                         button1Text='작성하기' 
                         button2Text='삭제' />
                        <PortfolioBtn 
                        button1Text='작성하기' 
                        button2Text='삭제' />
                    </div>
                </div>

                {/*포트폴리오 열람하기 */}
                <div className={styles.myPortfolio__portfolioView}>
                    {/*제목 */}
                    <div className={styles.myPortfolio__title}>
                        포트폴리오 열람하기
                    </div>
                    {/*열람할 수 있는 포트폴리오 나열 */}
                    <div className={styles.myPortfolio__cont}>
                        <PortfolioBtn buttonShow={false}/>
                        <PortfolioBtn buttonShow={false}/>
                    </div>
                </div>
            </div>

                </div>

                
        </div>
    )
}



export default MyPortfolio