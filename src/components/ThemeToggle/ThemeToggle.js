import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
    </ThemeToggler>
  )
}

export default ThemeToggle
