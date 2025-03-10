import { Link } from 'react-router-dom';
import './navigation.scss'

function Navigation({ employee, employeeId }) {
    return (
        <div className='navigation'>
            <div className='navigation_main-link'>
                <span>Главная</span>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.625901 0.459641C1.01643 0.069117 1.64959 0.069117 2.04011 0.459641L7.37345 5.79297C7.76397 6.1835 7.76397 6.81666 7.37345 7.20719L2.04011 12.5405C1.64959 12.931 1.01643 12.931 0.625901 12.5405C0.235377 12.15 0.235377 11.5168 0.625901 11.1263L5.25213 6.50008L0.625901 1.87385C0.235377 1.48333 0.235377 0.850166 0.625901 0.459641Z" fill="#B0B0B0"/>
                </svg>
            </div>            
            <Link to={'/'} className='navigation_link'>
                <span>Список сотрудников</span>
            </Link>
            {employee && (
                <Link to={`/employee/${employeeId}`} className='navigation_link navigation_employee-link'>
                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.625901 0.459641C1.01643 0.069117 1.64959 0.069117 2.04011 0.459641L7.37345 5.79297C7.76397 6.1835 7.76397 6.81666 7.37345 7.20719L2.04011 12.5405C1.64959 12.931 1.01643 12.931 0.625901 12.5405C0.235377 12.15 0.235377 11.5168 0.625901 11.1263L5.25213 6.50008L0.625901 1.87385C0.235377 1.48333 0.235377 0.850166 0.625901 0.459641Z" fill="#B0B0B0"/>
                    </svg>
                    <span>{employee}</span>
                </Link>
            )}
        </div>
    )
}

export default Navigation;
