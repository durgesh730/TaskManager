import React, { useState } from 'react'
import Navbar from './Navbar'
import pic from '../images/5272.jpg'
import { NavLink, useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({ name: "" });
    const handleNav = () => {
        if (value.name.length === 0) {
            alert("plz enter name")
        } else {
            navigate('/addtask', { state: { value } })
        }
    }

    return (
        <>
            <Navbar />
            <div className='heading container text-center'>
                <h2>Add Your Task </h2>
            </div>
            <div className='container' >
                <div className='firstform' >
                    <div className='images' >
                        <img src={pic} alt='imaf' />
                    </div>
                    <div className='user'>
                        <h6>Enter Your Name</h6>
                        <input type="text" name='name' value={value.name} class="form-control" id="exampleInputPassword1" placeholder="Name"
                            onChange={(event) => {
                                setValue((prev) => ({ ...prev, name: event.target.value }));
                            }}

                            required
                        />
                        <div className='text-center my-2 '>
                            <button type="button" onClick={handleNav} class="btn btn-primary">Primary</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
