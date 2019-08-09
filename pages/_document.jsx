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
          <script>
            {`window._pt_lt = new Date().getTime();
              window._pt_sp_2 = [];
              _pt_sp_2.push("setAccount,26c1d230");
              var _protocol =(("https:" == document.location.protocol) ? " https://" : " http://");
              (function() {
                var atag = document.createElement("script");
                atag.type = "text/javascript";
                atag.async = true;
                atag.src = _protocol + "js.ptengine.cn/26c1d230.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(atag, s);
              })();`}
          </script>
        </body>
      </html>
    )
  }
}
