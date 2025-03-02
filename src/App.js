import { useEffect } from 'react';
import EmployeesList from './pages/employeesList/EmployeesList';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import EmployeePage from './pages/employeePage/EmployeePage';

function App() {
    const theme = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Routes>
            <Route path="/" element={<EmployeesList />} />
            <Route path="/employee/:employeeId" element={<EmployeePage />} />
        </Routes>
    );
}

export default App;
