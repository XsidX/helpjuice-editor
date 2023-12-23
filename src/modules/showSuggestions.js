import { getEditorPosition } from './helpers.js';

// Show suggestions filtered by the keyword
export default function showSuggestions(editor, suggestions, keyword) {
  const classes = 'px-2 cursor-default';
  suggestions.innerHTML = `
      <li class='${classes} font-bold'>Add blocks</span></li>
      <li class='${classes} text-gray-500/75'>Keep trying to filter, or escape to exit</li>
      <li class='${classes} py-2 text-gray-700'>Filtering keyword <span class='bg-blue-600 p-1 rounded text-white'>${keyword}</span></li>    
    `;

  const suggestionOptions = [
    { key: 'h1', title: 'Heading 1', shortcut: '# + space' },
    { key: 'eh1', title: 'Expandable Heading 1', shortcut: '>># + space' },
  ];

  // Filter suggestion options based on the keyword
  const filteredSuggestions = suggestionOptions.filter((option) => option.key.includes(keyword));

  // Add filtered suggestion items to the suggestions element
  filteredSuggestions.forEach((suggestion) => {
    // Create an li element
    const suggestionItem = document.createElement('li');
    suggestionItem.className = 'p-2 hover:bg-gray-500/10 cursor-pointer';
    suggestionItem.dataset.key = suggestion.key;
    suggestionItem.dataset.title = suggestion.title;
    suggestionItem.innerHTML = `
        <span class='flex gap-2 items-center'>
        <svg stroke="#6b7280" fill="#6b7280" stroke-width="0" viewBox="0 0 256 256" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z"></path></svg>
        <span class='flex flex-col'>
        <span class='font-bold'>${suggestion.title}</span>
        <span class='text-gray-500/75 text-sm'>Shortcut type ${suggestion.shortcut}</span>
        </span>
        </span>
        `;

    // Append the new item to the suggestions list
    suggestions.appendChild(suggestionItem);
  });

  // Calculate editor position and set suggestions list position
  const editorPosition = getEditorPosition(editor);
  suggestions.style.position = 'absolute';
  suggestions.style.top = `${editorPosition.top}px`;
  suggestions.style.left = `${editorPosition.left}px`;
  suggestions.style.zIndex = 1000; // Make sure suggestions are above other elements

  suggestions.classList.remove('hidden');
}