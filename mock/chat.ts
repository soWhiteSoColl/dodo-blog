// chat data type

interface BaseChatData {
  id: number
  type: string
  content: string
}

interface SelectChatData extends BaseChatData {
  type: 'selects'
  selects: number[]
}

interface NextChatData extends BaseChatData {
  type: 'next'
  next: number
}

interface ReplyChatData extends BaseChatData {
  type: 'reply'
  reply: number
}

interface EndChatData extends BaseChatData {
  type: 'end'
}

// select data type

interface BaseSelectData {
  id: number
  type: string
  content: string
}

interface PlainSelectData extends BaseSelectData {
  type: 'plain'
  reply: number
}

interface LinkSelectData extends BaseSelectData {
  type: 'link'
  link: string
}

export type SelectData = LinkSelectData | PlainSelectData

export type ChatData = SelectChatData | NextChatData | ReplyChatData | EndChatData

export const mockSelects: SelectData[] = [
  {
    id: 2,
    type: 'link',
    content: '我想看博客',
    link: '/', 
  },
  {
    id: 3,
    type: 'link',
    content: '帮我给你的主人捎点话',
    link: '/contact',
  },
  {
    id: 4,
    type: 'plain',
    content: '我想了解点小寒的小秘密',
    reply: 5,
  },
  {
    id: 6,
    type: 'plain',
    content: '小寒是个什么样的人呀',
    reply: 8
  },
  {
    id: 7,
    type: 'plain',
    content: '小寒的微信号多少呀',
    reply: 10,
  },
]

export const mockChats: ChatData[] = [
  {
    id: 1,
    type: 'selects',
    content: 'Hello, 我是机器人小寒，需要我帮你什么呢？',
    selects: [ 2, 3, 4]
  },
  {
    id: 5,
    type: 'selects',
    content: '你想要了解什么秘密呀',
    selects: [6, 7]
  },
  {
    id: 6,
    type: 'reply',
    content: '小寒是个什么样子的人',
    reply: 8,
  },
  {
    id: 7,
    type: 'reply',
    content: '小寒的微信号多少呀',
    reply: 10,
  },
  {
    id: 8,
    type: 'next',
    content: '小寒呢，是一个还没有秃头的程序员',
    next: 9,
  },
  {
    id: 9,
    type: 'end',
    content: '他喜欢吃把米饭炒的一粒一粒都很分明的蛋炒饭，也喜欢看书，打游戏呢',
  },
  {
    id: 10,
    type: 'end',
    content: '微信号是13679207787，欢迎来撩呀',
  }
]
