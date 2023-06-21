import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const {setUser} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async() => {
            await axios.post('/api/account/logout')
            setUser(null)
            navigate('/')
        }
        logout()
    })

    return(<></>)
}

export default Logout
