import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        id: null,
        username: null,
        email:null,
        token: "",
    })
    useEffect(() => {
        const data = localStorage.getItem('auth')
        
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                id: parseData.id,
                username: parseData.username,
                email: parseData.email,
                token: parseData.token,
            })
        }
    }, [])
    return(
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }