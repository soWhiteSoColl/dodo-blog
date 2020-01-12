const titleRegs = [
  { type: 'h1', reg: /^# .*$/ },
  { type: 'h2', reg: /^## .*$/ },
  { type: 'h3', reg: /^### .*$/ },
  { type: 'h4', reg: /^#### .*$/ },
]

const hrefReg = /\[(?<text>.*?)\](?<isNewTarget>[-+])\((?<href>.*?)\)/g

export function getLetters(content: string) {
  return (
    content
      .split('\n')
      .filter(line => line !== '')
      .map(line => {
        for (let i = 0; i < titleRegs.length; i++) {
          if (titleRegs[i].reg.test(line)) {
            return {
              type: titleRegs[i].type,
              content: line.replace(/#+ /, '').trim(),
            }
          }
        }

        return { type: 'p', content: line }
      })
      .map(line => {
        let { content, type } = line
        const hrefInfoArr: {
          start: number
          end: number
          href: string
          text: string
          targetSign: string
        }[] = []
        let blockIndex = 0

        content = content.replace(
          hrefReg,
          (matched, text, targetSign, href, searchIndex) => {
            hrefInfoArr.push({
              start: searchIndex - blockIndex,
              end: searchIndex + text.length - 1 - blockIndex,
              href,
              text,
              targetSign,
            })

            blockIndex += matched.length - text.length
            return text
          }
        )

        return content.split('').map((item, index) => {
          let isHrefStart = false
          let isHrefEnd = false
          let hrefValue: string = ''
          let isNewTarget = false

          hrefInfoArr.forEach(({ start, end, href, targetSign }) => {
            if (index === start) isHrefStart = true
            if (index === end) isHrefEnd = true
            if (index >= start && index <= end) {
              hrefValue = href
              isNewTarget = targetSign === '+'
            }
          })

          return {
            href: hrefValue,
            isHrefStart,
            isHrefEnd,
            isNewTarget,
            type,
            isStart: index === 0,
            content: item,
            isEnd: index === content.length - 1,
          }
        })
      })
      //@ts-ignore
      .flat()
  )
}
