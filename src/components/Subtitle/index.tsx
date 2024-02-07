import React from 'react'
import { Stack } from '@mui/material'
import Link from '@mui/material/Link'
import DocusaurusLink from '@docusaurus/Link'

interface IProps {
  text: string
  link?: string
}

export default function Subtitle(props: IProps) {
  return (
    // <p>
    //   <strong>
    //     <a href={props.href} target='_blank' rel='noopener noreferrer'>
    //       {/* 图标网站: https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free */}
    //       <i className='fas fa-bullhorn'></i>
    //       <span className='ml-10'>{props.children}</span>
    //     </a>
    //   </strong>
    // </p>

    <p>
      <Stack
        component={DocusaurusLink}
        to={props.link}
        direction='row'
        alignItems='center'
        spacing={2}
        sx={{
          display: 'inline-flex',
          fontWeight: 'bold',
        }}
      >
        {/* 图标库: https://fontawesome.com/search */}
        <i className='fas fa-bullhorn'></i>
        <span>{props.text}</span>
      </Stack>
    </p>
  )
}
