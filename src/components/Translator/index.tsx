import { Tooltip } from '@mui/material'
import styles from './index.module.scss'

export default function Translator(props) {
  return (
    <Tooltip
      title='Delete'
      placement='top'
      arrow
    >
      <span className={styles.underline}>{props.children}</span>
    </Tooltip>
  )
}
