'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import suggestion from "./tiktapEditor/suggestions"
import "./tiktapEditor/mention.css"
import { userType } from '@/lib/types'
import {Editor}   from '@tiptap/core'

import {Image} from '@tiptap/extension-image'
import { Transaction } from '@tiptap/pm/state'

const Tiptap = ({content, mentionUsers,onUpdate}:
  {
    content:string, 
    mentionUsers:userType[],
    onUpdate:((props: {
      editor: Editor;
      transaction: Transaction;
  }) => void) 

  }) => {
  suggestion.items=({query})=> mentionUsers.filter(u=>u.name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5).map(u=>({label:u.name, id:u.id}))
  console.log(mentionUsers, suggestion)
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Image,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }), 
    ],
    content,
    onUpdate
  })
  console.log('editor', editor)
  if (!editor) {
    return null
  }
  return (
    <EditorContent name='desc' editor={editor} />
  )
}

export default Tiptap