import { createContext, useState, ReactNode, useContext } from "react";

interface DarkModeContextType {
  statusMode: boolean;
  changeStatusDarkmode: () => void;
}

export const darkModeContext = createContext<DarkModeContextType>({
  statusMode: false,
  changeStatusDarkmode: () => { }
});

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [statusMode, setStatusMode] = useState(false);

  const changeStatusDarkmode = () => {
    setStatusMode(!statusMode);
  };

  return (
    <darkModeContext.Provider value={{ statusMode, changeStatusDarkmode }}>
      {children}
    </darkModeContext.Provider>
  );
};

export default DarkModeProvider;

export const useDarkMode = () => {
  const context = useContext(darkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};