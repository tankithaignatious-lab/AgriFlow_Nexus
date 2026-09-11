const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const variants = {
    primary: 'button--primary',
    secondary: 'button--secondary',
    ghost: 'button--ghost',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
