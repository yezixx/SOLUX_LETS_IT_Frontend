import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";
<<<<<<< HEAD
import { RouterInfo } from "./Components/RouterInfo";

const RouterObject = createBrowserRouter(RouterInfo);

function App() {
  return (
    <div className={styles.wrap}>
      <Header />
      <RouterProvider router={RouterObject} />
    </div>
  );
=======
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
>>>>>>> 24b2e8beac2e34a90323d6d328e08e971cc21025
}

export default App;
