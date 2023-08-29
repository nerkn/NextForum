import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import MentionList from './MentionList.jsx'

export default {
  items: ({ query }) => {
    return [
      {label:'Page Loading', id:0},
      {label:'No users loading', id:0},
      {label:'will get update', id:0},
      {label:'hope so', id:0},
       
    ]
    .filter(u=>u.name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5).map(u=>({label:u.name, id:u.id}))
  },

  render: () => { 
    let component
    let popup
    return {
      onStart: props => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        }) 
        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        if(popup && popup.length)
          popup[0].destroy()
        
        if(component)
          component.destroy()
      },
    }
  },
}