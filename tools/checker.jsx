import { Dialog, Input } from 'dodoui'
import stores from '../stores'

export function checkNickname() {
  return new Promise(resolve => {
    stores.contactStore.getNickname()
    let userInput = ''
    const { saveNickname, nickname, saveViewRecord } = stores.contactStore
    if (nickname) {
      resolve(true)
    } else {
      Dialog.open({
        noCancelBtn: true,
        title: '提示',
        content: (
          <div className="contact-input-nickname">
            <Input
              placeholder="请输入一个三个字以内的名字"
              onChange={e => (userInput = e.target.value)}
              maxLength="3"
            />
          </div>
        ),
        onOk: close => {
          if (userInput) {
            saveNickname(userInput)
            saveViewRecord()
          }
          close()
          resolve(!!userInput)
        }
      })
    }
  })
}
