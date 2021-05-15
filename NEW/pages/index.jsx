import Toolbar from "../components/toolbar.jsx";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Toolbar />
      <div className={styles.homeContainer}>
        <h4>Welcome to the news app</h4>
      </div>
    </div>
  );
}
