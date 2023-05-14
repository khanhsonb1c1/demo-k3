import { Ticket } from '@acme/shared-models';
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTicket } from '../store/ticket';
import FilterInput from './components/FilterInput';
import FilterSelect from './components/FilterSelect';
import ItemTicket from './components/ItemTicket';
import Modal from './components/Modal';
import styles from './tickets.module.css'; // nó trỏ vào file này. và cho phép thực hiện logic
import TheLoading from '../components/TheLoading';
import handleToast from './functions/handleToast';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets() {

  const [tickets, setTickets] = useState([] as Ticket[]);

  const [description, setDescription] = useState(''); //create

  const dispath = useDispatch();

  const ticketsInStore = useSelector((state: any) => state.ticket.list);

  const [loading, setLoading] = useState(false);

  const toast = handleToast();


  const column = [
    'Index',
    'Status',
    'Id',
    'Assignee',
    'Description',
    'Actions'
  ];

  const fetchTickets = async () => {
    // arrow function
    setLoading(true);
    const data = await fetch('/api/tickets');

    dispath(updateTicket(await data.json()));

    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (ticketsInStore?.length) setTickets(ticketsInStore);
  }, [ticketsInStore]);

  const modal = document.querySelector('.modal') as Element;

  const toggleModal = () => {
    modal.classList.toggle('hide');
  };


  //? Xử lý thêm logic khi đang thực hiện gọi API thì không thể click thêm
  // ý tưởng sẽ tạo ra 1 biến lưu trữ trạng thái : đóng/mở ( true/ false)
  // Khi isFetch == false : cho phép nhấn, và ngược lại

  let isFetch = false;

  const handleSubmit = async () => {
    if(!isFetch){
      isFetch = true ; // chuyển trạng thái này, ngăn không cho spam
      await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({
          description: description,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(() => {
        setDescription('');
        toggleModal();
        fetchTickets();
        const option = {title: 'Success', message: "Create successfully !", type: 'success'}
        toast({option})

        // goij xong thì đặt lại trạng thái isFetch
        isFetch = true;

        // sau khi tạo xong, sẽ reset lại nội dung description trong form.
        setDescription('')
      }).catch(()=> {
        isFetch = true
      });
    }
  };

  const handleChangeDescription = (event: ChangeEvent<{ value: string }>) => {
    setDescription(event?.currentTarget?.value);
  };

  //! Filter by Status

  const handleFilterByStatus = (event: ChangeEvent<{ value: string }>) => {
    const keyFilter = event?.currentTarget?.value;

    const cloneTickets = JSON.parse(JSON.stringify(ticketsInStore)); // search các cách để clone 1 object.

    const list = cloneTickets.filter((item: Ticket) => {
      return String(item.completed) === keyFilter;
    });

    keyFilter ? setTickets(list) : setTickets(cloneTickets);
  };

  //! Filter by ID

  const handleFilterById = (key: string, id?: string) => {
    const cloneTickets = JSON.parse(JSON.stringify(ticketsInStore));
    console.log(key, id);
    const list = cloneTickets.filter((item: Ticket) => {
      return String(item.id) === key;
    });

    key ? setTickets(list) : setTickets(cloneTickets);
  };

  //! Filter by Description

  const handleFilterByDescription = (key: string, id?: string) => {
    const cloneTickets = JSON.parse(JSON.stringify(ticketsInStore));

    const list = cloneTickets.filter((item: Ticket) => {
      
      return item.description.toUpperCase().includes(key.toUpperCase());
    });

    key ? setTickets(list) : setTickets(cloneTickets);
  };

  //! Filter by Assignee

  const handleFilterByAssignee = (key: string, id?: string) => {
    const cloneTickets = JSON.parse(JSON.stringify(ticketsInStore));

    const list = cloneTickets.filter((item: Ticket) => {
      return String(item.assigneeId) === key;
    });

    key ? setTickets(list) : setTickets(cloneTickets);
  };
  
  // kỹ thuật debouce trong js hay react.

  return (
    <div className={styles['']}>
      {loading && <TheLoading />}
      <Modal>
        {
          <div>
            <div className="title">
              <h2>Create ticket</h2>
            </div>
            <div className="form_body">
              <div className="input_form">
                <label>Description</label>
                <textarea onChange={handleChangeDescription} />
              </div>
            </div>
            <div className="form_bottom">
              <div className="btn_create" onClick={handleSubmit}>
                Submit
              </div>
              <div className="btn_back" onClick={toggleModal}>
                <i className="fa-solid fa-arrow-left"></i>
                Back
              </div>
            </div>
          </div>
        }
      </Modal>
      <div className={styles['title']}>
        <h2>Tickets manager</h2>
      </div>
      <div className="buttons">
        <div className="btn_create open-modal-btn" onClick={toggleModal}>
          <i className="fa-solid fa-plus"></i>
          New ticket
        </div>
      </div>
      <table className={styles['']}>
        <thead>
          {column.map((col) => (
            <th className="text-center">{col}</th>
          ))}
        </thead>
        <thead>
          <th></th>
          <th>
            <div className="input_filter">
              <select onChange={handleFilterByStatus}>
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Pending</option>
              </select>
            </div>
          </th>
          <th>
            <FilterInput onChange={(t: string) => handleFilterById(t, 'id')} />
          </th>
          <th>
            <FilterSelect onChange={(t: string) => handleFilterByAssignee(t)} />
          </th>
          <th>
            <FilterInput
              onChange={(t: string) =>
                handleFilterByDescription(t, 'description')
              }
            />
          </th>
          <th></th>
        </thead>
        <tbody>
          {tickets.map((item, index) => (
            <ItemTicket item={item} index={index} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
