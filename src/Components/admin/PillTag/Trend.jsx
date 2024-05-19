import React from 'react'
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiAlertCircleOutline,
  mdiInformationOutline,
  mdiCheckCircleOutline,
  mdiAlertOutline,
} from '@mdi/js'
import PillTag from '.'

const PillTagTrend = ({ small = false, ...props }) => {
  const trendIcon = {
    up: mdiChevronUp,
    down: mdiChevronDown,
    success: mdiCheckCircleOutline,
    danger: mdiAlertOutline,
    warning: mdiAlertCircleOutline,
    info: mdiInformationOutline,
  }[props.type]

  return <PillTag label={props.label} color={props.color} icon={trendIcon} small={small} />
}

export default PillTagTrend
