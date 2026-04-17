import colors from "../../constants/colors";

function SectionTitle({ title, subtitle, compact = false }) {
  return (
    <div className={compact ? "" : "mb-6"}>
      <h1 className="text-white text-2xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
