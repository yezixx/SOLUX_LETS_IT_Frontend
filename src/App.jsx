import styles from "./App.module.css";
import Header from "./Components/Header/Header";
import MyProfile from "./Screen/MyPage/Profil/MyProfile";
function App() {
  return (
  <div className={styles.wrap}>
    <Header />
    <div className={styles.main}> 
    <MyProfile /> {/*라우팅 시 outlet이 들어갈 부분*/}
    </div>
  </div>
  )
}

export default App;
