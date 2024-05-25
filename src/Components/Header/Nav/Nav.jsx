import styles from './Nav.module.css'
import Logo from '../../../Image/Logo.svg?react'

const Nav= ()=>{
    return(
        <div className={styles.navWrap}>
            <div className={styles.navCont}>
                <Logo width='90px' height='50px'/>
                <div className={styles.searchBar}>
                    <input placeholder='프로젝트부터 포트폴리오까지!'>
                    </input>
                </div>
                <button>로그아웃</button>
                <button>마이페이지</button>
                <button>아이콘</button>
            </div>
        </div>
    )
}

export default Nav