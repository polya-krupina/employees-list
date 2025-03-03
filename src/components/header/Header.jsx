import './header.scss'
import logo from '../../logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/themeSlice';

function Header() {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <header className='header-container'>
            <div className='header'>
                <img src={logo} className='header_logo' alt="66bit" />
                <span className='header_number'>+7 343 290 84 76</span>
                <span className='header_mail'>info@66bit.ru</span>
                <button className="header_theme-btn" onClick={() => dispatch(toggleTheme())}>
                    <svg width="55" height="26" viewBox="0 0 55 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_4183_473)">
                        <rect width="55" height="26" rx="13" fill="#155DA4"/>
                        </g>
                        <defs>
                        <filter id="filter0_i_4183_473" x="0" y="0" width="55" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4183_473"/>
                        </filter>
                        </defs>
                    </svg>
                    <div className={`theme-btn_circle theme-btn_circle__${theme}`}>
                        {theme === 'light' ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.491334 8.44496C0.559481 8.37667 0.644935 8.32823 0.738527 8.30483C0.832121 8.28144 0.93032 8.28396 1.02258 8.31215C2.03556 8.61839 3.11265 8.64406 4.13907 8.38644C5.16549 8.12882 6.10279 7.59756 6.85109 6.84925C7.5994 6.10095 8.13066 5.16365 8.38828 4.13723C8.64591 3.11081 8.62023 2.03372 8.31399 1.02074C8.28557 0.92844 8.28285 0.830135 8.30612 0.7364C8.32939 0.642666 8.37777 0.557049 8.44606 0.488756C8.51436 0.420464 8.59998 0.37208 8.69371 0.348809C8.78744 0.325538 8.88575 0.328259 8.97805 0.356681C10.3785 0.785695 11.608 1.64549 12.4916 2.81371C13.2643 3.83959 13.7356 5.06062 13.8526 6.3396C13.9696 7.61858 13.7277 8.90486 13.1539 10.0539C12.5802 11.203 11.6974 12.1693 10.6048 12.8443C9.51214 13.5193 8.25292 13.8762 6.9686 13.875C5.47024 13.8796 4.01175 13.3925 2.81688 12.4884C1.64866 11.6049 0.788863 10.3754 0.359849 8.97488C0.331757 8.88293 0.329149 8.78506 0.352305 8.69174C0.375462 8.59841 0.423512 8.51312 0.491334 8.44496ZM3.45571 11.6398C4.58093 12.4873 5.97444 12.8998 7.37969 12.8014C8.78494 12.703 10.1074 12.1003 11.1035 11.1043C12.0996 10.1082 12.7024 8.78584 12.8009 7.3806C12.8995 5.97535 12.487 4.58182 11.6396 3.45652C11.0875 2.72742 10.3737 2.1364 9.55446 1.72996C9.60113 2.05749 9.62465 2.38791 9.62485 2.71875C9.62292 4.54981 8.89467 6.30532 7.59992 7.60007C6.30517 8.89483 4.54966 9.62307 2.7186 9.625C2.38709 9.6249 2.05601 9.60138 1.72782 9.55461C2.13464 10.374 2.72613 11.0878 3.45571 11.6398Z" fill="#155DA4"/>
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99967 10.7917C9.09375 10.7917 10.7913 9.09408 10.7913 7C10.7913 4.90592 9.09375 3.20833 6.99967 3.20833C4.90559 3.20833 3.20801 4.90592 3.20801 7C3.20801 9.09408 4.90559 10.7917 6.99967 10.7917Z" stroke="#155DA4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11.1653 11.165L11.0895 11.0892M11.0895 2.91083L11.1653 2.835L11.0895 2.91083ZM2.83533 11.165L2.91116 11.0892L2.83533 11.165ZM7.00033 1.21333V1.16667V1.21333ZM7.00033 12.8333V12.7867V12.8333ZM1.21366 7H1.16699H1.21366ZM12.8337 7H12.787H12.8337ZM2.91116 2.91083L2.83533 2.835L2.91116 2.91083Z" stroke="#155DA4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                </button>
            </div>
        </header>
    );
}

export default Header;
