import colors from "../../constants/colors";

function Input({ label, value, onChange, placeholder, type = "text", error }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: colors.gray }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
        style={{
          backgroundColor: colors.light,
          border: `1px solid ${error ? colors.accent : colors.dark}`,
          color: "#ffffff",
        }}
      />
      {error && (
        <span className="text-xs" style={{ color: colors.accent }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
