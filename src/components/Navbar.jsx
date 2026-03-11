import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-3">
            <Link className="navbar-brand fw-bold" to="/">RestauApp</Link>
            <div className="navbar-nav">
                <Link className="nav-link" to="/">Inicio</Link>
            </div>
        </nav>
    );
}

export default Navbar;
