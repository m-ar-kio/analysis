import * as React from 'react'
import { FileUploader } from 'baseui/file-uploader'
import { Block } from 'baseui/block'
import { H1 } from 'baseui/typography'
import { Button } from 'baseui/button'
import { toaster } from 'baseui/toast'
import { TOAST_DURATION } from '../../utils/constants'
import { connectAR, loadKeyfile } from '../../utils/wallet'

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState('')
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
        <FileUploader
          accept=".json"
          errorMessage={errorMessage}
          onDrop={loadKeyfile}
        />

        {/* <H1>OR</H1>

        <Button
          size="large"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                padding: '15px 75px',
              }),
            },
          }}
          onClick={connectAR}
        >
          Connect AR
        </Button> */}
      </Block>
    </Block>
  )
}
