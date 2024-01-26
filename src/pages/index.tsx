import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import useGlobalData from '@docusaurus/useGlobalData'
import type { BlogPost } from '@docusaurus/plugin-content-blog'
import { fuzzyMatch, log } from '../utils'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import styles from './index.module.scss'

interface ICardProps {
  blog: BlogPost
}

function Card(props: ICardProps) {
  const { blog } = props
  const { metadata } = blog
  const { permalink, title, readingTime, formattedDate, frontMatter } = metadata
  const { tags = [], image } = frontMatter

  const imgBind = (() => {
    for (const tag of tags) {
      const tagStr = typeof tag === 'string' ? tag : tag.label

      try {
        const icon = require(`@site/static/site/tag-icon/${tagStr}.png`).default
        return {
          alt: tagStr,
          src: icon,
        }
      } catch (err) {
        // console.error(err)
      }
    }

    return {
      alt: 'code',
      src: require('@site/static/site/tag-icon/code.png').default,
    }
  })()

  // https://res.cloudinary.com/daily-now/image/upload/f_auto/v1/placeholders/1
  // https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/61b95af3fa2a7c781ee52899fcaba008?_a=AQAEufR
  const cover = image || 'https://res.cloudinary.com/daily-now/image/upload/f_auto/v1/placeholders/1'

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <img className={styles.cardIcon} {...imgBind} />

        <div className={styles.cardTitle}>
          <Link to={permalink}>{title}</Link>
        </div>

        <div className={styles.cardTip}>
          {formattedDate} • 阅读需 {Math.ceil(readingTime) || 1} 分钟
        </div>
      </div>

      <img className={styles.cardCover} alt='' src={cover} />

      <div className={styles.cardFooter}>
        <i className='fa-regular fa-share-from-square'></i>
      </div>
    </article>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  const globalData = useGlobalData()
  const blogPluginData: any = globalData?.['docusaurus-plugin-content-blog']?.['default']
  const { blogs, tags } = blogPluginData
  log('全局博客的内容：', blogPluginData)

  const [searchValue, setSearchValue] = React.useState('')
  const [selectedTag, setSelectedTag] = React.useState('')

  const tagOptions = React.useMemo(() => {
    return Object.values(tags).map((tag: any) => tag.label)
  }, [tags])

  const renderBlogs = React.useMemo(() => {
    return blogs.filter((blog: any) => {
      const isSearch = fuzzyMatch(blog?.metadata?.title, searchValue)
      const isTag = !selectedTag || (selectedTag && blog?.metadata?.frontMatter?.tags?.includes(selectedTag))
      return isSearch && isTag
    })
  }, [blogs, searchValue, selectedTag])

  return (
    <Layout description={siteConfig.tagline}>
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerFilter}>
            <TextField
              label='标题'
              id='title-input'
              size='small'
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value)
              }}
            />

            <FormControl sx={{ minWidth: 120 }} size='small'>
              <InputLabel id='select-tag-label'>标签</InputLabel>
              <Select
                labelId='select-tag-label'
                label='Tag'
                id='select-tag'
                value={selectedTag}
                onChange={(event) => {
                  setSelectedTag(event.target.value)
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>

                {tagOptions.map((tagStr) => (
                  <MenuItem key={tagStr} value={tagStr}>
                    {tagStr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </header>

        <div className={styles.content}>
          {renderBlogs.map((blog) => (
            <Card blog={blog} key={blog.id} />
          ))}
        </div>
      </main>
    </Layout>
  )
}
