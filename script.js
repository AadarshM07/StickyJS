// Get references to our HTML elements.
const notesContainer = document.getElementById("notes-container");
const addNoteBtn = document.getElementById("add-note-btn");
const noteInput = document.getElementById("note-input");

// --- Functions ---

// Gets all notes from local storage.
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Saves an array of notes to local storage.
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Renders all notes to the page.
function displayNotes() {
    const notes = getNotes();
    notesContainer.innerHTML = ""; // Clear the container before adding new notes

    notes.forEach(note => {
        // Create the main div for the note
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");

        // Create a separate element for the text content
        const contentElement = document.createElement("span");
        contentElement.textContent = note.content;
        
        // Add the content element to the note
        noteElement.appendChild(contentElement);

        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "×";
        
        // Add a click listener to the delete button
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this note?")) {
                deleteNote(note.id);
            }
        });

        // Add the delete button to the note element
        noteElement.appendChild(deleteBtn);
        
        // Add the completed note element to the main container
        notesContainer.appendChild(noteElement);
    });
}

// Deletes a note by its ID.
function deleteNote(id) {
    let notes = getNotes();
    // Create a new array, keeping only the notes that DON'T match the id
    const newNotes = notes.filter(note => note.id != id);
    saveNotes(newNotes);
    displayNotes(); // Re-render the notes on the screen
}

// --- Event Listener for Adding a Note ---

addNoteBtn.addEventListener("click", () => {
    const content = noteInput.value.trim();

    if (!content) {
        return; // If input is empty, do nothing
    }

    const notes = getNotes();
    const newNote = {
        id: new Date().getTime(), // Use timestamp for a unique ID
        content: content
    };

    notes.push(newNote);
    saveNotes(notes);
    displayNotes(); // Update the display
    noteInput.value = ""; // Clear the input box
});

// --- Initial Load ---

// Show any saved notes when the page first loads.
displayNotes();