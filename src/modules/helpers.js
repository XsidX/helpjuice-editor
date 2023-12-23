// Function to get the position of the editor
export function getEditorPosition(editor) {
  const editorRect = editor.getBoundingClientRect();
  return {
    top: editorRect.bottom + window.scrollY,
    left: editorRect.left + window.scrollX,
  };
}

export function createSuggestionsList(editor) {
  const editorContainer = document.getElementById('editor-container');
  const suggestions = document.createElement('ul');
  suggestions.id = `${editor.id}-suggestions`;
  suggestions.className = 'hidden pb-12 list-none bg-white border-t border-gray-200 rounded-md shadow-md mt-1 text-left w-1/3 overflow-hidden';
  editorContainer.appendChild(suggestions);

  return suggestions;
}

export function hideSuggestions(suggestions) {
  suggestions.classList.add('hidden');
}

export function isVisible(suggestions) {
  return !suggestions.classList.contains('hidden');
}