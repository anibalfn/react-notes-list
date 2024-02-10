import logo from "./assets/logo-nlw.svg";
import { NoteCard } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";
import { useState } from "react";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      JSON.parse(notesOnStorage)
    }

    return []
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArr = [newNote, ...notes];

    setNotes(notesArr);

    localStorage.setItem('notes', JSON.stringify(notesArr))
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo" />

      <form className="m-full">
        <input
          type="text"
          placeholder="Search in your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        {/* <div className="rounded-md bg-slate-700 p-5 space-y-3">
          <span className="text-sm font-medium text-slate-200">Add note</span>
          <p className="text-sm leading-6 text-slate-400">Record a note with audio and it will be converted to text automatically</p>
        </div> */}
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {notes.map((note: { date: Date; content: string }) => {
          return <NoteCard note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
}
