import { Post } from "./components/Post";
import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Everton De Grande"
            content="lorem"
            avatar="https://github.com/evertondg.png"
            occupation="Web Developer"
          />
          <Post
            author="Cindy Yonemi Hosoya"
            content="conteudo2"
            avatar="https://github.com/cindyyonemi.png"
            occupation="Web Developer"
          />
          <Post
            author="Naruto Uzumaki"
            content="Tô certo"
            avatar="https://github.com/filipedeschamps.png"
            occupation="Web Developer"
          />
        </main>
      </div>
    </>
  );
}
