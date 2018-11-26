import { Dialog, Input } from 'dodoui'
import stores from '../store'


export default function checkNickname() {
  return new Promise((resolve) => {
    let userInput = ''
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
        stores.contactStore.saveNickname(userInput)
        close()
        resolve()
      },
    })
  })
}