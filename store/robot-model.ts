import { mockChats, mockSelects } from '../mock/chat'
import { sleep } from '../utils/common'

const getInitialChat = async () => {
  await sleep(1000)
  return mockChats[0]
}

const mapIdsToSelects = ids => {
  return ids.map(id => {
    const foundSelect = mockSelects.find(item => item.id === id)
    return { label: foundSelect.content, value: foundSelect.id }
  })
}

export default {
  state: {
    status: 'inputing',
    chats: [],
    selects: [],
  },

  reducers: {
    setNewChat(state, chat) {
      return { ...state, chats: [...state.chats, chat]}
    },

    setStatus(state, status) {
      return { ...state, status}
    },

    setSelects(state, selects) {
      return { ...state, selects}
    },

    setSelectsWithIds(state, ids) {
      return { ...state, selects: mapIdsToSelects(ids)}
    },

    setState(state, update) {
      return { ...state, ...update }
    },

    clearChats(state) {
      return {...state, chats: []}
    }
  },

  effects: () => ({
    async initChat() {
      this.setState({ chats: [] })
      this.setStatus('inputing')
      const chatInfo = await getInitialChat()
      this.setNewChat({ ...chatInfo, role: 'robot' })
      this.setStatus('waiting')
    },

    async userReply(chatInfo){
      this.setNewChat({ ...chatInfo, role: 'user' })
    },

    async robotReply(id) {
      const select = mockSelects.find(item => item.id === id)
      this.setStatus('inputing')

      await sleep(1000)

      if(select.type === 'link') {
        this.setNewChat({ type: 'link', content: '好的', id: Date.now(), role: 'robot', link: select.link })
      }

      if(select.type === 'plain') {
        const chatInfo = mockChats.find(item => item.id === select.reply)
        this.setNewChat({ ...chatInfo, role: 'robot' })
      }

      this.setStatus('waiting')
    },

    async robotContinueReply(id) {
      this.setStatus('inputing')
      await sleep(1000)
      const chatInfo = mockChats.find(item => item.id === id)
      this.setNewChat({ ...chatInfo, role: 'robot' })
      this.setStatus('waiting')
    }
  }),
}
