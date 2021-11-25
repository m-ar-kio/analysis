import * as React from 'react'
import { Block } from 'baseui/block'
import { EXTENSION_DOWNLOAD_URL } from '../../utils/constants'

export default function Login() {
  return (
    <Block
      width="100vw"
      padding="30px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Block
        width="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <p style={{ fontSize: 28 }}>
          Please{' '}
          <a
            href={EXTENSION_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            download
          </a>{' '}
          extension here
        </p>
      </Block>
    </Block>
  )
}
