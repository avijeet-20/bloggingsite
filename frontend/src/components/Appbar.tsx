import { ChangeEvent } from "react"
import { Avatar } from "./Blogcard"

export function Appbar({onClick}:{onClick:(e:MouseEventHandler<HTMLButtonElement>) => void}) {
    return <div className="flex justify-between p-4 px-10">
        <div>Medium</div>
        <div className="flex justify-between gap-4">  <button onClick={onClick} type="submit" className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg ml-4 ">
           new +
       </button><Avatar size="big" authorname="Avijeet"></Avatar></div>
    </div>
}