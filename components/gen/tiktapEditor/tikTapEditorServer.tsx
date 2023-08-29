"use client"

import { PureEditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention' 
import "./mention.css" 

import {Image} from '@tiptap/extension-image' 

export const TiptapServerRenderer = ({content}:
  {
    content:string
  }) => { 

    
    if(!content.startsWith('{'))
        return content
    
  const editor = new Editor({
    extensions: [
      StarterKit, 
      Image,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        }, 
      }), 
    ],
    content:{content:[JSON.parse(content)], type:"doc",  },
  
  })
  console.log('editor', editor)
  if (!editor) {
    return null
  }
  return (
    <PureEditorContent  name='desc' editor={editor} readOnly={true} />
  )
}
 