import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import useGlobalData from '@docusaurus/useGlobalData'
import { log } from '../utils'

import styles from './index.module.css'

import imgCss from '@site/static/img/icons/css3.webp'
import imgHtml from '@site/static/img/icons/html.webp'
import imgJS from '@site/static/img/icons/js.png'

function Card(props) {
  const { blog } = props
  const { metadata } = blog
  const { permalink, title, readingTime, formattedDate, tags } = metadata

  const hasTag = (tag: string): boolean => {
    return !!tags?.find((t) => t.label === tag)
  }

  const imgBind = (() => {
    if (hasTag('css')) {
      return {
        alt: 'css',
        src: imgCss,
      }
    }
    if (hasTag('html')) {
      return {
        alt: 'html',
        src: imgHtml,
      }
    }
    return {
      alt: 'js',
      src: imgJS,
    }
  })()

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <img {...imgBind} />
        </div>

        <div className={styles.cardTitle}>
          <Link to={permalink}>{title}</Link>
        </div>

        <div className={styles.cardTip}>
          {formattedDate} • 阅读需 {Math.ceil(readingTime) || 1} 分钟
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
  log('全局博客的内容：', blogPluginData)

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
