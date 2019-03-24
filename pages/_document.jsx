import Document, { Head, Main, NextScript } from 'next/document'
import dodocss from 'dodoui/lib/dodo.css'
import maincss from '../styles/index.scss'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, css: dodocss + maincss }
  }

  render() {
    const { css } = this.props

    return (
      <html>
        <Head>
          <title>小寒的博客-用心创作</title>
          <meta name="baidu-site-verification" content="hd4JTXEMxD" />
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="小寒的博客，用来分享自己的知识，欢迎大家关注" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <style>{css}</style>
          <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" type="text/css" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
