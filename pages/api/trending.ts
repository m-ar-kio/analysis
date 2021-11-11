import cors from '../../utils/cors'
import { parseVotes } from '../../utils/format'
import { fetchVotes } from '../../utils/query'

export default async function handler(req, res) {
  await cors(req, res)
  return fetchVotes()
    .then((data) => {
      res.status(200).json(parseVotes(data))
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
