import {Link} from 'react-router-dom'
interface blogcardtype {
    id:number,
    authorname:string,
    date:string,
    title:string,
    content:string
}

export function Blogcard({authorname,date,title,content,id} : blogcardtype) {
console.log(id)
    return <Link to={`/blog/${id}`}>
     <div className="p-8 border-b pb-8 w-screen max-w-screen-md">
        <div className="flex gap-2">
            <div className=" ">
          <Avatar size="small" authorname={authorname}/>
             </div>
             <div className="flex justify-center flex-col text-sm"><div>{authorname}.</div>
        </div>

        <div className="flex justify-center flex-col">
            <Circle></Circle>
        </div>
        
        <div className="flex justify-center flex-col text-slate-800 font-thin text-sm">{date}</div>

        </div>
          
        <div className="pt-3 font-bold text-2xl ">
            {title}
            
        </div>

        <div className="pt-4 ">
            {content.length <= 100? content: content.slice(0,300) + "...."}
        </div>

        <div className="pt-6">
        
    {Math.ceil(content.length/100) <=0 ? "<1 minute read" : Math.ceil(content.length/100) + " minutes read" }
        </div>

    </div>
    </Link>
}

function Circle(){
    return<div className="h-1 w-1 bg-slate-400 font-thin rounded-full">

    </div>
}

export function Avatar({authorname,size}:{authorname:string,size:string}){
   return <div className={` ${ size == "small" ? "w-8 h-8" : "w-10 h-10"} inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full`} >
    <span className="font-medium text-gray-600 ">{authorname[0]}</span>
   </div>
}