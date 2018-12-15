import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'


const colors = [
  '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
  '#61a951', '#16a085', '#07a9fe', '#003ba5', '#8e44ad', '#f32784',
  '#c0392b', '#d35400', '#f39c12', '#fdda00', '#7f8c8d', '#2c3e50'
]

const controls = [
  'bold', 'italic', 'underline', 'text-color', 'remove-styles', 'separator',
  'emoji', 'link'
]

export default class Editor extends React.Component {
  render() {
    return (
      <div className={'editor-wrapper'}>
        <BraftEditor
          controls={controls}
          colors={colors}
          {...this.props}
        />
      </div>
    )
  }
}
