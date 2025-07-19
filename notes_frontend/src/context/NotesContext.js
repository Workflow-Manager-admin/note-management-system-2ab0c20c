import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

/** NOTE MODEL: 
 * {
 *   id: string,
 *   title: string,
 *   content: string,
 *   tags: array of strings,
 *   category: string,
 *   updatedAt: string,
 *   createdAt: string
 * }
 */

const NotesContext = createContext();

const sampleNotes = [
  {
    id: uuidv4(),
    title: "Welcome to NotesApp",
    content: "This is your first note. Use the + button to add more!",
    tags: ["welcome", "demo"],
    category: "Getting Started",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Minimal UI",
    content: "This app uses a modern, minimal, two-pane layout.",
    tags: ["ui", "layout"],
    category: "Design",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Reducer for notes CRUD and filtering
function notesReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "UPDATE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    case "SET_SELECTED":
      return { ...state, selectedId: action.payload.id };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: sampleNotes,
    selectedId: sampleNotes[0]?.id ?? null,
    filter: { search: "", category: "All", tag: "" },
  });

  // PUBLIC_INTERFACE
  function createNote(note) {
    const newNote = {
      ...note,
      id: uuidv4(),
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "CREATE", payload: newNote });
    selectNote(newNote.id);
  }

  // PUBLIC_INTERFACE
  function updateNote(updated) {
    updated.updatedAt = new Date().toISOString();
    dispatch({ type: "UPDATE", payload: updated });
  }

  // PUBLIC_INTERFACE
  function deleteNote(id) {
    dispatch({ type: "DELETE", payload: { id } });
    // select next note or null
    const next =
      state.notes.find((note) => note.id !== id) || null;
    selectNote(next ? next.id : null);
  }

  // PUBLIC_INTERFACE
  function selectNote(id) {
    dispatch({ type: "SET_SELECTED", payload: { id } });
  }

  // PUBLIC_INTERFACE
  function setFilter(newFilter) {
    dispatch({ type: "SET_FILTER", payload: { ...state.filter, ...newFilter } });
  }

  // PUBLIC_INTERFACE
  function filterAndSortNotes(notes, filter) {
    // search by title or content, filter by category/tag
    return notes
      .filter((note) => {
        let searchMatch =
          filter.search === "" ||
          note.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          note.content.toLowerCase().includes(filter.search.toLowerCase());
        let categoryMatch =
          filter.category === "All" ||
          note.category === filter.category;
        let tagMatch =
          !filter.tag ||
          note.tags.includes(filter.tag);
        return searchMatch && categoryMatch && tagMatch;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }

  // PUBLIC_INTERFACE
  function getCategories() {
    return [
      "All",
      ...Array.from(new Set(state.notes.map((n) => n.category).filter(Boolean))),
    ];
  }

  // PUBLIC_INTERFACE
  function getTags() {
    // All unique tags
    const tags = state.notes.flatMap((note) => note.tags);
    return Array.from(new Set(tags));
  }

  // PUBLIC_INTERFACE
  function value() {
    const filteredNotes = filterAndSortNotes(state.notes, state.filter);
    const selectedNote = state.notes.find(
      (note) => note.id === state.selectedId
    );
    return {
      notes: filteredNotes,
      allNotes: state.notes,
      selectedNote,
      categories: getCategories(),
      tags: getTags(),
      filter: state.filter,
      createNote,
      updateNote,
      deleteNote,
      selectNote,
      setFilter,
    };
  }

  return (
    <NotesContext.Provider value={value()}>{children}</NotesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within a NotesProvider");
  return ctx;
}
