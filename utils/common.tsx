import axios from '../configs/axios'

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

export function getDOMById(id) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    document.body.appendChild(el)
  }
  return el
}

export function track(
  eventId: string,
  eventType?: string,
  eventParam?: object
) {
  const info = {
    url: location.href,
    title: document.title,
    ...eventParam,
  }

  return axios.post('/tracks', { key: eventId, type: eventType, info })
}
