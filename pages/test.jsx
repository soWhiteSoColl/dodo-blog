import React from 'react'

const LangContext = React.createContext({
  title: '默认标题'
})

const HeadTitle = () => {
  return <LangContext.Consumer>{lang => <div>{lang.title}</div>}</LangContext.Consumer>
}

const HeadContent = () => {
  return <LangContext.Consumer>{lang => <div>{lang.title}</div>}</LangContext.Consumer>
}
const Head = () => {
  return (
    <div>
      <HeadTitle />
      <HeadContent />
    </div>
  )
}

export default class Test extends React.Component {
  state = {
    lang: { title: 'test' }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ lang: { title: 'hello' } })
    }, 2000)
  }

  render() {
    return (
      <LangContext.Provider value={this.state.lang}>
        <Head />
      </LangContext.Provider>
    )
  }
}
