export default class Base {
  /**
   * 批量更新
   * @param props
   */
  setValues(props) {
    Object.keys(props).map(key => {
      this.setValue(key, props[key])
    })
  }

  /**
   * 更新store中的字段
   * @param key 属性名
   * @param value 属性值
   */
  setValue(key, value) {
    if (this.hasOwnProperty(key)) {
      this[key] = value
    }
  }
}