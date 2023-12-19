import { createContext, useContext, useState } from "react";

const CreateProContext = createContext();

export function CreateProProvider({ children }) {
  const [status, setstatus] = useState("abc");

  const setStatusValue = (value) => {
    setstatus(value);
  };

  return (
    <CreateProContext.Provider
      value={{
        status,
        setStatusValue,
      }}
    >
      {children}
    </CreateProContext.Provider>
  );
}

export function UseCreateProContext() {
  return useContext(CreateProContext);
}
