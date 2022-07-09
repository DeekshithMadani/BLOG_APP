import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const ProtectedRoutes = () => {
    let isValidUser = false;

    async function validateToken() {
        const token = localStorage.getItem('token');
        const req = await fetch('http://localhost:5000/validateuser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        })

        const data = await req.json()
        if (data.status !== 'ok') {
            return false;
        }
        else {
            return true;
        }
    }


    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token)
        if (!user) {
            localStorage.removeItem('token');
            isValidUser = false;
        } else {
            isValidUser = validateToken()
        }
    } else {
        isValidUser = false;
    }

    return isValidUser ? <Outlet/> : <Navigate to='/' />
}

export default ProtectedRoutes;