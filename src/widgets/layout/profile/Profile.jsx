import React, { useState, useRef, useEffect } from 'react';

import Modal from '../../../components/modal/ProfileModal';
import useNavigator from '@/components/navigator/useNavigate';

export default function Profile({ userprofile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { handleNavigation } = useNavigator();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleLogout = () => {
    sessionStorage.removeItem('token')
    handleNavigation('/auth/sign-in')
  }


  return (
    <div className=''>

      <div className="relative inline-block text-left" ref={menuRef}>
        {/* Avatar Button */}

        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
        >
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setDropdownOpen(false);

                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View Profile
                </button>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
              </li>
              <li className='text-red-600 hover:bg-red-100 cursor-pointer' onClick={handleLogout}>
                <button className="block px-4 py-2 ">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        <Modal userprofile={userprofile} isOpen={modalOpen} onClose={() => setModalOpen(false)}></Modal>
      </div>
    </div>
  );
}

