
import { useNavigate } from "react-router-dom"
interface BlogCardProps {
    authorName :  string,
    title : string,
    content : string,
    publishedDate : string,
    id : string
}
export const BlogCard = (props : BlogCardProps)=>{
    const navigate = useNavigate();
    return <div onClick={()=>{
        navigate(`/blog/${props.id}`);
    }} className="border border-b-slate-200 border-t-white border-l-white border-r-white pb-4 ml-20 mr-10 pt-5 min-w-96 cursor-pointer">
        <div className="flex">
            <div className="flex flex-col justify-center">
                <Avatar authorName={props.authorName}/>
            </div>
            <div className="pl-2 pr-2 text-slate-600"> {props.authorName}</div>
            <div>   
                &#8226;
            </div>
            <div className="pl-2 text-slate-400">
            {props.publishedDate} 
            </div>
            
        </div>
        <div className="text-2xl font-extrabold break-words">
            {props.title}
        </div>
        <div className="text-slate-600 pb-3 break-words">
            {props.content.length >=200 ? props.content.slice(0,200)+"..." : props.content}
        </div>
        <div className="text-slate-500">
            {`${Math.ceil(props.content.length/200)} minute(s)`}
        </div>
    </div>
}

function Avatar({authorName} : {authorName : string}) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
    </div>
    
}