import { Link } from 'react-router-dom';
import './notFoundPage.scss';

function NotFoundPage() {
    return (
        <div className='not-found'>
            <h1 className='not-found_title text-title'>
                Страница не найдена
            </h1>
            <Link to={'/'} className='not-found_link'>
                <p>Вернуться к списку сотрудников</p>
            </Link>
        </div>
    );
}

export default NotFoundPage;
