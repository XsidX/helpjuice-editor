import setUpEditorEvents from './modules/setupEditorEvents.js';
import './style.css';

// editor.js
document.addEventListener('DOMContentLoaded', () => {
  const editorContainer = document.getElementById('editor-container');

  // Create a new editor instance
  function createNewEditor() {
    const uniqueId = `editor-${Date.now()}`;
    const editor = document.createElement('div');
    editor.dataset.placeholder = 'Type / for blocks';
    editor.focus();
    editor.id = uniqueId;
    editor.contentEditable = 'true';
    editor.className = 'focus:outline-none';

    setUpEditorEvents(editor);
    editorContainer.appendChild(editor);
    return editor;
  }

  // Listen for clicks in the editor container to add new editor instances
  editorContainer.addEventListener('click', (event) => {
    if (event.target === editorContainer) {
      const newEditor = createNewEditor();
      newEditor.focus();
    }
  });

  // Initialize with one editor instance on load
  createNewEditor();
});