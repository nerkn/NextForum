import { format } from "@lukeed/ms"
import { type ClassValue, clsx } from "clsx"
import { NextResponse } from "next/server"
import { FormEvent } from "react"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function slugCheck({type,slug}:{
  type:"topic"|"group",
  slug:string,
  }){
      return await fetch(`/api/slugCheck?type=${type}&slug=${slug}`)
        .then(r=>r.json())
}
export function slugify(str:string) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export function formSubmit(
  callback=console.log, 
  error=()=>{}) {
    return (event:FormEvent<HTMLFormElement> & {
      target:HTMLElement&{
        action:string,
        elements:HTMLInputElement[]
      }
    }) => {
      event.preventDefault();
      console.log('formSubmitting', event);
      let emptyRec : Record<string, any> = {}
      fetch(event.target.action ,{
          method:"Post", 
          body: JSON.stringify(
            [...event.target.elements].reduce((a,e)=>{
                  if(e.name)
                    if(typeof e.value != "undefined")
                        a[e.name as string]=e.value; 
                  return a
                  }, emptyRec)
          )
        }
        ).then(callback).catch(error)
    }
}


export function  ReturnError( msg:string, data?:string|any){
  return NextResponse.json({err:true, msg, data})
}

export function  ReturnNormal(msg:string, data?:string|any){
  return NextResponse.json({err:false, msg, data})
}


export function fmtDate(dateString:string, long:boolean=false){
  return format(
    new Date().getTime()-
    new Date(dateString).getTime(),
    long);
}