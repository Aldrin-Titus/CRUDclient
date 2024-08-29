import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import axios from 'axios'

function CreateUser(){

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [age,setAge] = useState()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Submit =(e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        axios.post("http://localhost:3001/createUser",{name,email,age})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>     
                    <div><Link to="/" className="btn btn-success">&lt; Back</Link></div>   
                    <h2 className='d-flex justify-content-center'>Add User</h2>
                    <div className='mb-2'>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' onChange={ (e) => {setName(e.target.value)}}/>
                    </div>
                    <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control' onChange={ (e) => {setEmail(e.target.value)}}/> </div>
                    <div className='mb-2'>
                    <label htmlFor="">Age</label>
                    <input type="text" placeholder='Enter Age' className='form-control' onChange={ (e) => {setAge(e.target.value)}}/>
                    </div>
                    <div className='d-flex justify-content-center'>
                    <button className='btn btn-success' >Submit</button>
                    </div>
                </form>
            </div> 
        </div>       
    )
}

export default CreateUser