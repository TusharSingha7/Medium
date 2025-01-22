import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { Blog } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
export default function Myblogs(){
    const [blogs,setBlogs] = useState<Blog[]>([]);
    const id = useParams();
    console.log(id.id);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/ap1/v1/blog/spec/${id.id}`,{
            headers : {
                Authorization : localStorage.getItem("token"),
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
        }).catch((err)=>{
            alert(err);
        })
    },[]);
    return <div>
            <div><AppBar/></div>
            <div className="flex ">
                <div className="max-w-xl ">
                    {blogs.map((blog : Blog)=>{
                        return <BlogCard key={blog.id} id={blog.id}
                        authorName={blog.author.name || "anonymous"} 
                        publishedDate=""
                        title={blog.title}
                        content={blog.content}
                        view = {true}
                        />
                    })}
                </div>
            </div>
        </div>
}