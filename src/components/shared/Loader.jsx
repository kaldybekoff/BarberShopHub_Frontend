import colors from "../../constants/colors";

function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: `${colors.accent} transparent transparent transparent` }}
      />
    </div>
  );
}

export default Loader;
