import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export function Publish() {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar></Appbar>
        <div id="wrapper" className="w-full flex justify-center ">

       
<div className="mb-6 w-full flex justify-center mt-24 flex-col gap-4 items-center">
    <input type="text" id="large-input"  onChange={(e) => {
        setTitle(e.target.value)
    }} placeholder="Title" className="block w-1/2 p-4 text-gray-900  rounded-lg bg-gray-200 text-base focus:ring-blue-500 focus:border-blue-500 "></input>
    <div className="flex justify-center w-full"><Textarea onChange = {(e) => {
        setDesc(e.target.value)
    }}></Textarea></div>
    <button type="submit"  onClick={ async () => {
      const response = await  axios.post(`${BACKEND_URL}/api/v1/blog`,
           {
            title,
            content:desc
           } ,
           {
            headers:{
                authorization:localStorage.getItem('token')
               }
           }

        )
        console.log(response)
        navigate(`/blog/${response.data.created.id}`)
    }}  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg mt-4">
           Publish post
       </button>

</div>

    </div>
    </div>
}


function Textarea ({onChange}: {onChange:(e:ChangeEvent<HTMLTextAreaElement>) => void}) {
    return<div className="w-1/2"> 
    <form className="w-full">
      <textarea id="editor" onChange={onChange}   rows={15} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 " placeholder="Write an article..." required ></textarea>

      
    </form>
    </div>
}