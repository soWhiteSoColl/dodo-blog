interface IdInfo {
  role: 'user' | 'robot'
  id: string
  parentId: string | null
  chatId: string
  chatIndex: number
}

interface TextContentObject {
  type: 'text',
  text: string
}

interface LinkContentObject {
  type: 'link',
  href: string
  text: string
}

interface ImgContentObject {
  type: 'img',
  src: string
}

interface StatusContentObject {
  type: 'status'
  status: string
}

interface LabelContentObject {
  type: 'label'
  label: string
  text: string
}

interface IdContentObject {
  type: 'id'
  info: IdInfo
  content: ChatContent
}

type ContentObject = TextContentObject 
  | LinkContentObject 
  | ImgContentObject 
  | StatusContentObject 
  | LabelContentObject 
  | IdContentObject

type ChatContent = ContentObject | ContentObject[]

export type ChatItem = IdInfo & { content: ChatContent }

export type UserChatItem = IdInfo & { content: TextContentObject | LabelContentObject | IdContentObject }

export interface ChatTree {
  node: ChatItem
  children: { [key: string]: ChatTree }
}

const lineReg = /(?<id>[UR]((-\d+)+)?(\.\d+)?):? ?(?<content>.*)/
const imgReg = /img\((?<src>.+)\)/
const linkReg = /(?<text>.+)\((?<href>.+)\)/
const statusReg = /\((?<status>.+)\)/
const labelReg = /(?<text>.+)\[(?<label>.+)\]/
const idReg = /\=(?<id>[UR]((-\d+)+)?(\.\d+)?):? ?(?<content>.*)/

const parseId = (originId: string) => {
  const [ chatId, chatIndex = 1 ] = originId.split('.')
  const role = originId.split('-')[0] === 'U' ? 'user' : 'robot'

  const parentId = chatId === 'R' 
    ? null 
    : role === 'user'
      ? chatId.split('-').slice(0, -1).join('-').replace('U', 'R')
      : chatId.replace('R', 'U')
  
  return { id: originId, parentId, role, chatId, chatIndex: Number(chatIndex) }
}

const parseContent = content => {
  const result = content
    .split('&&&')
    .map(item => {
      const imgMatched = item.match(imgReg)

      if(imgMatched) {
        const { src } = imgMatched.groups
        return { type: 'img', src }
      }

      const linkMatched = item.match(linkReg)

      if(linkMatched) {
        const { href, text } = linkMatched.groups
        return { type: 'link', text, href }
      }

      const statusMatched = item.match(statusReg)

      if(statusMatched) {
        const { status } = statusMatched.groups
        return { type: 'status', status }
      }

      const labelMatched = item.match(labelReg)

      if(labelMatched) {
        const { label, text } = labelMatched.groups
        return { type: 'label', label, text }
      }

      const idMathced = item.match(idReg)

      if(idMathced) {
        const { id, content } = idMathced.groups
        const info = parseId(id)
        return { type: 'id', info, content: content ? parseContent(content) : null }
      }

      return { type: 'text', text: item }
    })
  
  return result.length === 1 ? result[0] : result
}

const parseLine = line => {
  const matched = line.match(lineReg)

  if(!matched) return false

  const { id, content: originContent } = matched.groups
  const { parentId, chatId, chatIndex, role } = parseId(id)
  const content = parseContent(originContent)
  

  return { role, id, parentId, chatId, chatIndex, content }
}

const filterEmpty = item => {
  return !!item
}

const appendToTree = (tree, chatNode) => {
  const ids = [chatNode.id]
  
  let currentId = chatNode.id

  while (parseId(currentId).parentId) {
    const { parentId } = parseId(currentId)
    ids.unshift(parentId)
    currentId = parentId
  }
  
  let currentRoot = tree

  ids.forEach((id, index) => {
    if(!currentRoot[id]) {
      currentRoot[id] = { node: null, children: {} }
    }

    if(index === ids.length - 1) {
      currentRoot[id].node = chatNode
    } else {
      currentRoot = currentRoot[id].children
    }
  })
}

export function parseToNodes(str: string): ChatItem[]{
  const nodeArr = str.split('\n')
    .filter(filterEmpty)
    .map(parseLine)
    .filter(filterEmpty)

  return nodeArr as ChatItem[]
}

export function converseToTree(nodes: ChatItem[]): ChatTree{
  const tree: any = {}
  nodes.forEach(node => appendToTree(tree, node))

  return Object.values(tree)[0] as ChatTree
}

export class ChatModel{
  chats:ChatItem[]
  userChats: UserChatItem[]
  robotChats: ChatItem[]

  constructor(chats){
    this.chats = parseToNodes(chats)
    this.userChats = this.chats.filter(chat => chat.role === 'user') as UserChatItem[]
    this.robotChats = this.chats.filter(chat => chat.role === 'robot')
  }
}
