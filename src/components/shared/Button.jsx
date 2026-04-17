import colors from "../../constants/colors";

const variantStyles = {
  primary: {
    backgroundColor: colors.accent,
    color: "#ffffff",
    border: "none",
  },
  secondary: {
    backgroundColor: "transparent",
    color: colors.accent,
    border: `1.5px solid ${colors.accent}`,
  },
  danger: {
    backgroundColor: `${colors.accent}20`,
    color: colors.accent,
    border: "none",
  },
  success: {
    backgroundColor: colors.success,
    color: "#ffffff",
    border: "none",
  },
};

function Button({ label, onClick, variant = "primary", disabled = false, fullWidth = false }) {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-5 rounded-xl text-sm font-semibold transition-opacity ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      style={styles}
    >
      {label}
    </button>
  );
}

export default Button;
