import { Dialog, Input } from 'dodoui'
import stores from '../stores'


export function checkNickname() {
  return new Promise((resolve) => {
    stores.contactStore.getNickname()
    let userInput = ''

    const { saveNickname, nickname } = stores.contactStore
    if (nickname) {
      resolve(true)
    } else {
      const dialog = Dialog.create({
        noCancelBtn: true,
        title: '提示',
        content: (
          <div className="contact-input-nickname">
            <Input
              placeholder="请输入一个三个字以内的名字"
              onChange={e => userInput = e.target.value}
              maxLength="3"
            />
          </div>
        )
      })
      return dialog.show()
        .then(() => {
          dialog.close()
          userInput && saveNickname(userInput)
          return resolve(!!userInput)
        })
    }
  })
}