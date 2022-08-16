import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/' activeStyle>
			Home
		</NavLink>
    <NavLink to='/users' activeStyle>
      Users
    </NavLink>
    <NavLink to='/meetings' activeStyle>
      Meetings
    </NavLink>
		<NavLink to='/report' activeStyle>
			Report
		</NavLink>
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/logout'>Logout</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;

