import React from 'react';
import { Link } from "react-router-dom";
// import U2AVimg from "./public/U2AV.png";

function Header() {
	return (
		<header>
			<div className="logo-container">
				<img src="src/public/U2AV.png" alt="logo" />
				<h4>U2AV</h4>
			</div>
			<nav>
				<ul className="nav-links">
					<li><Link to="/" className="nav-link">Video</Link></li>
					<li><Link to="/audio" className="nav-link">Aduio</Link></li>
				</ul>
			</nav>
		</header>

	)
}

export default Header;