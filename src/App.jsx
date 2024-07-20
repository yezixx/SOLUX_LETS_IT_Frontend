import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import { RouterInfo } from "./Screen/RouterInfo";

const RouterObject = createBrowserRouter(RouterInfo);

function App() {
  return (
    <div className={styles.wrap}>
      <RouterProvider router={RouterObject} />
    </div>
  );
}

export default App;
