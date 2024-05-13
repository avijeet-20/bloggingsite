import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./Blogcard"

export const Fullblog  = ({blog}:{blog:Blog}) => {
    console.log(blog)
    return <div>
        <Appbar></Appbar>
  <div className="flex justify-center pt-4">
    <div className=" md:grid md:grid-cols-10 w-full max-w-screen-xl pt-6">
        <div className="col-span-7 ">
            <div className="font-extrabold text-5xl">
                {blog.title}
            </div>
            <div className="p mt-2 text-slate-400 font-medium text-xl">
                Posted on August 24,2023
            </div>
            <div className="text-xl pt-4 ">
                {blog.content}
            </div>
            </div>
        <div className="col-span-3 p-2 ml-4">
            <div className="text-xl font-normal mt-2">
                Author
            </div>
            <div className="flex gap-4 pt-4 mt-4">
                <div className="mt-6">
                    <Avatar authorname={blog.author.name} size="small"></Avatar>
                </div>
                <div>
                    <div className="font-bold text-2xl">{blog.author.name}</div>
                    <div className="w-full text-slate-400 font-medium text-x pt-2 ">Master of mirth , pujrvetyor of puns, and the funniest prson in the kingdom.</div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
}