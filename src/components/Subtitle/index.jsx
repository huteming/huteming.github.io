import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

// 渲染结构同 markdown 的这种结构
// **[children](link)**
export default function Subtitle(props) {
  return (
    <p>
      <strong>
        <a href={props.href} target='_blank' rel='noopener noreferrer'>
          {/* 图标网站: https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free */}
          <i className='fas fa-bullhorn'></i>
          <span className='ml-10'>{props.children}</span>
        </a>
      </strong>
    </p>
  )
}
