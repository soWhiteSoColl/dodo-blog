import React from 'react'
import { Drawer } from 'dodoui'

export default class BlogWithTable extends React.Component {
  state = {
    tables: [],
    content: '',
  }

  table = React.createRef()
  parsed = false

  componentDidMount() {
    if (this.props.content) {
      this.handleParse()
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.handleParse()
    }
  }

  handleScroll = () => {
    setTimeout(() => window.scrollTo(0, window.scrollY - 10))
  }

  handleParse = () => {
    const content = this.props.content
    let result = content
    const tables = []
    if (content) {
      result = content.replace(/<(h\d).*?>.*?<\/h\d>/g, (match, tag) => {
        const hash = match.replace(/<.*?>/g, '')
        tables.push({ hash, tag })
        return `<a class="blog-content-anchor" href="#${hash}" id="${hash}">${match}</a>`
      })
    }

    this.setState({ tables, content: result })
  }

  render() {
    const { tables, content } = this.state

    return (
      <div className="blog-wrapper">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: content || this.props.content }}></div>
        {tables.length > 0 &&
          <Drawer>
            <div className="blog-table" ref={this.table}>
              <h4>目录</h4>
              {tables.map(({ hash, tag }, index) => (
                <div key={index} className="blog-table-item">
                  <a
                    className={"blog-table-item-" + tag}
                    href={'#' + hash}
                    onClick={e => this.handleScroll(e, hash)}
                  >{hash}</a>
                </div>
              ))}
            </div>
          </Drawer>
        }
      </div>
    )
  }
}