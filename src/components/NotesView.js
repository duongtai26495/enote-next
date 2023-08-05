import { access_token, localNote } from "@/utils/constants";
import NoteItem from "./NoteItem";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchApiData } from "@/utils/functions";

export default function NotesView({id}) {

    const [notes, setNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(JSON.parse(localStorage.getItem(localNote)) || {})
    
    useEffect(()=>{
        const getData = async () => {
            const token = Cookies.get(access_token)
            const result = await fetchApiData(`workspace/get/${id}`, token)
            const data = result.content
            setNotes(data)
        }
        getData()
    },[id])

    const RenderItems = () => {
        const data = notes
        return(
            data &&
            data.map((item, index)=>(
                <NoteItem item={item} key={index} />
            ))
        )
    }
    
    return (
        <div className="w-full columns-1 md:columns-5 my-2 min-h-full">
            <RenderItems />
        </div>
    );
}
