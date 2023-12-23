import React, { createContext, useContext, useRef, useState } from "react";
import { useScreenSize } from "../utils/media-query";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const notifyDropdownRef = useRef(null);
  const { isLarge } = useScreenSize();

  const [isNotifyDropdownOpen, setisNotifyDropdownOpen] = useState(false);
  const [isTreeviewOpen, setisTreeviewOpen] = useState(isLarge ? true : false);

  const toggleNotifyDropdown = () => {
    setisNotifyDropdownOpen(!isNotifyDropdownOpen);
  };

  const toggleTreeview = () => {
    setisTreeviewOpen(!isTreeviewOpen);
  };

  return (
    <HeaderContext.Provider
      value={{
        notifyDropdownRef,
        isNotifyDropdownOpen,
        toggleNotifyDropdown,
        setisNotifyDropdownOpen,
        isTreeviewOpen,
        toggleTreeview,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function UseHeaderContext() {
  return useContext(HeaderContext);
}
