import React from "react";
import "./NotesList.css";

// PUBLIC_INTERFACE
export default function NotesList({ notes, onSelect, selectedId, search, onSearch, loading }) {
  return (
    <section className="NotesList">
      <form
        className="NotesList__searchbar"
        onSubmit={e => { e.preventDefault(); }}
        autoComplete="off"
      >
        <input
          type="search"
          className="NotesList__search"
          placeholder="Search notes..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </form>
      <div className="NotesList__list">
        {loading && <div className="NotesList__empty">Loading...</div>}
        {!loading && notes.length === 0 && (
          <div className="NotesList__empty">No notes found.</div>
        )}
        {notes.map(note => (
          <button
            className={`NotesList__item${note.id === selectedId ? " selected" : ""}`}
            key={note.id}
            onClick={() => onSelect(note.id)}
            tabIndex={0}
          >
            <div className="NotesList__item-title">{note.title}</div>
            <div className="NotesList__item-category">{note.category}</div>
            <div className="NotesList__item-date">
              {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ""}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
