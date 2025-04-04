import { createContext, useState, ReactNode, useContext } from "react";

interface FlagFilterContextType {
  statusFlag: boolean;
  changeStatusFlagFilter: () => void;
}

export const flagFilterContext = createContext<FlagFilterContextType>({
  statusFlag: false,
  changeStatusFlagFilter: () => { }
});

interface FlagFilterProviderProps {
  children: ReactNode;
}

const FlagFilterProvider: React.FC<FlagFilterProviderProps> = ({ children }) => {
  const [statusFlag, setSatusFlag] = useState(false);

  const changeStatusFlagFilter = () => {
    setSatusFlag(!statusFlag);
  };

  return (
    <flagFilterContext.Provider value={{ statusFlag, changeStatusFlagFilter }}>
      {children}
    </flagFilterContext.Provider>
  );
};

export default FlagFilterProvider;

export const useFlagFilter = () => {
  const context = useContext(flagFilterContext);
  if (!context) {
    throw new Error("useFlagFilter must be used within a DarkModeProvider");
  }
  return context;
};