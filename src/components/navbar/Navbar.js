import React, { useState } from 'react';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);

	const handleToggle = () => {
	    setNavbarOpen(!navbarOpen);
	}

	const closeMenu = () => {
		setNavbarOpen(false);
	}

	return (
		<>
			<Nav>
				<Bars onClick={ () => handleToggle()} />

				<NavMenu className={navbarOpen ? "nav-open" : ""} onClick={() => closeMenu()} >
					<NavLink to='/'>
						Home
					</NavLink>
					<NavLink to='/users'>
						Users
					</NavLink>
					<NavLink to='/meetings'>
						Meetings
					</NavLink>
					<NavLink to='/report'>
						Report
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/login' onClick={() => {
						sessionStorage.removeItem('token');
					}}>Logout</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;