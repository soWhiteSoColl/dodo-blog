import { Dialog, Input } from 'dodoui'
import stores from '../store'


export default function checkNickname() {
  return new Promise((resolve) => {
    let userInput = ''
    const { saveNickname, nickname } = stores.contactStore
    if (!nickname) {
      Dialog.open({
        title: '提示',
        content: (
          <div className="contact-input-nickname">
            <Input
              placeholder="请输入一个三个字以内的名字"
              onChange={e => userInput = e.target.value}
              maxLength="3"
            />
          </div>
        ),
        onOk: (_, close) => {
          saveNickname(userInput)
          close()
          resolve(true)
        },
        onCancel: (_, close) => {
          resolve(false)
          close()
        }
      })
    } else {
      resolve(true)
    }
  })
}