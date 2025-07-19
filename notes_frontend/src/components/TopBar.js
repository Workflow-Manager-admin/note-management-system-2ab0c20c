import React from "react";
import "./TopBar.css";

// PUBLIC_INTERFACE
export default function TopBar({ onNew, rightContent }) {
  return (
    <header className="TopBar">
      <span className="TopBar__logo">
        <span className="TopBar__circle" />
        NotesApp
      </span>
      <button className="TopBar__add" onClick={onNew}>
        ＋ New Note
      </button>
      <div className="TopBar__right">{rightContent}</div>
    </header>
  );
}
