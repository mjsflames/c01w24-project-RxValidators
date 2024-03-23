import React from 'react'

const ContentContainer = (props) => {
  return (
    <div className={`mx-10 mt-12 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default ContentContainer