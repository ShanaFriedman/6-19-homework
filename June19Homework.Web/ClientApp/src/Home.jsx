import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { HubConnectionBuilder } from '@microsoft/signalr';


const Home = () => {
    const {user} = useAuth()
    const connectionRef = useRef(null)
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({
        title: ''
    })
    const textBoxRef = useRef(null)

    const getTasks = async () => {
        const { data } = await axios.get('/api/task/gettasks')
        setTasks(data)
        
    }

    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/taskshub").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('setToDoing', t => {
                setTasks(oldList => oldList.map(task => task.id === t.id ? t : task ))
            })

            connection.on('newTask', t => {
                setTasks(task => [...task, t]);
            });

            connection.on('deleted', taskId => {
                setTasks(oldList => oldList.filter(task => task.id != taskId))
            })

        }

        connectToHub();
    }, [])

    useEffect(() => {
        getTasks()
        textBoxRef.current.focus()
    }, [])

    const onAddTaskClick = async () => {
        await axios.post('/api/task/addtask', task)
        setTask({
            title: ''
        })
        textBoxRef.current.focus()
    }

    const OnDoneClick = async (taskId) => {
        await axios.post('/api/task/taskDone', {taskId})
    }

    const onDoingClick = async (taskId) => {
        await axios.post('/api/task/settasktodoing', {taskId})
    }
    return (<>
        <div className="row">
            <div className="col-md-10">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={e => setTask({ title: e.target.value })}
                    ref={textBoxRef}
                />
            </div>
            <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={onAddTaskClick}>
                    Add Task
                </button>
            </div>
        </div>
        <table className="table table-hover table-striped table-bordered mt-3">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => <tr key={t.id}>
                    <td >{t.title}</td>
                    <td>
                        {!t.userId ? <button className="btn btn-dark" onClick={() => onDoingClick(t.id)}>
                            I'm doing this one!
                        </button> : t.userId === user.id ?
                            <button className="btn btn-success"  onClick={() => OnDoneClick(t.id)}>I'm done!</button> :
                            <button className="btn btn-warning" disabled={true}>{t.user.firstName} {t.user.lastName} is doing this</button>
                        }
                    </td>
                </tr>)}
            </tbody>
        </table>

    </>)
}
export default Home