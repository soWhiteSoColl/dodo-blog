export default {
  state: {
    isTyperFirstRendered: false,
    renderedBlogListNumber: 0,
    lastViewPageY: 0,
  },

  reducers: {
    setIsTyperFirstRendered(state, isTyperFirstRendered) {
      return { ...state, isTyperFirstRendered }
    },

    setRenderedBlogListNumber(state, renderedBlogListNumber) {
      return { ...state, renderedBlogListNumber }
    },

    setLastViewPageY(state, lastViewPageY) {
      return { ...state, lastViewPageY }
    },
  },
}
