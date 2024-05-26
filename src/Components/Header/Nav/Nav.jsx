import styles from './Nav.module.css'
import Logo from '../../../Image/Logo.svg?react'
import { useState } from 'react';

const Nav= ()=>{
    const navCont = ['로그아웃','마이페이지','아이콘']

    const [hoverState, setHoverState] = useState({
        '마이페이지' : false
    });
    
    const subNavCont = {
        '마이페이지' : ['프로필 관리','포트폴리오 관리','개인정보 수정']
    }

    const handleMouseEnter = (menu) => {
        setHoverState(prevState => ({
            ...prevState,
            [menu]: true
        }));
    };

    const handleMouseLeave = (menu) => {
        setHoverState(prevState => ({
            ...prevState,
            [menu]: false
        }));
    };
    
    return(
        <div className={styles.navWrap}>
            <div className={styles.navCont}>
                <Logo width='90px' height='50px'/>
                <div className={styles.searchBar}>
                    <input placeholder='프로젝트부터 포트폴리오까지!' />
                </div>
                {navCont
                    .map((menu, id) => (
                        <div key={id} onMouseEnter={() => handleMouseEnter(menu)} onMouseLeave={() => handleMouseLeave(menu)}>
                            <button>{menu}</button>
                            {hoverState[menu] && subNavCont[menu] && (
                                <ul className={styles.subNavWrap}>
                                    {subNavCont[menu].map((item, itemId) => <li key={itemId}>{item}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Nav