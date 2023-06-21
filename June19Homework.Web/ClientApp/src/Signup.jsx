import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        email: '',
        password: ''
    })

    const onTextChange = e => {
        console.log(e.target.name)
        const copy = {...formData}
        copy[e.target.name] = e.target.value
        setFormData(copy)
    }


    const onSignupClick = async e => {
        e.preventDefault()
        await axios.post('/api/account/signup', formData)
        navigate('/login')
    }
    return(<div
        className="row"
        style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
      >
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
          <h3>Sign up for a new account</h3>
          <form>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              value={formData.firstName}
              onChange={onTextChange}
            />
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              value={formData.lastName}
              onChange={onTextChange}
            />
            <br />
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
            <button className="btn btn-primary" onClick={onSignupClick}>Signup</button>
          </form>
        </div>
      </div>
      )
}
export default Signup;