import React from 'react'
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

interface Props {
  image: Nullable<string>
  title: string
  description: string
  tags: Nullable<string[]>
  date: string
  readingTime: number
  link: string
}

// https://res.cloudinary.com/daily-now/image/upload/f_auto/v1/placeholders/1
// https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/61b95af3fa2a7c781ee52899fcaba008?_a=AQAEufR
const defaultImage = 'https://res.cloudinary.com/daily-now/image/upload/f_auto/v1/placeholders/1'

const bull = (
  <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

export default function BlogCard(props: Props) {
  const { image, title, description, tags, date, readingTime, link } = props

  const mediaImage = image ?? defaultImage
  const readingTimeStr = `${Math.ceil(readingTime)} mins`

  return (
    <Card>
      <CardMedia sx={{ height: 160 }} image={mediaImage} title='image' />

      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
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
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>

        <Divider
          sx={{
            mt: 2,
            mb: 2,
          }}
        />

        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' spacing={1}>
            {tags?.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>

          <Typography variant='body2' color='text.secondary'>
            {date} {bull} {readingTimeStr}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
