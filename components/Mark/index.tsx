import * as React from 'react'
import urlParse from 'url-parse'
import SimpleMarkdown from 'simple-markdown'
import { initTwitterRules } from './rules/twitter'
import { isMirror, isTwitter } from './helper'
import Tweet from './Tweet'
import Article from './Article'
import { Block } from 'baseui/block'
import { ThumbsUp } from 'react-feather'
import { Button } from 'baseui/button'
import { likeMark } from '../../utils/wallet'
import { fetchLikeByTxId } from '../../hooks'

interface Props {
  mark: any
  isInModal?: boolean
  isPublic?: boolean
}

export default function Mark({ mark, isInModal, isPublic }: Props) {
  const rules = {
    ...SimpleMarkdown.defaultRules,
    ...initTwitterRules(mark),
  }
  const rawBuiltParser = SimpleMarkdown.parserFor(rules)
  const parse = function (source) {
    const blockSource = source + '\n\n'
    return rawBuiltParser(blockSource, { inline: false })
  }
  const reactOutput = SimpleMarkdown.outputFor(rules, 'react')

  const tree = parse(mark.content)
  const parsedURL = urlParse(mark.origin, true)

  const _isTwitter = isTwitter(parsedURL.hostname)
  const _isMirror = isMirror(parsedURL.hostname)
  let content = null
  const [likes, setLikes] = React.useState([])
  const [address, setAddress] = React.useState('')

  React.useEffect(() => {
    const address = sessionStorage.getItem('address')
    setAddress(address)
    if (mark) {
      fetchLikeByTxId(mark.txId)
        .then((_liked) => {
          setLikes(_liked)
        })
        .catch(() => {})
    }
  }, [mark])

  if (_isTwitter || _isMirror) {
    content = (
      <Tweet
        tree={tree}
        reactOutput={reactOutput}
        mark={mark}
        parsedURL={parsedURL}
        isInModal={isInModal}
      />
    )
  } else {
    content = (
      <Article
        tree={tree}
        reactOutput={reactOutput}
        mark={mark}
        parsedURL={parsedURL}
        isInModal={isInModal}
      />
    )
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent)

  const isVoted = likes.some((like) => like.owner.address === address)

  return (
    <Block
      width={isMobile ? 'calc(100% - 30px)' : '800px'}
      margin={isMobile ? '0px 10px' : '0px'}
      overrides={{
        Block: {
          style: {
            padding: '20px',
            border: '#222326 1px solid',
            margin: '10px',
            boxShadow: '8px 8px 0px 0px #222326',
            cursor: 'pointer',
            position: 'relative',
          },
        },
      }}
    >
      {content}
      {isPublic && (
        <Button
          kind={isVoted ? 'primary' : 'secondary'}
          overrides={{
            BaseButton: {
              style: {
                position: 'absolute',
                right: 0,
                top: 0,
              },
            },
          }}
          onClick={() => !isVoted && likeMark(mark.txId)}
        >
          <ThumbsUp />
          <span style={{ marginLeft: 4, fontSize: 20 }}>{likes.length}</span>
        </Button>
      )}
    </Block>
  )
}
