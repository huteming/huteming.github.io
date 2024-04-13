import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import useGlobalData from '@docusaurus/useGlobalData'
import { fuzzyMatch, log } from '../utils'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import IndexCard from '@site/src/components/IndexCard'
import Container from '@mui/material/Container'
import { Divider } from '@mui/material'

import styles from './index.module.scss'

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
    <Layout description={siteConfig.tagline} wrapperClassName={styles.layout}>
      <Container maxWidth='md'>
        <header className={styles.header}>
          <TextField
            label='标题'
            id='title-input'
            size='small'
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value)
            }}
          />

          <FormControl size='small' sx={{ minWidth: 120 }}>
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
        </header>

        {renderBlogs.map((blog) => (
          <IndexCard blog={blog} key={blog.id} />
        ))}

        <Divider sx={{ mt: 5 }}>没有更多了</Divider>
      </Container>
    </Layout>
  )
}
