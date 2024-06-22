import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";
import { RouterInfo } from "./Components/RouterInfo";

const RouterObject = createBrowserRouter(RouterInfo);

function App() {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.main}>
        <RouterProvider router={RouterObject} />
      </div>
    </div>
  );
}

export default App;
