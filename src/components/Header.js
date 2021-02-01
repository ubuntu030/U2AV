import React from 'react';
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
					<li><a className="nav-link" href="#">Video</a></li>
					<li><a className="nav-link" href="#">Aduio</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;