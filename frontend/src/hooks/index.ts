import { useEffect, useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "../config";
import {useSearchParams} from 'react-router-dom'

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export function useBlog({id}:{id:string}) {
 
    const [loading,setloading] = useState(true);
    const [blogs,setblogs] = useState<Blog>();

    useEffect( () => {
         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then((res) => {

            console.log(res.data)
            setblogs(res.data);
            setloading(false)
        })
    },[])

return {
    loading,
    blogs
}

}


export function useBlogs() {
    const [loading,setloading] = useState(true);
    const [blogs,setblogs] = useState<Blog[]>([]);

    useEffect( () => {
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then((res) => {

            console.log(res.data.posts)
            setblogs(res.data.posts);
            setloading(false)
        })
    },[])

return {
    loading,
    blogs
}

}