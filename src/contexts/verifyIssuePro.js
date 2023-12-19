import { createContext, useContext, useState } from "react";

const VerifyIssueProContext = createContext();

export function VerifyIssueProProvider({ children }) {
  const [status, setstatus] = useState("abc");

  const setStatusValue = (value) => {
    setstatus(value);
  };

  return (
    <VerifyIssueProContext.Provider
      value={{
        status,
        setStatusValue,
      }}
    >
      {children}
    </VerifyIssueProContext.Provider>
  );
}

export function UseVerifyIssueProContext() {
  return useContext(VerifyIssueProContext);
}
