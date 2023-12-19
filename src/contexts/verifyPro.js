import { createContext, useContext, useState } from "react";

const VerifyProContext = createContext();

export function VerifyProProvider({ children }) {
  const [status, setstatus] = useState("abc");

  const setStatusValue = (value) => {
    setstatus(value);
  };

  return (
    <VerifyProContext.Provider
      value={{
        status,
        setStatusValue,
      }}
    >
      {children}
    </VerifyProContext.Provider>
  );
}

export function UseVerifyProContext() {
  return useContext(VerifyProContext);
}
