import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  employeeId: string;
  setEmployeeId: (id: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  userPoints: number;
  setUserPoints: (points: number | ((prev: number) => number)) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [employeeId, setEmployeeId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(120);

  return (
    <AppContext.Provider
      value={{
        employeeId,
        setEmployeeId,
        userName,
        setUserName,
        userPoints,
        setUserPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
