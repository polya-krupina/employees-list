import { useEffect } from 'react';
import EmployeesList from './pages/employeesList/EmployeesList';
import { useSelector } from 'react-redux';
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Header />
      <div className='page-content'>
        <Navigation />
        <EmployeesList />
      </div>
    </div>
  );
}

export default App;
