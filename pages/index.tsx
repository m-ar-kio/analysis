import React from 'react'
import { Block } from 'baseui/block'
import Layout from '../components/Layout'
import Mark from '../components/Mark'
import { useMarkFlow } from '../hooks'
import { Tabs, Tab } from 'baseui/tabs-motion'
import { Skeleton } from 'baseui/skeleton'
import { formatMark } from '../utils/format'
import { Button } from 'baseui/button'
import CoffeeModal from '../components/Mark/CoffeeModal'
import PacmanLoader from 'react-spinners/PacmanLoader'
import TopTags from '../components/TopTags'
import { H1 } from 'baseui/typography'

function Index() {
  const [page, setPage] = React.useState(1)
  const [coffeeMark, setCoffeeMark] = React.useState(null)
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
          <H1>Latest</H1>
          {isLoading && (
            <div>
              <div style={placeholderStyle} />
              <div style={placeholderStyle} />
              <div style={placeholderStyle} />
              <div style={placeholderStyle} />
            </div>
          )}
          {marks.map((m) => {
            return (
              <Mark
                key={m.id}
                mark={formatMark(m)}
                setCoffeeMark={setCoffeeMark}
              />
            )
          })}
          {!!marks.length && (
            <Button
              isLoading={isLoading}
              onClick={() => !isLoading && setPage(page + 1)}
            >
              LOAD MORE
            </Button>
          )}
        </div>
        <TopTags />
      </div>
      {!!coffeeMark && (
        <CoffeeModal mark={coffeeMark} onClose={() => setCoffeeMark(null)} />
      )}
    </Layout>
  )
}

export default Index
