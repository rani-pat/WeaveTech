import { createContext, useContext, useState } from "react";

const IssueProContext = createContext();

export function IssueProProvider({ children }) {
  const [status, setstatus] = useState("abc");

  const setStatusValue = (value) => {
    setstatus(value);
  };

  return (
    <IssueProContext.Provider
      value={{
        status,
        setStatusValue,
      }}
    >
      {children}
    </IssueProContext.Provider>
  );
}

export function UseIssueProContext() {
  return useContext(IssueProContext);
}
