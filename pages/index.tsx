import React from 'react'
import Layout from '../components/Layout'
import { useMarkFlow, useTrendingMarkFlow } from '../hooks'
import { Tabs, Tab } from 'baseui/tabs-motion'
import TopTags from '../components/TopTags'
import List from '../components/Mark/List'

function Index() {
  const [page, setPage] = React.useState(1)
  const [activeKey, setActiveKey] = React.useState('0')
  const { isLoading, marks } = useMarkFlow(page)
  const { isLoading: isLoadingTrending, marks: trendingMarks } =
    useTrendingMarkFlow()

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
              <List
                page={page}
                setPage={setPage}
                isLoading={isLoading}
                marks={marks}
              />
            </Tab>
            <Tab title="Trending">
              <List isLoading={isLoadingTrending} marks={trendingMarks} />
            </Tab>
          </Tabs>
        </div>
        <TopTags />
      </div>
    </Layout>
  )
}

export default Index
