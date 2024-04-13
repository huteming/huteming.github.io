import * as React from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import Fade from '@mui/material/Fade'

export default function BackToTop() {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  })

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth'

    window.scrollTo({ top: 0, behavior })
    setOpen(false)
  }

  return (
    <Fade in={trigger}>
      <Tooltip title='回到顶部' placement='top' open={open} onClose={handleClose} onOpen={handleOpen}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 10,
          }}
        >
          <Fab color='primary' size='small' onClick={handleClick}>
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Box>
      </Tooltip>
    </Fade>
  )
}
