import colors from "../../styles/colors";

function EmptyState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      {icon && <span className="text-4xl">{icon}</span>}
      <p className="text-sm font-medium" style={{ color: colors.gray }}>
        {message}
      </p>
    </div>
  );
}

export default EmptyState;
