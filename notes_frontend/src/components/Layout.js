import React from "react";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";
import "./Layout.css";

// PUBLIC_INTERFACE
export default function Layout({ categories, tags, selectedCategory, selectedTag, onCategorySelect, onTagSelect, onNewNote, children }) {
  return (
    <div className="Layout">
      <TopBar onNew={onNewNote} />
      <div className="Layout__body">
        <SideMenu
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          onCategorySelect={onCategorySelect}
          onTagSelect={onTagSelect}
        />
        <main className="Layout__main">{children}</main>
      </div>
    </div>
  );
}
