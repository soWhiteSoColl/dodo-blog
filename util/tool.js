export function dateFormater(date, isShowHour) {
    date = new Date(date)
    let formatDate = date.getFullYear() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getDate()
    if (isShowHour) {
        formatDate = formatDate + ' -- ' + date.getHours() + ' : ' + date.getMinutes()
    }
    return formatDate
}

export function getLocationQuery(location) {
    console.log(location.search)
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