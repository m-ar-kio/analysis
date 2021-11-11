import _ from 'lodash'

export const ellipsis = (
  str: string,
  lead: number = 3,
  tail: number = 3
): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length
    )}`
  }
  return str
}

export const formatMark = (mark) => {
  const tag = mark.tags.find((t) => t.name === 'Unix-Time')
  const _tags = mark.tags
    .filter(
      (t) =>
        !['App-Name', 'App-Version', 'Unix-Time', 'origin'].includes(t.name)
    )
    .map((t) => t.name)
  return {
    content: mark.bm.content,
    origin: mark.bm.origin,
    txId: mark.id,
    timestamp: Number(tag.value),
    owner: mark.owner.address,
    tags: _.uniq(_tags),
  }
}

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

export function parseVotes(tagsArray) {
  const dict = {}
  tagsArray.forEach((tags) => {
    if (tags.length > 3) {
      const tag = tags.find((tag) => tag.name === 'markHash')
      if (tag) {
        if (dict[tag.value]) {
          dict[tag.value] += 1
        } else {
          dict[tag.value] = 1
        }
      }
    }
  })

  const keys = Object.keys(dict)
  const sorted = keys.sort((a, b) => dict[b] - dict[a]).slice(0, 10)
  return sorted
}
