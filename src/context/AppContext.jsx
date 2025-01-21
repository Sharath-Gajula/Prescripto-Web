import { createContext } from "react";
import { doctors } from "../assets/assets"; // Ensure this path is correct

// Create the context
export const AppContext = createContext({
    doctors: [], // Default value for doctors if it's not loaded yet
});

const AppContextProvider = (props) => {
    
    // use this var in this any file
    const currencySymbol = '$';

    const value = {
        doctors, // You can add more state or methods here as needed
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* This will ensure that any components wrapped by this provider will have access to the context */}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
