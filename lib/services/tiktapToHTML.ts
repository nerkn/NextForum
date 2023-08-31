
import  {generateHTML} from "@tiptap/html"
import StarterKit from "@tiptap/starter-kit"
import Mention from "@tiptap/extension-mention"
import Image from "@tiptap/extension-image" 

export function TipTap2HTML(jsonstring:string){
    let json = JSON.parse(jsonstring) ;
    let generated = generateHTML(json,  [
        StarterKit, 
        Image,
        Mention.configure({
          HTMLAttributes: {
            class: 'mention',
          }, 
        }), 
      ],  )
    return generated
}