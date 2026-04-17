import useAuth from "../../hooks/useAuth";
import { MapPin } from "lucide-react";
import colors from "../../constants/colors";

function GreetingBlock() {
  const { user } = useAuth();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">
        Привет, {user?.name || "друг"} 👋
      </h1>
      <p className="text-sm mt-1" style={{ color: colors.gray }}>
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} />
          Алматы
        </span>
      </p>
    </div>
  );
}

export default GreetingBlock;
