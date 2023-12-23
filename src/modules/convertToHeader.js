export default function convertToHeader(editor, key, title) {
  // Determine the style and placeholder based on the key
  const classes = 'text-2xl font-bold text-black';
  let elementTag = 'h1';
  switch (key) {
    case 'h1':
      elementTag = 'h1';
      break;
    case 'eh1':
      elementTag = 'h1';
      break;
    default:
      elementTag = 'h1';
  }

  // Check if the editor only contains '/1'
  if (editor.innerText.trim().match(/\/1\s*$/)) {
    // Clear out the '/1' command text
    const currentInput = editor.innerText.trim().replace(/\/1\s*$/, '');
    editor.innerHTML = `
      <div class="group text-gray-500/75 -ml-8">
        <div class="relative mx-8">
        <svg class='hidden group-hover:block absolute -left-8' stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z"></path></svg>
        <${elementTag} class="${classes}" contenteditable="true" data-placeholder="${title}">${currentInput}</${elementTag}>
        </div>
        </div>
      `;
  } else {
    // Preserve the other text that may be present
    const currentInput = editor.innerText.trim();
    editor.innerHTML = `<${elementTag} class="${classes}">${currentInput}</${elementTag}>`;
  }

  // Focus the new heading element to allow the user to start typing
  const headingElement = editor.querySelector(elementTag);
  headingElement.focus();

  // Event listener to clear the placeholder when typing begins
  headingElement.addEventListener('input', () => {
    if (headingElement.getAttribute('data-placeholder')) {
      headingElement.removeAttribute('data-placeholder');
    }
  }, { once: true }); // Run only once per heading insertion
}