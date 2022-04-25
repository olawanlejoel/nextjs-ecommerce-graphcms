import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="navbar container">
			<Link href="/">
				<div className="logo">
					<p>
						PLANTS <span>☘</span>
					</p>
				</div>
			</Link>
			<div className="nav-price snipcart-checkout">
				<span>🛒</span>
				<p className="snipcart-total-price">$0.00</p>
			</div>
		</nav>
	);
};

export default Navbar;
