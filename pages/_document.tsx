import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客"/>
          <meta name="description" content="小寒的博客，用来分享自己的知识，欢迎大家关注"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json"></link>
          <script src="/static/lib/register-sw.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
