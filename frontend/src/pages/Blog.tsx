
import { useParams } from "react-router-dom";
import { Fullblog } from "../components/Fullblog"
import { useBlog } from "../hooks"


export const Blog = () => {
    console.log('control reached')
    const {id} = useParams();
    console.log(id + 'thid id yhr lgjdfsl;')
        const {loading,blogs} = useBlog({id: id || ""});

        if(loading || !blogs){
            return <div>
                Loading..
            </div>
        }

    
        return <div>
        <Fullblog blog={blogs}></Fullblog>
    </div>
    
     }