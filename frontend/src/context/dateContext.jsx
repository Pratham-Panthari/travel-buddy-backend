import { useContext, createContext, useState } from "react";

const DateContext = createContext()

const DateProvider = ({ children }) => {

    const [contextDate, setContextDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])
    return(
        <>
            <DateContext.Provider value={[contextDate, setContextDate]}>
                {children}
            </DateContext.Provider>
        </>
    )
}

const useDate = () => useContext(DateContext)

export { useDate, DateProvider }