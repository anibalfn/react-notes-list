import logo from "./assets/logo-nlw.svg";
import { NoteCard } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";
import { ChangeEvent, useState } from "react";

interface Note {
  id: string;
  date: Date;
  content: string;
  onNoteDeleted: (id: string) => void;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };
    const notesArr = [newNote, ...notes];
    setNotes(notesArr);
    localStorage.setItem("notes", JSON.stringify(notesArr));

    
  }

  function onNoteDeleted(id: string) {
    const notesArr = notes.filter(note =>{
      return note.id !== id
    })

    setNotes(notesArr)
    localStorage.setItem("notes", JSON.stringify(notesArr));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0">
      <img src={logo} alt="logo" />

      <form className="m-full">
        <input
          type="text"
          placeholder="Search in your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(
          (note: { id: string; date: Date; content: string }) => {
            return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />;
          }
        )}
      </div>
    </div>
  );
}
