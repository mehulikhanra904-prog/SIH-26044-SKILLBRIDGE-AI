import { useAuth } from "../context/AuthContext";

function Navbar({ title, subtitle }) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "?";

  return (
    <div className="topbar">

      <div className="page-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="profile-mini">

        <div className="profile-avatar">
          {initials}
        </div>

      </div>

    </div>
  );
}

export default Navbar;