import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import './employeePage.scss';
import { formatDate } from '../../utils';
import { API_URL } from '../../constants';

function EmployeePage() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`${API_URL}/Employee/${employeeId}`);
                
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные сотрудника');
                }

                const data = await response.json();
                setEmployee(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [employeeId]);

    if (loading) {
        return;
    }

    if (error) {
        return <div className='employee_not-found'>
            <h1 className='not-found_title text-title'>
                Сотрудник не найден
            </h1>
            <Link to={'/'} className='not-found_link'>
                <p>Вернуться к списку сотрудников</p>
            </Link>
        </div>;
    }

    return (
        <div className='employee-page'>
            <Navigation employee={employee.name} employeeId={employeeId} />
            <div className='employee-main-info'>
                <h1 className='text-title employee-info_name'>{employee.name}</h1>
                <img src={employee.photo} alt="avatar" className='employee-info_photo' />
                <p className='employee-info_position'>{employee.position}</p>
                <ul className='employee-info_stack'>
                    {employee.stack.map(item => (
                    <li key={item} className='employee-info_stack-item'>
                            <p>{item}</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className='employee-info_container'>
                <h2 className='employee-info_title'>Основная информация</h2>
                <div className='employee-info'>
                    <p className='employee-info_label'>Контактный телефон:</p>
                    <p className='employee-info_value'>{employee.phone}</p>

                    <p className='employee-info_label'>Дата рождения:</p>
                    <p className='employee-info_value'>{formatDate(employee.birthdate)}</p>

                    <p className='employee-info_label'>Дата устройства:</p>
                    <p className='employee-info_value'>{formatDate(employee.dateOfEmployment)}</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeePage;
