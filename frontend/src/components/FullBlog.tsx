import { AppBar } from "./AppBar"


export const FullBlog = ({title,content,authorName} : {title : string,content:string,authorName:string}) => {
    const obj = new Date();
    const date = obj.getDay().toString() +" "+ obj.getMonth().toString() +" "+ obj.getFullYear().toString();
    return <div>
    <AppBar/>
    <div className="grid grid-cols-12 px-10 w-full pt-20">
                <div className="grid col-span-8 bg-red-200">
                    <div className="text-3xl font-extrabold">
                        {title}
                    </div>
                    <div className="py-3 text-slate-500">
                        Posted on {date}
                    </div>
                    <div className="text-slate-700">
                        {content}
                    </div>
                </div>
                <div className="grid col-span-4 pl-6 bg-yellow-200 justify-center ">
                    <div>
                        Author
                    </div>
                    <div className="text-3xl font-bold">
                        {authorName || "Anonymous"}
                    </div>
                    <div>
                        author details
                    </div>
                </div>
    </div>
    </div>
    
}