function formatTimeNumber(number) {
  return (number + 100).toString().substr(1, 2)
}

function getDay(date, split) {
  split = split || '/'
  date = new Date(date)
  return date.getFullYear() + split + formatTimeNumber((date.getMonth() + 1)) + split + formatTimeNumber(date.getDate())
}

function getHour(date) {
  date = new Date(date)
  return date.getHours() + ' : ' + formatTimeNumber(date.getMinutes())
}

export function dateFormater(originDate, isShowHour, opt = {}) {
  const daySplit = opt.daySplit || '/'
  const hourSplit = opt.hourSplit || ':'
  let formatDate = getDay(originDate, daySplit)

  if (isShowHour) {
    const formatHour = getHour(originDate, hourSplit)
    formatDate = formatDate + ' - ' + formatHour
  }

  return formatDate
}

export function getLocationQuery(location) {
  if (!location.search) {
    return {}
  }
  return location.search.split('?')[1].split('&').reduce((pre, queryItem) => {
    pre[queryItem.split('=')[0]] = queryItem.split('=')[1]
    return pre
  }, {})
}

export const pageScrollTo = (height) => {
  const currentTop = window.pageYOffset
  let goalTop
  if (typeof height === 'number') {
    goalTop = height
  } else {
    goalTop = getOffsetPos(height).top
  }

  const interval = 600
  const frameRate = 60
  const frameInterval = 1000 / frameRate
  const totalFrame = interval / frameInterval
  const animateFn = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b

  let currentFrame = 0
  const scroll = () => {
    currentFrame++
    if (currentFrame > totalFrame) {
      return false
    }
    const y = animateFn(currentFrame, currentTop, goalTop - currentTop, totalFrame)
    window.scrollTo(0, y)
    setTimeout(() => {
      scroll()
    }, frameInterval)
  }
  scroll()
}
