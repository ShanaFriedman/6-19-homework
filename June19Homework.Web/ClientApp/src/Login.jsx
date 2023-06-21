import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
    const navigate = useNavigate()
    const {setUser} = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [invalidLogin, setInvalidLogin] = useState(false)

    const onTextChange = e => {
        const copy = {...formData}
        copy[e.target.name] = e.target.value
        setFormData(copy)
    }

    const onLoginClick = async e => {
        e.preventDefault()
        const {data} = await axios.post('/api/account/login', formData)
        if(data){
            setUser(data)
            navigate('/')
        }
        console.log(data)
        setInvalidLogin(true)
        setFormData({
            email: '',
            password: ''
        })
    }
    return (<>
        <div
            className="row"
            style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {invalidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <form>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={formData.email}
                        onChange={onTextChange}
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        value={formData.password}
                        onChange={onTextChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
                </form>
                <Link to='/signup'>Don't have an account? Signup here!</Link>
            </div>
        </div>
    </>)
}
export default Login