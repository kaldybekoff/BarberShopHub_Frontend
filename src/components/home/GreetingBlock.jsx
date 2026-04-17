import useAuth from "../../hooks/useAuth";

function GreetingBlock() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Artyom";

  return (
    <div>
      <p style={{ color: "#A8B2C1", fontSize: "13px", marginBottom: "8px" }}>
        📍 Алматы, Медеуский р-н
      </p>
      <h1
        className="text-white"
        style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px" }}
      >
        Привет, {firstName} 👋
      </h1>
    </div>
  );
}

export default GreetingBlock;
