import React, { useEffect, useState } from 'react'
import { Block } from 'baseui/block'
import Layout from '../components/Layout'
import Mark from '../components/Mark'
import { fetchTxByMarker, fetchTxByTag } from '../hooks'
import { H1 } from 'baseui/typography'
import { ellipsis, formatMark } from '../utils/format'
import { Button } from 'baseui/button'
import PacmanLoader from 'react-spinners/PacmanLoader'

function MarkerPage() {
  const [page, setPage] = React.useState(1)
  const [marks, setMarks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [marker, setMarker] = useState('')

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (params.value) {
      setIsLoading(true)
      setMarker(params.value)
      fetchTxByMarker(page, params.value).then((_marks) => {
        setIsLoading(false)
        setMarks(_marks)
      })
    }
  }, [page])

  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>
          Marked by
          <span
            style={{
              background: '#222326',
              color: 'white',
              padding: '0 10px',
              margin: '0 10px',
            }}
          >{`${ellipsis(marker, 8, 8)}`}</span>
        </H1>
        {isLoading && (
          <div style={{ width: 300, height: 300, marginTop: 100 }}>
            <PacmanLoader color="#000" loading={isLoading} size={50} />
          </div>
        )}
        {marks.map((m) => {
          return <Mark key={m.id} mark={formatMark(m)} isPublic />
        })}
        {!!marks.length && (
          <Button onClick={() => setPage(page + 1)}>LOAD MORE</Button>
        )}
      </Block>
    </Layout>
  )
}

export default MarkerPage
