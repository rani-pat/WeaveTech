import { createContext, useContext, useState } from "react";

const ReceiptProContext = createContext();

export function ReceiptProProvider({ children }) {
  const [status, setstatus] = useState("abc");

  const setStatusValue = (value) => {
    setstatus(value);
  };

  return (
    <ReceiptProContext.Provider
      value={{
        status,
        setStatusValue,
      }}
    >
      {children}
    </ReceiptProContext.Provider>
  );
}

export function UseReceiptProContext() {
  return useContext(ReceiptProContext);
}
