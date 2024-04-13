import React from 'react'
import type { BlogPost } from '@docusaurus/plugin-content-blog'
import styles from './index.module.scss'
import Link from '@docusaurus/Link'
import BlogCard from '@site/src/components/BlogCard-v2'

interface ICardProps {
  blog: BlogPost
}

export default function IndexCard(props: ICardProps): JSX.Element {
  const { blog } = props
  const { metadata } = blog
  const { permalink, title, description, readingTime, date, frontMatter } = metadata
  const { tags = [], image } = frontMatter

  const tagStrArr = React.useMemo(() => {
    return tags?.map((tag) => {
      return typeof tag === 'string' ? tag : tag.label
    })
  }, [tags])

  return <BlogCard image={image} title={title} description={description} tags={tagStrArr} date={date} readingTime={readingTime} link={permalink} />
}
