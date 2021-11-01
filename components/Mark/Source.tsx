import React from 'react'
import { isMedium, isNyTimes, isTwitter } from './helper'
import Image from 'next/image'

export default function Source({ parsedURL }) {
  let src = null
  const hostname = parsedURL.hostname
  if (isTwitter(hostname)) {
    src = '/images/source/twitter.svg'
  } else if (isMedium(hostname)) {
    src = '/images/source/medium.svg'
  } else if (isNyTimes(hostname)) {
    src = '/images/source/nytimes.svg'
  }
  return (
    <a href={parsedURL.href} target="_blank" rel="noreferrer">
      {src ? (
        <Image src={src} alt="twitter" width="20px" height="20px" />
      ) : (
        <span>{hostname}</span>
      )}
    </a>
  )
}
