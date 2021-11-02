import React from 'react'
import Layout from '../components/Layout'
import Mark from '../components/Mark'
import { useMarkFlow } from '../hooks'
import { Tabs, Tab } from 'baseui/tabs-motion'
import { formatMark } from '../utils/format'
import { Button } from 'baseui/button'
import TopTags from '../components/TopTags'

function Index() {
  const [page, setPage] = React.useState(1)
  const [activeKey, setActiveKey] = React.useState('0')
  const { isLoading, marks } = useMarkFlow(page)

  const placeholderStyle = {
    marginTop: 20,
    width: 800,
    height: 250,
    background: '#e3e3e3',
  }
  return (
    <Layout title="m-ar-k">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pointerEvents: 'unset',
        }}
      >
        <div style={{ width: 820 }}>
          <Tabs
            onChange={({ activeKey }) => {
              setActiveKey(activeKey as string)
            }}
            activeKey={activeKey}
          >
            <Tab title="Last">
              {isLoading && (
                <div>
                  <div style={placeholderStyle} />
                  <div style={placeholderStyle} />
                  <div style={placeholderStyle} />
                  <div style={placeholderStyle} />
                </div>
              )}
              {marks.map((m) => {
                return <Mark key={m.id} mark={formatMark(m)} isPublic />
              })}
              {!!marks.length && (
                <Button
                  isLoading={isLoading}
                  onClick={() => !isLoading && setPage(page + 1)}
                >
                  LOAD MORE
                </Button>
              )}
            </Tab>
            <Tab title="Trending">Coming soon</Tab>
          </Tabs>
        </div>
        <TopTags />
      </div>
    </Layout>
  )
}

export default Index
