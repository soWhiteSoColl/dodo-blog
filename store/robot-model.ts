import axios from 'axios'
import { sleep } from '../utils/common'
import { ChatModel } from '../utils/chats-parser'

let chatModel: ChatModel

const model = {
  state: {
    chats: [],
    status: 'inputing',
    selects: [],
  },

  reducers: {
    pushChat(state, chat) {
      if(!chat) return state
      console.log(chat)
      return { ...state, chats: [...state.chats, chat], currentChat: chat}
    },

    setStatus(state, status) {
      return { ...state, status}
    },

    setSelects(state, selects) {
      return { ...state, selects}
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
      this.setStatus('inputing')
      this.setState({ chats: [] })

      const chats = await axios.get('/robot-chat')
      await sleep(1200)
      
      chatModel = new ChatModel(chats)
      const chat = chatModel.robotChats[0]
      this.setState({ chatModel })
      this.pushChat(chat)
      this.setStatus('waiting')
    },

    async userReply(id){
      const chat = chatModel.userChats.find(item => item.id === id)
      this.pushChat(chat)
    },

    async robotReply(id) {
      const chats = chatModel.robotChats.filter(item => item.parentId === id)

      // 回复多条消息
      for(let i=0; i < chats.length; i++) {
        const chat = chats[i]
        if(!(chat.content instanceof Array)  && chat.content.type === 'status') {
          this.setStatus('action')
          await sleep(2000)
          this.pushChat(chat)
          this.setStatus(chat.content.status)
        }

        else if(!(chat.content instanceof Array)  && chat.content.type === 'id') {
          console.log('id chat', chat)
          const { info, content } = chat.content
          const originChat = chatModel.chats.find(item => item.id === info.id)
          const factChat = originChat ? { ...originChat } : null

          if(!factChat) return
          if(content) factChat.content = content

          await this.robotChat(factChat)
        }
        
        else{
          await this.robotChat(chat)
        }
      }
    },

    async robotChat(chat){
      this.setStatus('inputing')
      await sleep(1200)
      this.pushChat(chat)
      this.setStatus('waiting')
    },

    getSelects(id){
      const selects = chatModel.userChats
        .filter(item => item.parentId === id)
        .map(item => {
          let factItem = item

          if(item.content.type === 'id') {
            const { chatId } = item.content.info
            factItem = chatModel.userChats.find(chat => chat.id === chatId)
            if(!factItem) return false
          }

          if(factItem.content.type === 'label' ) {
            return { label: factItem.content.label, value: factItem.id }
          }
          
          if(factItem.content.type === 'text') {
            return { label: factItem.content.text, value: factItem.id }
          }

          return { label: factItem.content, value: factItem.id }
        })
        .filter(item => !!item)

      if(!selects.length) return

      this.setSelects(selects)
    }
  }),
}

export default model
