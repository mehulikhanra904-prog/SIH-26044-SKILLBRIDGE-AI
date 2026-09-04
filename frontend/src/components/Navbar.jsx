function Navbar({ title, subtitle }) {
  return (
    <div className="topbar">

      <div className="page-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="profile-mini">

        <div className="profile-avatar">
          MK
        </div>

      </div>

    </div>
  );
}

export default Navbar;