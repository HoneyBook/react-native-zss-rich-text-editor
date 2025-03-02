const fs = require('fs');
const path = require('path');

// Paths for the files
const editorHtmlPath = path.resolve(__dirname, '../src/editor.html');
const editorJsPath = path.resolve(__dirname, '../src/editor.js');

try {
  // Read the content of the editor.html file
  const htmlContent = fs.readFileSync(editorHtmlPath, 'utf8');

  // Encode the content to base64
  const base64Content = Buffer.from(htmlContent).toString('base64');

  // Create the editor.js content
  const jsContent = `// Auto-generated file. Do not edit directly.
export function getEditorHtml() {
  return atob('${base64Content}');
}
`;

  // Write the base64 content to editor.js
  fs.writeFileSync(editorJsPath, jsContent, 'utf8');

  console.log('Successfully encoded editor.html to base64 and updated editor.js');
} catch (error) {
  console.error('Error during postinstall:', error.message);
  process.exit(1);
}