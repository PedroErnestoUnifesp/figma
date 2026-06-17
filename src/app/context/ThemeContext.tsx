import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  updateUserName: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  userName: 'Usuário',
  updateUserName: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  
  const [userName, setUserName] = useState(() => {
    try {
      const saved = localStorage.getItem('user_name');
      return saved || 'Usuário';
    } catch {
      return 'Usuário';
    }
  });

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const updateUserName = (name: string) => {
    setUserName(name);
    try {
      localStorage.setItem('user_name', name);
    } catch (e) {
      console.error('Error saving user name:', e);
    }
  };

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Error updating document class:', e);
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, userName, updateUserName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
