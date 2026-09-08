function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        variant === "secondary"
          ? "secondary-button"
          : "primary-button"
      }
    >
      {children}
    </button>
  );
}

export default Button;