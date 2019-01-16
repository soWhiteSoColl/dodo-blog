export function formatTimeNumber(number) {
  return (number + 100).toString().substr(1, 2)
}

export function getDay(date, split) {
  split = split || '/'
  date = new Date(date)
  return date.getFullYear() + split + formatTimeNumber((date.getMonth() + 1)) + split + formatTimeNumber(date.getDate())
}

export function getHour(date) {
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

export function formatLyric(lyric) {
  if (!lyric) return false
  const lyricRows = lyric.split('\n')
  const lyrics = []
  lyricRows.forEach(row => {
    const matched = row.match(/\[(.*)\](.*)/) || {}
    let time = matched[1]
    const lyric = matched[2]
    if (time && !lyric) {
      lyrics.author = time
    }
    if (time && lyric) {
      const [m, s] = time.split(':')
      time = Number(m) * 60 + Number(s)
      lyrics.push({ time, lyric })
    }
  })

  return lyrics
}

export function secondToMunite(time) {
  if (!time) return '00:00'
  const seconds = parseInt(time)
  return formatTimeNumber(parseInt(seconds / 60)) + ':' + formatTimeNumber(seconds % 60)
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

export function pageScrollTo(height, offset) {
  const currentTop = window.pageYOffset
  let goalTop

  if (typeof height === 'number') {
    goalTop = height
  } else {
    goalTop = height.getBoundingClientRect().top
  }

  if (offset) {
    goalTop = goalTop + offset
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

export function loadSound(url) {
  return new Promise(resolve => {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // 一旦获取完成，对音频进行进一步操作，比如解码
    request.onload = function () {
      var arraybuffer = request.response;
      resolve(arraybuffer)
    }
    request.send();
  })
}

export function rn(s, e) {
  var start = s ? s : 0;
  var end = e ? e : 255;
  var i = end - start;
  var color = parseInt(start + Math.random() * i);
  return color;
}


export function rc(opacity) {
  var op = opacity ? opacity : 1;
  return 'rgba(' + rn() + ',' + rn() + ',' + rn() + ',' + op + ')'
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

export function downloadFile(src) {
  const downloader = document.createElement('a')
  downloader.setAttribute('href', src)
  downloader.setAttribute('target', '_blank')
  document.body.appendChild(downloader)
  downloader.click()
  document.body.removeChild(downloader)
}
