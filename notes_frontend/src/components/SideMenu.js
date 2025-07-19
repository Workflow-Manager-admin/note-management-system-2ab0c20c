import React from "react";
import "./SideMenu.css";

// PUBLIC_INTERFACE
export default function SideMenu({ categories, tags, selectedCategory, selectedTag, onCategorySelect, onTagSelect }) {
  return (
    <aside className="SideMenu">
      <div className="side-section">
        <div className="side-title">Categories</div>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`side-item${cat === selectedCategory ? " selected" : ""}`}
            onClick={() => onCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="side-section" style={{ marginTop: 24 }}>
        <div className="side-title">Tags</div>
        {tags.length === 0 && <span className="side-item empty">(no tags)</span>}
        {tags.map((tag) => (
          <button
            key={tag}
            className={`side-item${tag === selectedTag ? " selected" : ""}`}
            onClick={() => onTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}
        {selectedTag && (
          <button className="side-item clear" onClick={() => onTagSelect("")}>
            Clear Tag
          </button>
        )}
      </div>
    </aside>
  );
}
