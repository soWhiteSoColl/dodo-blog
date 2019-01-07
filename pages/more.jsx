import React from 'react'
import Head from 'next/head'
import AnimateQueue from 'widgets/AnimateQueue'
import { Button } from 'dodoui'

export default class More extends React.Component {

  projects = [
    {
      name: 'zeus-ui 组件库',
      link: 'https://zeus-ui.com',
      codeLink: 'https://github.com/zcued/zeus-doc',
      cover: '/static/works/zeus-ui.png',
      desc: '开发站酷海洛集成的组件库, 访问www.hellorf.com'
    },
    {
      name: 'dodoui 组件库',
      link: 'https://ui.dodoblog.cn',
      codeLink: 'https://github.com/soWhiteSoColl/dodoui',
      cover: '/static/works/dodo-ui.png',
      desc: '交互体验很好也蛮有意思的一些组件'
    },
    {
      name: '扫雷游戏',
      link: 'https://sowhitesocoll.github.io/clear-mine/mine/mine.html',
      codeLink: 'https://github.com/soWhiteSoColl/clear-mine',
      cover: '/static/works/clear-mine.png',
      desc: '大学写的小游戏'
    },
    {
      name: 'canvas粒子动画',
      link: 'https://sowhitesocoll.github.io/text-proticle/drawtext.html',
      codeLink: 'https://github.com/soWhiteSoColl/text-proticle',
      cover: '/static/works/proticle.png',
      desc: '自己动画开发技术的一个很满意的作品'
    },
    {
      name: '图片动画展示',
      link: 'https://sowhitesocoll.github.io/imgShow/imageCss.html',
      codeLink: 'https://github.com/soWhiteSoColl/imgShow',
      cover: '/static/works/img-show.png',
      desc: '强大的css3 transform的一个运用'
    },
    {
      name: '鼠标追踪动画',
      link: 'https://sowhitesocoll.github.io/mousemoveAnimation/',
      codeLink: 'https://github.com/soWhiteSoColl/mousemoveAnimation',
      cover: '/static/works/mouse.png',
      desc: 'canvas 3d交互效果，自己很喜欢的一个小项目'
    }
  ]

  render() {
    return (
      <>
        <Head>
          <title>小寒的博客 - 项目列表</title>
        </Head>

        <div className="contact-project">
          <AnimateQueue
            animate={true}
            from={{ transform: 'translateY(80px)' }}
            to={{ transform: 'translateY(0px)' }}
            speed={600}
            interval={100}
          >
            {
              this.projects.map((item, index) =>
                <div className="contact-project-item-wrapper" key={index}>
                  <div className="contact-project-item">
                    <div className="contact-project-cover">
                      <img src={item.cover} alt="" />
                      <div className="contact-project-mask">
                        <a target="_blank" href={item.link}><Button type="primary">在线演示</Button></a>
                        <a target="_blank" href={item.codeLink}><Button>项目地址</Button></a>
                      </div>
                    </div>
                    <div className="contact-project-info">
                      <div className="contact-project-name">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </AnimateQueue>
        </div>

      </>
    )
  }
}
