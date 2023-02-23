import axios from "../axios";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children })=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs)=>{
         const res = await axios.post("/auth/login", inputs);
         setCurrentUser(res.data);
         console.log(res.data);
    }

    const logout = async ()=>{
        const res = await axios.post("/auth/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;