export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatUrl(url?: string) {
  url = url || location.href

  const [path, search] = url.split('?')
  const query: { [key: string]: string } = search
    .split('&')
    .reduce((query, queryItem) => {
      const [key, value] = queryItem.split('=')
      query[key] = value
      return query
    }, {})

  return { path, query, search }
}
