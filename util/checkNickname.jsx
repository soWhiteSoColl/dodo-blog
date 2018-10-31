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
            label="请先告诉我你的名字（昵称）"
            onChange={e => userInput = e.target.value}
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