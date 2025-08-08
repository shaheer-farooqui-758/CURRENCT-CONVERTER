// src/components/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Government Special Education & Rehabilitation Complex</div>
      <ul style={styles.navItems}>
        <li><Link to="/">Home</Link></li>
        <li>About</li>
        <li><Link to="/events">Events Gallery</Link></li>
        <li>Medical Team</li>
        <li>Faculty</li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#FFFFFF', 
    color: 'white',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'green',
    fontWeight: 'bold'
  },
  navItems: {
    listStyle: 'none',
    display: 'flex',
    gap: '4rem',
    margin: 0,
    padding: 0,
    fontSize: '1rem',
    cursor: 'pointer',
    color: 'green',

  }
};

export default Navbar;
