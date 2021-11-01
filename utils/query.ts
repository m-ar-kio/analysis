import { request, gql } from 'graphql-request'

export const fetchMakrs = async () => {
  const query = gql`
    query {
      transactions(
        first: 1000
        recipients: ["FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234"]
        tags: { name: "App-Name", values: ["permamark"] }
      ) {
        edges {
          node {
            tags {
              name
              value
            }
          }
        }
      }
    }
  `

  try {
    const result = await request('https://arweave.net/graphql', query)
    return result.transactions.edges.map((t) => t.node.tags)
  } catch (error) {
    return []
  }
}
