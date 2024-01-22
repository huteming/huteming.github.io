import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import useGlobalData from '@docusaurus/useGlobalData'

import styles from './index.module.css'

function Card(props) {
  const { blog } = props
  const { metadata } = blog
  const { permalink, title } = metadata

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}></div>
        <div className={styles.cardTitle}>
          <Link to={permalink}>{title}</Link>
        </div>
      </div>

      <div className={styles.cardCover}></div>

      <div className={styles.cardFooter}></div>
    </article>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  const globalData = useGlobalData()
  const blogPluginData: any = globalData?.['docusaurus-plugin-content-blog']?.['default']
  const { blogs } = blogPluginData
  // console.log('全局博客的内容：', blogPluginData)

  return (
    <Layout description={siteConfig.tagline}>
      <main className={styles.wrapper}>
        {/* <header className={styles.header}>Feed settings</header> */}

        <div className={styles.content}>
          {blogs.map((blog) => (
            <Card blog={blog} key={blog.id} />
          ))}
        </div>
      </main>
    </Layout>
  )
}
