import { Button } from 'baseui/button'
import { formatMark } from '../../utils/format'
import Mark from './index'

interface Props {
  isLoading: boolean
  marks: any[]
  setPage?: (page: number) => void
  page?: number
}

export default function List({ isLoading, marks, page, setPage }: Props) {
  const placeholderStyle = {
    marginTop: 20,
    width: 800,
    height: 250,
    background: '#e3e3e3',
  }

  return (
    <div>
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
      {!!marks.length && setPage && (
        <Button
          isLoading={isLoading}
          onClick={() => !isLoading && setPage(page + 1)}
        >
          LOAD MORE
        </Button>
      )}
    </div>
  )
}
