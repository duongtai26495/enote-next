"use client"
import { access_token, localUser, localWs } from "@/utils/constants";
import { fetchApiData } from "@/utils/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import NotesView from "./NotesView";

export default function WorkspaceView() {
    const [ws, setWs] = useState([])
    const [currentWs, setCurrentWs] = useState(JSON.parse(localStorage.getItem(localWs)) || {})
    useEffect(()=>{
        const getData = async () => {
            const token = Cookies.get(access_token)
            const result = await fetchApiData(`workspace/all`, token)
            const data = result.content
            setWs(data)
        }
        getData()
    },[])

    const selectedWs = (item) => {
        setCurrentWs(item)
        localStorage.setItem(localWs, JSON.stringify(item))
    }

    const RenderData = () => {
        return (
            ws && 
            ws.map((item, index)=>(
            <li onClick={()=> selectedWs(item)} className={`text-black rounded-md py-1 px-2 min-w-fit cursor-pointer hover:shadow-2xl border ${currentWs.id == item.id ? "bg-red-700 text-white" : "bg-white"}`} key={index}>{item.name}</li>
        )))
    }
    
    return (
        <div className=" pt-2 bg-white px-2 ">
            <p className="my-1 text-sm font-bold ">Workspaces</p>
            <ul className="w-full flex flex-row overflow-x-auto gap-3 ">
            <RenderData />
            </ul>
            <NotesView id={currentWs.id}/>
        </div>
    );
}

// export async function getServerSideProps(ctx) {

//     const token = ctx.req.cookies.access_token || ''; // Lấy access_token từ cookie

//     console.log(token)
//     const result = await fetchApiData(`workspace/`, token, "POST")
//     const data = result.content
    
//     return {
//         props: {
//             data
//         }
//     }
// }
