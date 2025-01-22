import { useNavigate } from "react-router-dom";

export default function Dropdown(){
    const nav = useNavigate();
    return <div className="flex flex-col w-24 shadow bg-white rounded rounded-sm absolute top-16 right-4 h-24">
        <button onClick={()=>{
            localStorage.removeItem("token");
            nav('/');
        }}>Log Out</button>
    </div>
}