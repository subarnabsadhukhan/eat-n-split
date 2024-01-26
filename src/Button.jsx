function Button({ children, onButtonClick }) {
  return (
    <button onClick={onButtonClick} className="button">
      {children}
    </button>
  );
}

export default Button;
