import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

function GreetingBlock() {
  const { user } = useAuth();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">
        Привет, {user?.name || "друг"} 👋
      </h1>
      <p className="text-sm mt-1" style={{ color: colors.gray }}>
        📍 Алматы
      </p>
    </div>
  );
}

export default GreetingBlock;
