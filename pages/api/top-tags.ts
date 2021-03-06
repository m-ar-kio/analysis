import cors from '../../utils/cors'
import { parseTags } from '../../utils/format'
import { fetchMarks } from '../../utils/query'

export default async function handler(req, res) {
  await cors(req, res)
  return fetchMarks()
    .then((data) => {
      res.status(200).json(parseTags(data))
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
