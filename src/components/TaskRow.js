import { access_token } from "@/utils/constants";
import { fetchApiData } from "@/utils/functions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function TaskRow({ item }) {

    const taskItem = item

    console.log(taskItem)
    const [task, setTask] = useState(taskItem)

    const updateTask = async () => {
        const token = Cookies.get(access_token)
        const resultUpdate = await fetchApiData(`note/task/update`, token, "PUT", task)
        const data = resultUpdate.data
        setTask(data)
    }

    return (
        <li className="flex flex-row w-full gap-2 justify-between p-2 bg-slate-100">
            {
                task.type == "CHECK" ?
                    <input 
                    onBlur={updateTask} 
                    className="w-full flex-1 p-1 bg-transparent" type="text" onChange={e => { setTask({ ...task, content: e.target.value }) }} value={task.content} />
                    :
                    <textarea
                    onBlur={updateTask} 
                    rows={3} className="w-full flex-1 p-1 bg-slate-50" type="text" onChange={e => { setTask({ ...task, content: e.target.value }) }} value={task.content} >
                    </textarea>
            }


            {
                task.type == "CHECK" &&
                <input 
                className="taskChBox" 
                type="checkbox" 
                value={task.type} 
                checked={task.done} 
                onChange={(e) => { setTask({ ...task, done: e.target.checked }) }} />
            }
        </li>
    );
}

