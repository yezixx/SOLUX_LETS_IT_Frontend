import styles from "./App.module.css";
import Header from "./Components/Header/Header";
import Teamboard from "./Components/Teamboard/Teamboard";

function App() {
  return (
    <div className={styles.wrap}>
      <Header />
      <Teamboard />
    </div>
  );
}

export default App;
