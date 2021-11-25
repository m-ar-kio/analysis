/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import React, { useEffect, useState } from 'react'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation'
import Head from 'next/head'
import { StyledLink } from 'baseui/link'
import { Button } from 'baseui/button'
import { ToasterContainer } from 'baseui/toast'
import { Block } from 'baseui/block'
import Image from 'next/image'
import Link from 'next/link'
import 'arconnect'
import { ellipsis } from '../../utils/format'
import { Paragraph3 } from 'baseui/typography'
import { connectAR } from '../../utils/wallet'
import { Chrome } from 'react-feather'
import { useAddress } from '../../hooks'
import { EXTENSION_DOWNLOAD_URL } from '../../utils/constants'

export default function Layout({
  title,
  children,
}: {
  title: string
  children?: any
}) {
  const address = useAddress()
  const [engine, setEngine] = useState(null)

  useEffect(() => {
    import('styletron-engine-atomic').then((styletron) => {
      const _engine =
        typeof window !== 'undefined'
          ? new styletron.Client()
          : new styletron.Server()
      setEngine(_engine)
    })
  }, [])

  if (!engine) return null
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent)

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Head>
          <title>{title}</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Work+Sans"
          />
        </Head>
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>
              <StyledLink href="/">
                <Image
                  src="/images/logo.svg"
                  alt="LOGO"
                  width="50px"
                  height="50px"
                />
              </StyledLink>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center} />
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <StyledLink href="/">Home</StyledLink>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <StyledLink href="/inbox">Inbox</StyledLink>
            </StyledNavigationItem>
            {!isMobile && (
              <StyledNavigationItem>
                <StyledLink
                  style={{
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    flexFlow: 'row nowrap',
                  }}
                  href={EXTENSION_DOWNLOAD_URL}
                >
                  Download
                </StyledLink>
              </StyledNavigationItem>
            )}
            <StyledNavigationItem>
              {address && <Button>{ellipsis(address, 8, 8)}</Button>}
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.right} />
        </HeaderNavigation>
        <ToasterContainer />
        <main>{children}</main>
        <div
          style={{
            display: 'flex',
            flexFlow: isMobile ? 'column nowrap' : 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#333',
            padding: 30,
            marginTop: 30,
          }}
        >
          <Block
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              src="/images/logo.svg"
              alt="LOGO"
              width="50px"
              height="50px"
            />
            <a
              href="https://twitter.com/markarweave"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: 10, color: 'white' }}
            >
              Twitter
            </a>
            <a
              href="https://github.com/m-ar-kio"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: 10, color: 'white' }}
            >
              Github
            </a>
            <Link href="/about" passHref>
              <span style={{ marginLeft: 10, color: 'white' }}>About</span>
            </Link>
          </Block>
          <Block>
            <Paragraph3 color="white" $style={{ margin: '2px' }}>
              © 2021 • all rights reserved.
            </Paragraph3>
            <Paragraph3 color="white" $style={{ margin: '2px' }}>
              donate:
              <a
                href="https://viewblock.io/arweave/address/WBnjVFK2haoNYtmepHBxejjYvl7yiYoWcndPOo-DoIg"
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: 10,
                  color: 'white',
                  borderBottom: '1px solid white',
                  wordBreak: 'break-all',
                }}
              >
                WBnjVFK2haoNYtmepHBxejjYvl7yiYoWcndPOo-DoIg
              </a>
            </Paragraph3>
          </Block>
        </div>
      </BaseProvider>
    </StyletronProvider>
  )
}
