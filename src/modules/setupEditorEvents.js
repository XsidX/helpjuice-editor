import convertToHeader from './convertToHeader.js';
import showSuggestions from './showSuggestions.js';
import { createSuggestionsList, hideSuggestions, isVisible } from './helpers.js';

export default function setUpEditorEvents(editor) {
  const editorContainer = document.getElementById('editor-container');
  // Create and fetch the suggestions list for this editor
  const suggestions = createSuggestionsList(editor);

  editor.addEventListener('focus', () => {
    if (editor.textContent === '') {
      editor.dataset.placeholder = 'Type / for blocks';
    }
  });

  editor.addEventListener('input', (event) => {
    const currentInput = event.target.textContent;
    const lastSlashIndex = currentInput.lastIndexOf('/');

    // Check if the current input contains a '/'
    if (lastSlashIndex >= 0) {
      const keyword = currentInput.slice(lastSlashIndex + 1).trim();

      // Check if there is a keyword after '/'
      if (keyword.length > 0) {
        showSuggestions(editor, suggestions, keyword);
      } else {
        hideSuggestions(suggestions);
      }
    } else {
      hideSuggestions(suggestions);
    }
  });

  // Keydown event listener
  editor.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter') && isVisible(suggestions)) {
      event.preventDefault();
      // Find the first suggestion li element with data attributes
      const firstSuggestionItem = suggestions.querySelector('li[data-key]');
      if (firstSuggestionItem) {
        const { key, title } = firstSuggestionItem.dataset;
        convertToHeader(editor, key, title);
        hideSuggestions(suggestions);
      }
    }
  });

  // Click event on suggestions
  suggestions.addEventListener('click', (event) => {
    const suggestionItem = event.target.closest('li[data-key]');
    if (suggestionItem) {
      const { key, title } = suggestionItem.dataset;
      convertToHeader(editor, key, title);
      hideSuggestions(suggestions);
    }
  });

  // Escape key to hide suggestions
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideSuggestions(suggestions);
    }
  });

  // click outside to hide suggestions
  document.addEventListener('click', (event) => {
    if (!editor.contains(event.target)) {
      hideSuggestions(suggestions);
    }
  });

  // backspace to remove the editor if it's empty and not the only editor
  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && editor.textContent === '' && editorContainer.children.length > 3) {
      event.preventDefault();
      editorContainer.removeChild(editor);
    }
  });
}