const notesContainer = document.querySelector(".notes");
const addNote = document.querySelector(".addNote");

// get notes from local storage
if (localStorage.getItem("notes")) {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  lsNotes.forEach((note) => {
    addNewNote(note);
  });
}

addNote.addEventListener("click", () => {
  addNewNote();
});

// create new note
function addNewNote(content) {
  const note = document.createElement("div");
  const textArea = document.createElement("textarea");
  const noteBody = document.createElement("div");
  const noteTools = document.createElement("div");
  note.classList.add("note");
  noteBody.classList.add("noteBody");

  if (content) {
    textArea.classList.add("hide");
  } else {
    noteBody.classList.add("hide");
  }

  const noteBodyText = document.createTextNode(content);
  noteBody.append(noteBodyText);

  noteTools.classList.add("tools");
  noteTools.innerHTML = `
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>
    `;
  note.append(textArea);
  note.append(noteBody);
  note.append(noteTools);
  notesContainer.append(note);

  editeNote();
  deleteNote();
}

// edite note
function editeNote() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    const edit = note.querySelector(".tools .fa-pen-to-square");
    const textArea = note.querySelector("textarea");
    const noteBody = note.querySelector(".noteBody");

    edit.addEventListener("click", () => {
      noteBody.classList.toggle("hide");
      textArea.classList.toggle("hide");
      textArea.focus();
      noteBody.innerHTML = textArea.value;
      saveNoteToLS();
      deleteNote();
    });
  });
}
editeNote();

// delete note
function deleteNote() {
  const notes = document.querySelectorAll(".note");
  let localStorageNotes = [...JSON.parse(localStorage.getItem("notes"))];

  notes.forEach((note) => {
    const removeNote = note.querySelector(".tools .fa-trash");
    const noteBody = note.querySelector(".noteBody").innerHTML;

    removeNote.addEventListener("click", () => {
      localStorageNotes.splice(localStorageNotes.indexOf(noteBody), 1);
      localStorage.setItem("notes", JSON.stringify(localStorageNotes));
      note.remove();
    });
  });
}
deleteNote();

// save notes to local storage

function saveNoteToLS() {
  const localStorageNotes = [];
  const notes = document.querySelectorAll(".note .noteBody");
  notes.forEach((note) => {
    if (note.innerHTML === "") return;
    localStorageNotes.push(note.innerHTML);
  });
  localStorage.setItem("notes", JSON.stringify(localStorageNotes));
}
