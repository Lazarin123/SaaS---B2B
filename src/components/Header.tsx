import React from 'react';
import { Sun, Moon, Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenNewOS: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, theme, toggleTheme, onOpenNewOS }) => {
  return (
    <header className="header no-print">
      <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{title}</h2>
      <div className="header__actions">
        <button className="btn btn--outline" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button className="btn btn--primary" onClick={onOpenNewOS}>
          <Plus size={18} /> Nova O.S.
        </button>
      </div>
    </header>
  );
};
