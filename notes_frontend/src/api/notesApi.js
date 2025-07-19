const MOCK_DELAY = 250;

// In absence of real backend, these stubs pretend to call API using process.env.REACT_APP_API_URL
// Replace these with real API calls for integration

let notesDB = [
  {
    id: "1",
    title: "API Example Note",
    content: "This note lives in the mock API.",
    tags: ["demo"],
    category: "API",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// PUBLIC_INTERFACE
export async function fetchNotes() {
  // Simulate GET /notes
  await delay();
  return notesDB.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

// PUBLIC_INTERFACE
export async function fetchNote(id) {
  await delay();
  return notesDB.find((n) => n.id === id) || null;
}

// PUBLIC_INTERFACE
export async function createNote(note) {
  await delay();
  const newNote = {
    ...note,
    id: String(Math.floor(Math.random() * 1000000)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notesDB = [newNote, ...notesDB];
  return newNote;
}

// PUBLIC_INTERFACE
export async function updateNote(note) {
  await delay();
  notesDB = notesDB.map((n) => (n.id === note.id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n));
  return notesDB.find((n) => n.id === note.id);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  await delay();
  notesDB = notesDB.filter((n) => n.id !== id);
  return true;
}

// PUBLIC_INTERFACE
export async function searchNotes({ search = "", category = "All", tag = "" } = {}) {
  await delay();
  return notesDB.filter(note => {
    let matchSearch = !search || note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase());
    let matchCategory = category === "All" || note.category === category;
    let matchTag = !tag || (note.tags && note.tags.includes(tag));
    return matchSearch && matchCategory && matchTag;
  });
}

async function delay(ms = MOCK_DELAY) {
  return new Promise((res) => setTimeout(res, ms));
}
