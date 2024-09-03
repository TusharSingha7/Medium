import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
    author : {
        name : string
    },
    content : string,
    title : string,
    published : boolean,
    id : string
};
export const useBlog = ({id} : {id : string}) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog>({
        author : {
            name : "Auther Name"
        },
        content : "content",
        title : "title",
        published : false,
        id : "none"
    });

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/ap1/v1/blog/fetch/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token"),
            }
        })
        .then(response=>{
            setBlog(response.data);
            setLoading(false);
        })
    },[id]);
    return {
        loading,
        blog
    }
};
export const useBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/ap1/v1/blog/bulk`,{
            headers : {
                Authorization : localStorage.getItem("token"),
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[]);
    return {
        loading,
        blogs
    }
}