import { parseTags } from '../../utils/format'
import { fetchMakrs } from '../../utils/query'

export default function handler(req, res) {
  return fetchMakrs()
    .then((data) => {
      res.status(200).json(parseTags(data))
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
