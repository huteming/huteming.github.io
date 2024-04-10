/**
 * https://github.com/Dhaiwat10/react-link-preview
 */
import React, { useEffect, useRef, useState } from 'react'

import './index.scss'
import Skeleton from './Skeleton'

export interface APIResponse {
  og?: {
    image?: string
    title?: string
    description?: string
    url?: string
    site_name?: string
  }

  image?: string
  title?: string
  description?: string
}

export interface LinkPreviewProps {
  url: string
  width?: string | number
  height?: string | number
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, width, height }) => {
  const _isMounted = useRef(true)
  const [metadata, setMetadata] = useState<APIResponse | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    _isMounted.current = true
    setLoading(true)

    fetch(`https://preview.huteming.fun/api?link=${url}`)
      .then((res) => res.json())
      .then((res) => {
        if (_isMounted.current) {
          setMetadata(res.data)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        console.error(err)
        console.error('No metadata could be found for the given URL.')
        if (_isMounted.current) {
          setMetadata(null)
          setLoading(false)
        }
      })

    return () => {
      _isMounted.current = false
    }
  }, [url])

  if (loading) {
    return <Skeleton width={width} />
  }

  if (!metadata || !metadata.og) {
    return null
  }

  const { image, description, title, site_name } = metadata.og

  const onClick = () => {
    window.open(url, '_blank')
  }

  return (
    <div onClick={onClick} className='Container' style={{ width, height }}>
      {image && (
        <div
          className='image'
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      )}

      <div className='LowerContainer'>
        <h3 className='Title'>{title}</h3>

        {description && (
          <span data-testid='desc' className='Description Secondary'>
            {description}
          </span>
        )}

        <div className='Secondary SiteDetails'>{site_name}</div>
      </div>
    </div>
  )
}

export default LinkPreview
