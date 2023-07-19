// Wrap Text Plugin

(() => {
  const wrapText = (text, maxLength) => {
    const words = text.split(' ');
    let wrappedText = '';
    let currentLine = '';
    for (const word of words) {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        wrappedText += (wrappedText ? '\n' : '') + currentLine;
        currentLine = word;
      }
    }
    wrappedText += (wrappedText ? '\n' : '') + currentLine;
    return wrappedText;
  };

  // Define the wrapText function globally
  window.wrapText = wrapText;
})();
