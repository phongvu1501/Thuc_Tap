export default function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-secondary">
      Switch to {theme === 'light' ? 'Dark' : 'Light'} mode
    </button>
  );
}
