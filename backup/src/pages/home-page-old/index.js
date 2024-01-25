import React from "react";
import clsx from "clsx";
import { useHistory } from "@docusaurus/router";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={styles.title}>
      <span>Hello World</span>
    </header>
  );
}

function SearchBar() {
  const [value, setValue] = React.useState("");
  const history = useHistory();

  // 跳转至搜索页
  const handleSearch = React.useCallback(() => {
    const q = value?.trim();
    if (q) {
      history.push(`/search?q=${q}`);
    }
  }, [value]);

  return (
    <div>
      <div className={styles.searchBar}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBarWrap}>
            <div className={styles.searchBarIcon}>
              <i className="far fa-search"></i>
            </div>

            <div className={styles.searchBarInput}>
              <input
                type="text"
                className={styles.searchBarInputCore}
                value={value}
                onChange={(eve) => {
                  setValue(eve.target.value);
                }}
                onKeyDown={(eve) => {
                  // 回车键
                  if (eve.keyCode === 13) {
                    handleSearch()
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <center className={styles.searchBarButton}>
        <button className={styles.searchBarButtonCore} onClick={handleSearch}>
          在文档中搜索
        </button>
      </center>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <main>
        <div className="row">
          <div className={clsx("col col--8", styles.container)}>
            <HomepageHeader />
            <SearchBar />
          </div>
        </div>
      </main>
    </Layout>
  );
}
