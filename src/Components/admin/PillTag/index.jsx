import React from 'react'
import PillTagPlain from './Plain'
import { colorsBgLight, colorsOutline } from '../colors'

const PillTag = ({ small = false, outline = false, className = '', ...props }) => {
  const layoutClassName = small ? 'py-1 px-3' : 'py-1.5 px-4'
  const colorClassName = outline ? colorsOutline[props.color] : colorsBgLight[props.color]

  return (
    <PillTagPlain
      className={`border rounded-full ${layoutClassName} ${colorClassName} ${className}`}
      icon={props.icon}
      label={props.label}
      small={small}
    />
  )
}

export default PillTag
