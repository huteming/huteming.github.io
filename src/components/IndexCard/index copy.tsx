import type { BlogPost } from '@docusaurus/plugin-content-blog'
import styles from './index.module.scss'
import Link from '@docusaurus/Link'

interface ICardProps {
  blog: BlogPost
}

export default function IndexCard(props: ICardProps): JSX.Element {
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
