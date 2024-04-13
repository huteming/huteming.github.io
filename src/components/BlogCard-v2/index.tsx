import React from 'react'
import dayjs from 'dayjs'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { Nullable } from '@site/src/utils'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import DocusaurusLink from '@docusaurus/Link'

import styles from './index.module.scss'

interface Props {
  image: Nullable<string>
  title: string
  description: string
  tags: Nullable<string[]>
  date: Date
  readingTime: number
  link: string
}

const defaultImage = 'https://img.colorhub.me/PFEoyUMMvRY/rs:auto:0:500:0/g:ce/fn:colorhub/bG9jYWw6Ly8vMTIvMGUvZTNjOWY3ZTY2Zjg3MmMyMThlYTVlMWUyYTA5NTU4MTQxMGEwMTIwZS5qcGVn.webp'

const bull = (
  <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

/**
 * 样式参考自: https://www.bootstrapmb.com/item/10131/preview
 */
export default function BlogCard(props: Props) {
  const { image, title, description, tags, date, readingTime, link } = props

  const formattedDate = dayjs(date).format('YYYY.MM.DD')
  const mediaImage = image ?? defaultImage
  const readingTimeStr = `${Math.ceil(readingTime)} mins`

  return (
    <div className={styles.card}>
      <img className={styles.image} src={mediaImage} alt='cover' />

      <div className={styles.content}>
        {/* title */}
        <div className={styles.title}>
          <Link
            component={DocusaurusLink}
            to={link}
            underline='hover'
            sx={{
              color: 'inherit',
              ':hover': {
                color: 'inherit',
              },
            }}
          >
            {title}
          </Link>
        </div>

        {/* desc */}
        <div className={styles.desc}>{description}</div>

        {/* external */}
        <div className={styles.footer}>
          <Stack direction='row' spacing={1}>
            {tags?.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>

          <div className={styles.info}>
            {/* {formattedDate} {bull} {readingTimeStr} */}
            {readingTimeStr} {bull} {formattedDate}
          </div>
        </div>
      </div>
    </div>
  )
}
