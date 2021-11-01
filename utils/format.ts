export function parseTags(tagsArray) {
  const dict = {}
  tagsArray.forEach((tags) => {
    if (tags.length > 3) {
      tags.forEach((tag) => {
        if (
          !['App-Name', 'App-Version', 'Unix-Time', 'origin'].includes(tag.name)
        ) {
          if (dict[tag.name]) {
            dict[tag.name] += 1
          } else {
            dict[tag.name] = 1
          }
        }
      })
    }
  })

  const keys = Object.keys(dict)
  const sorted = keys.sort((a, b) => dict[b] - dict[a]).slice(0, 10)
  return sorted
}
