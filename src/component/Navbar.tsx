function Navbar() {
  return (
    <nav style={{ padding: "0 500px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <h1>NutriWise</h1>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
          }}
        >
          <li>
            <p>Calolator</p>
          </li>
          <li>
            <p>Food List</p>
          </li>
          <li>
            <p>Recipe</p>
          </li>
          <li>
            <p>Login</p>
          </li>
          <li>
            <p>Register</p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
