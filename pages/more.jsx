import React from 'react'
import AnimateQueue from 'widgets/AnimateQueue'
import { Button } from 'dodoui'

export default class More extends React.Component {

  projects = [
    {
      name: 'zeus-ui 组件库',
      link: 'https://zeus-ui.com',
      codeLink: 'https://github.com/zcued/zeus-doc',
      cover: '/static/works/zeus-ui.png'
    },
    {
      name: 'dodoui 组件库',
      link: 'https://ui.dodoblog.cn',
      codeLink: 'https://github.com/soWhiteSoColl/dodoui',
      cover: '/static/works/dodo-ui.png'
    },
    {
      name: '扫雷游戏',
      link: 'https://sowhitesocoll.github.io/clear-mine/mine/mine.html',
      codeLink: 'https://github.com/soWhiteSoColl/clear-mine',
      cover: '/static/works/clear-mine.png'
    },
    {
      name: 'canvas粒子动画',
      link: 'https://sowhitesocoll.github.io/text-proticle/drawtext.html',
      codeLink: 'https://github.com/soWhiteSoColl/text-proticle',
      cover: '/static/works/proticle.png'
    },
    {
      name: '图片动画展示',
      link: 'https://sowhitesocoll.github.io/imgShow/imageCss.html',
      codeLink: 'https://github.com/soWhiteSoColl/imgShow',
      cover: '/static/works/img-show.png'
    },
    {
      name: '鼠标追踪动画',
      link: 'https://sowhitesocoll.github.io/mousemoveAnimation/',
      codeLink: 'https://github.com/soWhiteSoColl/mousemoveAnimation',
      cover: '/static/works/mouse.png'
    }
  ]

  render() {
    return (
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
              <div className="contact-project-item-wrapper">
                <div className="contact-project-item" key={index}>
                  <div className="contact-project-cover">
                    <img src={item.cover} alt="" />
                    <div className="contact-project-mask">
                      <a target="_blank" href={item.link}><Button type="primary">在线演示</Button></a>
                      <a target="_blank" href={item.codeLink}><Button>项目地址</Button></a>
                    </div>
                  </div>
                  <div className="contact-project-name">
                    {item.name}
                  </div>
                </div>
              </div>
            )
          }
        </AnimateQueue>
      </div>
    )
  }
}
