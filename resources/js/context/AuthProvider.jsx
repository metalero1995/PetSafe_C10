import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                loginModal,
                registerModal,
                setLoginModal,
                setRegisterModal
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;