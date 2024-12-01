import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaUser, FaChevronDown, FaSignOutAlt, FaDumbbell, FaFire, FaBolt } from 'react-icons/fa';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import Logo from '@/app/assets/Images/Logo.png';
import { GetServerSideProps } from 'next';
import { getUserBySessionId } from '../app/models/User';
import '@/app/assets/styles/video.css';

export default function Home({ name }: { name: string }) {
  const isLoggedIn = name !== 'Guest';
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const handleRegisterRedirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = '/register';
  };

  const handleSignOut = () => {
    window.location.href = '/logout';
  };

  const handleDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleSettings = () => {
    window.location.href = '/settings';
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = 1.5;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/Videos/BlackFading.mp4" type="video/mp4" />
      </video>


      <div className={`logo-container ${isScrolled ? 'scrolled' : ''}`}>
        <Image 
          src={Logo} 
          alt="Logo" 
          priority
        />
      </div>

      <div className='title'>
        <h1>
          KEEP<br/>TURNING<br/>ON THE HEAT
        </h1>
      </div>

      <div className="login-container">
        {name !== 'Guest' ? (
          <div 
            className="welcome-button-container" 
            onMouseEnter={() => setShowDropdown(true)} 
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="welcome-button">
              <FaUser size={24} color="red" />
              <span>{name}</span>
              <FaChevronDown size={24} color="red" />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleDashboard}><LuLayoutDashboard size={20} color="red" className='icon' />  Dashboard</div>
                <div className="dropdown-item" onClick={handleSettings}> <MdManageAccounts size={20} color="red" className='icon' />  Settings  </div>
                <div className="dropdown-item" onClick={handleSignOut}><FaSignOutAlt size={20} color="red" className='icon' />  Log out</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="login-button" onClick={handleLoginRedirect}>
              Login
              <div className="sign-up" onClick={handleRegisterRedirect}>
                Sign up
              </div>
            </button>
            <span>FIT<br />SYNC</span>
          </>
        )}
      </div>


    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  let name = null;

  if (cookies) {
    const cookie = require('cookie');
    const parsedCookies = cookie.parse(cookies);
    const sessionID = parsedCookies.sessionID;

    if (sessionID) {
      const user = await getUserBySessionId(sessionID);
      if (user.user) name = `${user.user.F_name}`;
    }
  }

  return {
    props: {
      name: name || 'Guest',
    },
  };
};
