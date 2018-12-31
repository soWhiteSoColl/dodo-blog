import React from 'react'
import { Drawer } from 'dodoui'

export default class ContentsTable extends React.Component {
  state = {
    tables: [],
    content: '',
  }

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
    const { content } = this.props
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
    const { tables, } = this.state

    return (
      <div className="blog-wrapper">
        {tables.length > 0 &&
          <Drawer>
            <div className="blog-table">
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