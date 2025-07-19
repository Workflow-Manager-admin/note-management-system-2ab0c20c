import React, { useState, useEffect } from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
export default function NoteEditor({
  note,
  onSave,
  onDelete,
  mode, // "view" | "edit" | "create"
  categories,
  allTags,
}) {
  const [editNote, setEditNote] = useState(
    note || { title: "", content: "", category: "", tags: [] }
  );
  const [isEditing, setIsEditing] = useState(mode !== "view");

  useEffect(() => {
    setEditNote(note || { title: "", content: "", category: "", tags: [] });
    setIsEditing(mode !== "view");
  }, [note, mode]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditNote((prev) => ({ ...prev, [name]: value }));
  }
  function handleTagChange(tag) {
    setEditNote((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }
  function handleSave() {
    if (editNote.title.trim() === "") return;
    onSave({ ...editNote });
    setIsEditing(false);
  }
  function handleEdit() {
    setIsEditing(true);
  }
  function handleCancel() {
    if (mode === "create") {
      setEditNote({ title: "", content: "", category: "", tags: [] });
    } else {
      setEditNote(note);
      setIsEditing(false);
    }
  }

  return (
    <section className="NoteEditor">
      {mode !== "create" && !isEditing && (
        <div className="NoteEditor__actions">
          <button
            className="NoteEditor__edit"
            onClick={handleEdit}
            tabIndex={0}
          >
            Edit
          </button>
          <button
            className="NoteEditor__delete"
            onClick={() => window.confirm("Delete note?") && onDelete(note.id)}
            tabIndex={0}
          >
            Delete
          </button>
        </div>
      )}
      <div className="NoteEditor__form">
        <input
          name="title"
          className="NoteEditor__title"
          type="text"
          placeholder="Note title"
          value={editNote.title}
          onChange={handleChange}
          disabled={!isEditing}
          maxLength={80}
          required
        />
        <textarea
          name="content"
          className="NoteEditor__content"
          placeholder="Start writing your note..."
          value={editNote.content}
          onChange={handleChange}
          disabled={!isEditing}
          rows={8}
        />
        <div className="NoteEditor__row">
          <select
            name="category"
            className="NoteEditor__category"
            value={editNote.category || ""}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select category</option>
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
          </select>
          <div className="NoteEditor__tags">
            {allTags.length === 0 && <span className="NoteEditor__tag empty">(no tags)</span>}
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`NoteEditor__tag${editNote.tags && editNote.tags.includes(tag) ? " selected" : ""}`}
                onClick={() => isEditing && handleTagChange(tag)}
                disabled={!isEditing}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="NoteEditor__actions --footer">
          <button className="NoteEditor__save" onClick={handleSave} tabIndex={0}>
            Save
          </button>
          <button className="NoteEditor__cancel" onClick={handleCancel} tabIndex={0}>
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}
