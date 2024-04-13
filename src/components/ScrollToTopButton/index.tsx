import * as React from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import Fade from '@mui/material/Fade'
import { Theme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

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
          <Fab
            size='small'
            onClick={handleClick}
            sx={(theme) => ({
              backgroundColor: blue[50],
              border: `1px solid ${blue[200]}`,
              boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
              '&:hover': {
                backgroundColor: blue[200],
              },
            })}
          >
            <KeyboardArrowUpRoundedIcon
              sx={(theme: Theme) => ({
                color: blue[800],
              })}
            />
          </Fab>
        </Box>
      </Tooltip>
    </Fade>
  )
}
