import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getMyAppointments } from "../../api/appointmentApi";
import { updateProfile } from "../../api/authApi";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [allCount, setAllCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const name = user?.name || "";
  const email = user?.email || "";
  const role = user?.role || "User";

  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  useEffect(() => {
    Promise.all([getMyAppointments("upcoming", 1), getMyAppointments("past", 1)])
      .then(([upRes, pastRes]) => {
        const upTotal = upRes.meta.total || upRes.data.length;
        const pastTotal = pastRes.meta.total || pastRes.data.length;
        setAllCount(upTotal + pastTotal);
        setCompletedCount(pastTotal);
      })
      .catch((e) => console.error(e));
  }, []);

  function handleEditOpen() {
    setEditName(name);
    setSaveError(null);
    setEditing(true);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      await updateProfile({ name: editName.trim() });
      await refreshUser();
      setEditing(false);
    } catch (e) {
      setSaveError(e?.response?.data?.message || "Could not save changes");
    } finally {
      setSaving(false);
    }
  }

  const menuItems = [
    { icon: "📅", label: "My bookings", onClick: () => navigate("/appointments") },
    { icon: "✂️", label: "Find a barbershop", onClick: () => navigate("/search") },
    { icon: "⭐", label: "My reviews", onClick: () => navigate("/my-reviews") },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px", padding: "32px 24px 48px" }}>
        <div
          className="grid items-start grid-cols-1 md:grid-cols-[280px_1fr]"
          style={{ gap: "24px" }}
        >
          <aside
            className="flex flex-col"
            style={{
              backgroundColor: "#000000",
              borderRadius: "16px",
              padding: "32px 24px 24px",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="flex items-center justify-center text-white"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#E94560",
                  fontSize: "38px",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                {initials}
              </div>
              <h1 className="text-white" style={{ fontSize: "20px", fontWeight: 700 }}>
                {name}
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", marginTop: "4px" }}>
                User
              </p>
            </div>

            <div style={{ height: "1px", backgroundColor: "#2a3a4a", margin: "24px 0" }} />

            <nav className="flex flex-col" style={{ gap: "4px" }}>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center justify-between transition-opacity hover:opacity-85"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "12px 4px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    className="flex items-center text-white"
                    style={{ gap: "12px", fontSize: "15px", fontWeight: 600 }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    {item.label}
                  </span>
                  <span style={{ color: "#A8B2C1", fontSize: "18px" }}>›</span>
                </button>
              ))}
            </nav>

            <div style={{ height: "1px", backgroundColor: "#2a3a4a", margin: "20px 0" }} />

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#E94560",
                fontSize: "15px",
                fontWeight: 600,
                gap: "10px",
                padding: "4px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>→</span>
              Log out
            </button>
          </aside>

          <div className="flex flex-col" style={{ gap: "20px" }}>
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}
            >
              <StatCard value={allCount} label="Total bookings" />
              <StatCard value={completedCount} label="Completed" />
            </div>

            <div
              style={{ backgroundColor: "#1E2A3A", borderRadius: "16px", padding: "24px" }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
                <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 700 }}>
                  My details
                </h2>
                {!editing && (
                  <button
                    type="button"
                    onClick={handleEditOpen}
                    style={{
                      background: "rgba(233,69,96,0.1)",
                      border: "1px solid rgba(233,69,96,0.25)",
                      color: "#E94560",
                      borderRadius: "8px",
                      padding: "6px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                <div>
                  <EditField label="Name" value={editName} onChange={setEditName} />
                  <InfoRow label="Email" value={email} />

                  {saveError && (
                    <p style={{ color: "#E94560", fontSize: "13px", marginTop: "8px" }}>{saveError}</p>
                  )}

                  <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      style={{
                        flex: 1,
                        backgroundColor: "#E94560",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "11px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.7 : 1,
                      }}
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      disabled={saving}
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        color: "#A8B2C1",
                        border: "1px solid #2a3a4a",
                        borderRadius: "10px",
                        padding: "11px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <InfoRow label="Name" value={name} />
                  <InfoRow label="Email" value={email} />
                  <InfoRow
                    label="Role"
                    value={
                      <span
                        style={{
                          backgroundColor: "rgba(233, 69, 96, 0.15)",
                          color: "#E94560",
                          borderRadius: "999px",
                          padding: "4px 14px",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {role}
                      </span>
                    }
                    isLast
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      className="text-center"
      style={{ backgroundColor: "#16213E", borderRadius: "14px", padding: "22px 16px" }}
    >
      <div className="text-white" style={{ fontSize: "30px", fontWeight: 700, lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ color: "#A8B2C1", fontSize: "13px", marginTop: "8px" }}>{label}</div>
    </div>
  );
}

function InfoRow({ label, value, isLast }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "14px 0",
        borderBottom: isLast ? "none" : "1px solid #2a3a4a",
      }}
    >
      <span style={{ color: "#A8B2C1", fontSize: "14px" }}>{label}</span>
      <span className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

function EditField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid #2a3a4a" }}>
      <label style={{ color: "#A8B2C1", fontSize: "12px", display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          backgroundColor: "#16213E",
          border: "1px solid #2a3a4a",
          borderRadius: "8px",
          padding: "9px 12px",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default ProfilePage;
