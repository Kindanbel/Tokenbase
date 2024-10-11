import { useState, createContext } from "react";

export const DesignContext = createContext();

export const DesignContextProvider = prop => {
    const [design, setDesign] = useState([]);

    const [groups, setGroup] = useState([]);

    const [tokens, setTokens] = useState([]);

    const addTokens = (token) => {
        setTokens([...tokens, token])
    }


    return (
        <DesignContext.Provider value={{design, setDesign, groups, setGroup, tokens, setTokens, addTokens}}>
            {prop.children}
        </DesignContext.Provider>
    )
}