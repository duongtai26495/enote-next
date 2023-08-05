import { access_token } from "@/utils/constants";
import { fetchApiData } from "@/utils/functions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import TaskRow from "./TaskRow";

export default function NoteItem({ item }) {


    const [tasks, setTasks] = useState([])

    const [note, setNote] = useState(item)

    const renderTasks = async () => {
        if (note) {
            const token = Cookies.get(access_token)
            const resultTask = await fetchApiData(`note/tasks/${note.id}`, token)
            const data = resultTask.content
            setTasks(data)
        }
    }

    const renderNote = async () => {
        if (note) {
            const token = Cookies.get(access_token)
            const resultNote = await fetchApiData(`note/get/${note.id}`, token)
            const data = resultNote.data
            setNote(data)
        }
    }
    useEffect(() => {
        renderTasks()
    }, [])


    const RenderTaskItem = () => {
        return (
            tasks &&
            tasks.map((item, index) => {
                (<TaskRow item={item} key={index} />)
            }
            )
        )
    }

    const updateItem = async () => {
        const token = Cookies.get(access_token)
        const resultUpdate = await fetchApiData(`note/update`, token, "PUT", note)
        const data = resultUpdate.content
        setNote(data)
        renderNote()
    }

    const updateChecked = (e) => {
        let updateNote = note
        note.done = e
        setNote(updateNote)
        updateItem()
    }

    return (
        note && (
            <div className={`break-inside-avoid relative h-fit border rounded-sm shadow-sm cursor-pointer hover:shadow-lg mb-2 border-t-2 border-l-8 border-l-red-600 border-t-red-600`}>
                <div className={`${note.done ? "block" : "hidden"} absolute bg-white opacity-60 w-full h-full`}></div>
                <div className="flex flex-row justify-between gap-1 bg-red-600 p-2 text-white">

                    <input
                        style={{ width: "90%" }}
                        className="font-bold text-md h-fit bg-transparent"
                        onChange={e => { setNote({ ...note, name: e.target.value }) }}
                        onBlur={updateItem}
                        type="text" value={note.name} />
                    <input
                        className="noteChBox absolute top-2 right-2 w-4 z-10"
                        defaultChecked={note.done}
                        type="checkbox"
                        onChange={e => {
                            updateChecked(e.target.checked)
                        }} />
                </div>
                <ul className="">
                    <RenderTaskItem />
                </ul>
            </div>
        )
    );
}

