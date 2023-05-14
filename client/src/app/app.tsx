import { Route, Routes } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import TheHeader from './components/TheHeader';
import { updateUser } from './store/user';
import TicketDetail from './tickets/TicketDetail';
import Tickets from './tickets/tickets';

const App = () => {
  // bỏ vào store,
  const dispath = useDispatch();
// hoặc sử dụng thư viện axios.

  const fetchUsers = async () => {
    // arrow function
    const data = await fetch('/api/users');
    dispath(updateUser(await data.json()));
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(()=> {}, [x])

  return (
    <div>
      <TheHeader />
      <div id="toast"></div>
      <div className={styles['container']}>
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="tickets/:id" element={<TicketDetail/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
