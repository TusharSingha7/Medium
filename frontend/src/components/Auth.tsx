import { ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@boltco/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type}:{type : "signin" | "signup"})=>{
    const [postInputs,setPostInputs] = useState<SignupInput>({name:"",email:"",password:""});
    const navigate =useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/ap1/v1/user/${type == "signin" ? "signin" : "signup"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("Authorization",jwt);
            navigate("/blogs")
        }catch(err){
            alert("request failed");
            return;
        }
    }
    

    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className=" text-left font-extrabold text-3xl">   
                    {type == "signin" ? "Welcome Back ! ":"Create An Account"}
                    </div>
                    <div className=" text-left font-light text-sm pl-7">   
                        {type == "signin" ? "Dont have an account ? " : "Already have an account ? "}<Link to={type == "signin" ? "/Signup" : "/Signin"} className="underline pl-2">{type == "signin" ? "signUp" : "Login"}</Link>
                    </div>
                </div>
                <div className="mt-6">
                    {type == "signup" ? <LabelledInput lable={"First Name"} placeholde={"Enter Name..."} onChange={(e)=>{
                        setPostInputs((c)=>{
                            return {
                                ...c,
                                name : e.target.value
                            }
                        })
                    }}></LabelledInput> : null}
                    <LabelledInput lable={"Email"} placeholde={"email@gmail.com"} onChange={(e)=>{
                        setPostInputs((c)=>{
                            return {
                                ...c,
                                email : e.target.value
                            }
                        })
                    }}></LabelledInput>
                    <LabelledInput lable={"Password"} type="password" placeholde={"---------"} onChange={(e)=>{
                        setPostInputs((c)=>{
                            return {
                                ...c,
                                password : e.target.value
                            }
                        })
                    }}></LabelledInput>
                </div>
                <div className="mt-5">
                    <button onClick={sendRequest} type="button" className="w-full text-white bg-black hover:bg-grey-800 focus:outline-none focus:ring-4 focus:ring-black-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type == "signup" ? "signUp" : "signIn"}</button>
                </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType {
    lable : string,
    placeholde : string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    type? : string
}
function LabelledInput({lable,placeholde,onChange,type} : LabelledInputType){
    return <div>
        <div className="mt-3 mb-3"> 
            <label className="block mb-2 text-sm font-medium text-gray-900">{lable}</label>
            <input  onChange={onChange} type={type ? type : "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholde} required />
        </div>
    </div>
}