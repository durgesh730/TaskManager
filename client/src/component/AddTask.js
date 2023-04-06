import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

const AddTask = () => {
    const location = useLocation()
    const name = location.state.value.name
    const [task, setTask] = useState()
    const [inVal, setInpval] = useState({
        task: '',
        duedate: "",
    })
    const [fil, setFil] = useState()
    const [id, setId] = useState();

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inVal,
                [name]: value
            }
        })
    }

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        const changeValue = (v) => {
            setValue(v)
        }
        return {
            value,
            onChange: handleChange,
            onSet: changeValue
        };
    };

    const taskName = useInput("");
    const dueDate = useInput("");
    const status = useInput("");


    const handleOpen = (not) => {
        taskName.onSet(not.taskName);
        dueDate.onSet(not.dueDate);
        status.onSet(not.status);
        setId(not._id)
        document.getElementById("myModal").style.display = "block";
    }

    function handleClose() {
        document.getElementById("myModal").style.display = "none";
    }

    const handleform = async (e) => {
        e.preventDefault();
        const { task, duedate } = inVal;
        if (task === '') {
            alert(" enter")
        } else {
            const data = await fetch(`http://localhost:5000/addtask`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task, duedate, name
                })
            });
            const res = await data.json();
            if (res.status === (201)) {
                setInpval({
                    ...inVal,
                    task: '',
                    duedate: ""
                })
                window.location.reload()
            }
        }
    }

    const GetAlltask = async () => {
        const data = await fetch(`http://localhost:5000/notes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await data.json();
        setTask(res.note)
        setFil(res.note)
    }

    const handleDelete = async (id) => {
        const data = await fetch(`http://localhost:5000/alltask/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const json = await data.json()
        window.location.reload()
    }

    const handleSumNote = async () => {
        const Note = await fetch(`http://localhost:5000/edittask/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskName, dueDate, status })
        })
        const data = await Note.json();
        if (data.status === 201) {
            window.location.reload()
        } else {
            alert('some error occured ')
        }
    }


    const [select, setSelect] = useState("");
    const setGet = (e) => {
        const { name, value } = e.target;

        setSelect(() => {
            return {
                ...select,
                [name]: value,
            };
        });
    };

    const handleSelect = async () => {
        const data = await fetch(
            `http://localhost:5000/SelectData?taskName=${select.select}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await data.json();
        setTask(res)
    };

    const handleSelectStatus = async () => {
        const data = await fetch(
            `http://localhost:5000/SelectDataStatus?taskName=${select.select}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await data.json();
        setTask(res)
        console.log(res, "jkhgf")
    };

    useEffect(() => {
        GetAlltask();
    }, [])


    return (
        <>
            <Navbar />
            <div className='container formfields '>
                <form >
                    <h2 className='text-center my-4'>Add Task</h2>
                    <div className='inputs'>
                        <div className="form-group text-center  p-3 ">
                            <input type="fname" className="form-control" value={inVal.task} name="task" id="name" aria-describedby="emailHelp" placeholder="task Name" onChange={setVal} minlength="3" />
                        </div>
                        <div className="form-group text-center p-3 ">
                            <input type="date" className="form-control" id="lastname" name="duedate" value={inVal.duedate} placeholder="Date" onChange={setVal} />
                        </div>
                    </div>
                    <div className='formbutton my-4'>
                        <button type="submit" onClick={handleform} className="btn">Submit</button></div>
                </form>
            </div>

            <div className='container text-center d-flex justify-content-between align-item-center ' >
                <h2>Tasks</h2>

                <div className='d-flex justify-content-between '>

                    <div className="filter">
                        <select
                            value={select.select}
                            name="select"
                            className="bg-light p-1 border-0"
                            onClick={handleSelect}
                            onChange={setGet}
                        >
                            <option selected>Filter</option>
                            {
                                fil?.map((item) => {
                                    return (
                                        <option>{item.taskName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="fil mx-2 ">
                        <select
                            value={select.select}
                            name="select"
                            className="bg-light p-1 border-0"
                            onClick={handleSelectStatus}
                            onChange={setGet}
                        >
                            <option selected >select</option>
                            <option>Pending</option>
                            <option>Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='container' >
                <div className='tableVerified'>
                    <table>
                        <tr className='my-4' >
                            <td>S.No</td>
                            <td>Task</td>
                            <td>Due Date</td>
                            <td>Status</td>
                        </tr>
                        {
                            task?.length === 0 || task === undefined ?
                                <div class="loader"></div> :
                                task?.map((item, index) => {
                                    return (
                                        <tr key={index} className='trtd' >
                                            <td>{index + 1}</td>
                                            <td>{item.taskName}</td>
                                            <td>{item.dueDate.slice(0, 10)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className='btn-view' onClick={() => { handleOpen(item) }}>Edit</button>
                                            </td>
                                            <td><button className='btn-card' onClick={() => { handleDelete(item._id) }} >Delete</button></td>
                                        </tr>
                                    )
                                })
                        }
                    </table>
                </div>
            </div>

            {/* ==================== edit notes ============== */}

            <div id="myModal" class="modal">
                <div class="modal-content mx-auto ">
                    <div className='text-center' >
                        <h2>Edit Tasks</h2>
                    </div>
                    <div className='inputs col-9 mx-auto '>
                        <input type="title" className="form-control" id="title" value={taskName.value} onChange={taskName.onChange}
                            name="taskName" aria-describedby="emailHelp" placeholder="Task" />
                    </div>
                    <div className=" textarea col-9 my-4 mx-auto ">
                        <input type="title" className="form-control" id="title" value={dueDate.value.slice(0, 10)} onChange={dueDate.onChange}
                            name="dueDate" aria-describedby="emailHelp" placeholder="Date" />
                    </div>
                    <div className=" textarea col-9 my-4 mx-auto ">
                        <input type="title" className="form-control" id="title" value={status.value} onChange={status.onChange}
                            name="dueDate" aria-describedby="emailHelp" placeholder="Status" />
                    </div>

                    <div className="text-center" >
                        <button type="submit" className="btn submit mx-4 " onClick={handleClose} >Close</button>
                        <button type="submit" className="btn submit" onClick={handleSumNote} >Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddTask
