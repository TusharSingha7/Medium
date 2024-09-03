import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export const AppBar = ()=>{
    const navigate = useNavigate();
    return <div className="flex justify-center border border-bottom-slate-200">
        <div className="flex flex-1 pb-10 mt-5 ml-5 mr-5 ">
                <button onClick={()=>{
                    navigate(`/blogs`);
                }} className="text-3xl font-bold">Medium</button>
                <form className="ml-7 min-w-64 pt-1">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                    <input type="search" className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-full bg-gray-50 focus:outline-none" placeholder="Search" required />
                    </div>
                </form>
        </div>
        <div className="flex pb-10 mt-5 ml-5 mr-5 items-center">
                <Link to={'/publish'}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm text-center py-2 px-4 mr-5 mt-1">Publish</button>
                </Link>
                <button className="mr-3">
                <div className="ay b cc cd fx dh jr n o js jt"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" aria-label="Notifications"><path stroke="currentColor" strokeLinecap="round" d="M15 18.5a3 3 0 1 1-6 0"></path><path stroke="currentColor" strokeLinejoin="round" d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 5.35 0 0 0 5.5 10.532Z"></path></svg></div>
                </button>
                <button className="rounded-full bg-black ml-3 min-w-10 min-h-10 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                T
                </button>
        </div>
    </div>
    
}