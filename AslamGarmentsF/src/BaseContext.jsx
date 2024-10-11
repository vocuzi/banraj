// AppContext.js
import React, { createContext } from 'react';

const BaseContext = createContext();

const BaseProvider = ({ children }) => {
    const ip = `127.0.0.1`;
    const BaseUrl = `http://${ip}:8000/`;

    return (
        <BaseContext.Provider value={{ BaseUrl }}>
            {children}
        </BaseContext.Provider>
    );
};

export { BaseContext, BaseProvider };
