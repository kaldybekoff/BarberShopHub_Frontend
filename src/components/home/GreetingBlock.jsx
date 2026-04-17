import useAuth from "../../hooks/useAuth";

function GreetingBlock() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Artyom";

  return (
    <div className="px-6 py-3">
      <p className="text-sm font-medium" style={{ color: "#A8B2C1" }}>
        📍 Алматы, Медеуский р-н
      </p>
      <h1 className="mt-2 text-[2rem] font-bold leading-tight text-white">
        Привет, {firstName} 👋
      </h1>
    </div>
  );
}

export default GreetingBlock;
