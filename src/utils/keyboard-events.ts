export const handleKeyboardEvents = (
  event: KeyboardEvent,
  onEnter: () => void,
  onEscape: () => void,
  onInput: (char: string) => void,
  handleDeleteChar: () => void,
) => {
  // не работает с регуляркой
  const allowedKeys = '0123456789+-*/%.';
  if (event.key === 'Enter') {
    onEnter();
  } else if (event.key === 'Escape') {
    onEscape();
  } else if (allowedKeys.includes(event.key)) {
    event.preventDefault();
    onInput(event.key);
  } else if (event.key === 'Backspace') {
    handleDeleteChar();
  }
};
