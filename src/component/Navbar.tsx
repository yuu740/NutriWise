function Navbar () {
    const NavDisplaySetting:React.CSSProperties={
        padding: "0 500px",
    };
    const ContainerStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    };

    const navLinksStyle: React.CSSProperties = {
        listStyle: "none",
        display: "flex",
        gap: "20px",
    };

    return (
        <nav style = {NavDisplaySetting}>
            <div style={ContainerStyle}>
                <h1>NutriWise</h1>
                <ul style={navLinksStyle}>
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
        
    )
}

export default Navbar;