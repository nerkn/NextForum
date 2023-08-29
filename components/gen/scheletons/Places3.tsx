import { cn } from "@/lib/utils";
import { ReactElement } from "react";




export function Places3(
    {fillers, className}:
    {
        fillers:ReactElement[], 
        className?:string
    }){
        return <div className={cn('flex', className)}>
            <div className="basis-1/5 ">{fillers[0]}</div>
            <div className="basis-3/5 grow">{fillers[1]||''}</div>
            <div className="basis-1/5 ">{fillers[2]||''}</div>
        </div>

}