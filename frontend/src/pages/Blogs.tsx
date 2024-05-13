import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { useBlogs } from "../hooks"

export const Blogs = () => {

    const {loading , blogs} = useBlogs();

if(loading){
    return <div>
        Loading..
    </div>
}

    return<div>
        <Appbar></Appbar>
     <div className=" flex justify-center   ">
        <div className="flex flex-col ">
    {blogs.map((blog) => {
       return <div className="max-w-xl p-2 cursor-pointer" key={blog.id} >
         <Blogcard authorname={blog.author.name || "Anonymus"} title={blog.title} content={blog.content} date="Dec,3,2024" id={blog.id}></Blogcard>
     </div>
    
    })}
    </div>
    </div>
    </div>
     }