import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    const [profileMenuVisible, setProfileMenuVisible] = useState(false);

    const toggleProfileMenu = () => {
        setProfileMenuVisible(!profileMenuVisible);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className='text-gray-600 body-font sticky top-0 bg-white border-b'>
            <div className='container mx-auto flex flex-wrap p-3 flex-col md:flex-row justify-between'>
                <Link to='/' className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-10 h-10 text-white p-2 bg-red-500 rounded-full'
                        viewBox='0 0 24 24'
                    >
                        <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                    </svg>
                    <span className='ml-3 text-xl'>ResourcesHub</span>
                </Link>

                {isAuthenticated && (
                    <div className='relative' /* onBlur={toggleProfileMenu} */>
                        <button
                            onClick={toggleProfileMenu}
                            className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'
                        >
                            {user?.name}
                        </button>
                        {profileMenuVisible && (
                            <div className='w-32 absolute bg-slate-100 top-10 border rounded-md flex flex-col items-center'>
                                <Link to={'/profile'}>
                                    <span className='py-2 border-b w-full text-center cursor-pointer'>Perfil</span>
                                </Link>
                                <span onClick={handleLogout} className='py-2 border-b w-full text-center cursor-pointer'>
                                    Cerrar sesión
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
