export function dateFilter(date, isShowHour) {
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