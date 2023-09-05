import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext ({
    loginUser:null,
    token:null,
    pageName: 'Home',
    themeMode: 'dark',
    setLoginUser: () => {},
    setToken: () => {},
    setPageName: () => {},
    setThemeMode: () => {},
})

export const ContextProvider = ({children}) => {
    const [loginUser, _setLoginUser] = useState(localStorage.getItem('USER'));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [pageName, _setPageName] = useState(localStorage.getItem('PAGE_NAME'));
    const [themeMode, _setThemeMode] = useState(localStorage.getItem('THEME_MODE'));

    
    const setLoginUser = (user)=>{
        _setLoginUser(user)
        if(user){
            localStorage.setItem('USER', user);
        }else{
            localStorage.removeItem('USER');
        }
    }
    
    const setToken = (token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setPageName = (pageName)=>{
        document.title = process.env.REACT_APP_PROJECT_NAME+" | "+pageName;   
        _setPageName(pageName)
        localStorage.setItem('PAGE_NAME', pageName);  
    }

    const setThemeMode = (themeMode)=>{
        _setThemeMode(themeMode);
        if(themeMode){
            localStorage.setItem('THEME_MODE', themeMode);
        }else{
            localStorage.setItem('THEME_MODE', 'dark');
        }       
    }
    
    return (
        <StateContext.Provider value={{
            loginUser,            
            setLoginUser,
            token,
            setToken,
            pageName,
            setPageName,
            themeMode,
            setThemeMode
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)