import React, { useState, useEffect } from "react";
import "./App.css";
import { NotesProvider, useNotes } from "./context/NotesContext";
import Layout from "./components/Layout";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";

function TwoPaneNotesApp() {
  const {
    notes,
    selectedNote,
    categories,
    tags,
    filter,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    setFilter,
  } = useNotes();

  const [isCreating, setIsCreating] = useState(false);

  // PUBLIC_INTERFACE
  function handleCreate() {
    setIsCreating(true);
    selectNote(null);
  }

  // PUBLIC_INTERFACE
  function handleSave(note) {
    if (isCreating) {
      createNote(note);
    } else if (selectedNote) {
      updateNote({ ...selectedNote, ...note });
    }
    setIsCreating(false);
  }

  // PUBLIC_INTERFACE
  function handleDelete(id) {
    deleteNote(id);
    setIsCreating(false);
  }

  // PUBLIC_INTERFACE
  function handleCancel() {
    setIsCreating(false);
    if (notes.length > 0 && !selectedNote) {
      selectNote(notes[0].id);
    }
  }

  // PUBLIC_INTERFACE
  function handleSelect(id) {
    selectNote(id);
    setIsCreating(false);
  }

  // PUBLIC_INTERFACE
  function handleCategory(cat) {
    setFilter({ category: cat, tag: "" });
  }

  // PUBLIC_INTERFACE
  function handleTag(tag) {
    setFilter({ tag });
  }

  // PUBLIC_INTERFACE
  function handleSearch(str) {
    setFilter({ search: str });
  }

  return (
    <Layout
      categories={categories}
      tags={tags}
      selectedCategory={filter.category}
      selectedTag={filter.tag}
      onCategorySelect={handleCategory}
      onTagSelect={handleTag}
      onNewNote={handleCreate}
    >
      <div style={{ display: "flex", minHeight: "100%" }}>
        <NotesList
          notes={notes}
          onSelect={handleSelect}
          selectedId={isCreating ? null : selectedNote?.id}
          search={filter.search}
          onSearch={handleSearch}
        />
        <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
          {(isCreating || !selectedNote) ? (
            <NoteEditor
              key="new"
              note={{ title: "", content: "", category: "", tags: [] }}
              mode="create"
              onSave={handleSave}
              onDelete={handleCancel}
              categories={categories}
              allTags={tags}
            />
          ) : (
            <NoteEditor
              key={selectedNote?.id}
              note={selectedNote}
              mode="view"
              onSave={handleSave}
              onDelete={handleDelete}
              categories={categories}
              allTags={tags}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Always light theme as specified, but left option here for extension
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);
  return (
    <div data-theme="light" style={{ minHeight: "100vh", background: "var(--bg, #fff)" }}>
      <NotesProvider>
        <TwoPaneNotesApp />
      </NotesProvider>
    </div>
  );
}

export default App;
