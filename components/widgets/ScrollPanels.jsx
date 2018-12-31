import React from 'react'

class ScrollPanelItem extends React.Component {
  render(){
    return (
      <div>lalal</div>
    )
  }
}

export default class ScrollPanel extends React.Component {

  componentDidUpdate(prevProp){
    if(this.props.value !== prevProp.value){
      this.handleScroll()
    }
  }

  componentDidMount(){

  }

  static Item = ScrollPanelItem
  render(){
    return (
      <div>
        <div className="do-scroll-panel-next">

        </div>
        <div className="do-scroll-panel-next">
          
        </div>
        <div className="do-scroll-panel-next">
          
        </div>
      </div>
    )
  }
}