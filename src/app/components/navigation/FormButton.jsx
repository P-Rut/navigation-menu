export default function FormButton({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  additionalStyle,
}) {
  const baseStyles = "text-sm font-medium px-4 py-2 transition "

  const variants = {
    primary: "text-white bg-purple-600 hover:bg-purple-700 ",
    secondary: "text-gray-600 hover:bg-gray-100 ",
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${additionalStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
