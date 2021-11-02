import React, { useEffect, useState } from 'react'
import { H3 } from 'baseui/typography'
import { fetchTopTags } from '../../hooks'

export default function TopTags() {
  const [topTags, setTopTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetchTopTags().then((res) => {
      setTopTags(res)
      setIsLoading(false)
    })
  }, [])

  return (
    <div
      style={{
        border: '#222326 1px solid',
        margin: '10px',
        boxShadow: '8px 8px 0px 0px #222326',
        padding: '20px 30px',
        position: 'relative',
        top: 96,
      }}
    >
      <H3 margin="0px">Top Tags</H3>
      {isLoading && (
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tag, idx) => (
            <p
              key={tag}
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                margin: '8px 0',
              }}
            >
              <span>{idx + 1}</span>
              <span
                style={{
                  display: 'inline-block',
                  background: '#e3e3e3',
                  width: 50 + Math.floor(Math.random() * 100),
                  height: 27,
                  marginLeft: 8,
                }}
              ></span>
            </p>
          ))}
        </div>
      )}
      {topTags.map((tag, idx) => (
        <p key={tag}>
          <span>{idx + 1}</span>
          <a
            style={{
              marginLeft: 8,
              background: '#222326',
              color: 'white',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
            href={`/tag?value=${tag}`}
          >{`#${tag}`}</a>
        </p>
      ))}
    </div>
  )
}
