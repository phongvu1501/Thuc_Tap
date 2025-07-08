import { useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
      {theme === 'light' ? '🌞 Sáng' : '🌙 Tối'}
    </button>
  );
}
