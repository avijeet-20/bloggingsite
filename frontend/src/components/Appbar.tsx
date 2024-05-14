import { ChangeEvent } from "react"
import { Avatar } from "./Blogcard"
import { Link, useNavigate } from "react-router-dom"

export function Appbar() {
 const navigate = useNavigate();
    function handleClick() {
        navigate('/publish')
    }

    return <div className="flex justify-between p-4 px-10">
       <Link to={'/blogs'}><div>Medium</div></Link> 
        <div className="flex justify-between gap-4">  <button onClick={handleClick} type="submit" className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg ml-4 ">
           new +
       </button><Avatar size="big" authorname="Avijeet"></Avatar></div>
    </div>
}