
import { AppBar } from "../components/AppBar"
import { useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Publish = ()=>{
    const [tit,setTit] = useState("title");
    const [des,setDes] = useState("des");
    const navigate = useNavigate();
    return <div>
            <AppBar/>
            <div>
                    <div className="m-10 flex justify-center">
                            <div className=" flex-1 max-w-screen-lg">
                
                            <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <textarea onChange={(e)=>{
                                   setTit(e.target.value); 
                            }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-full" placeholder="Write your thoughts here..."></textarea>

                            </div>
                    </div>
                    <div className="m-10 flex justify-center">
                            <div className=" flex-1 max-w-screen-lg md:min-h-56">
                
                            <label className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                            <textarea onChange={(e)=>{
                                setDes(e.target.value);
                            }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-full" placeholder="Write your thoughts here..."></textarea>
                            </div>
                    </div>
                    <div className="m-10 flex justify-center">
                            <button onClick={async function(){
                                try{
                                    const response = await axios.post(`${BACKEND_URL}/ap1/v1/blog/add`,{
                                        title : tit,
                                        content : des,
                                        published : true
                                    },{
                                        headers : {
                                            Authorization : localStorage.getItem("token")
                                        }
                                    });
                                    const id = response.data.id;
                                    navigate(`/blog/${id}`);
                                }
                                catch(err){
                                    alert("error uploading");
                                }
                            }} className="ml-10 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Publish post
                            </button>
                    </div>
            </div>
    </div>
     
};
