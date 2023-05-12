import { Ticket } from '@acme/shared-models';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterSelect from './components/FilterSelect';
import ItemTicket from './components/ItemTicket';
import FilterInput from './components/filterInput';
import styles from './tickets.module.css';
import Modal from './components/Modal';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets() {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [description, setDescription] = useState('');

  const column = [
    'Index',
    'Status',
    'Id',
    'Assignee',
    'Description',
    'Actions',
  ];

  const fetchTickets = async () => {
    // arrow function
    const data = await fetch('/api/tickets');
    console.log(data, '/tick');
    setTickets(await data.json());
  };

  useLayoutEffect(() => {
    fetchTickets();
  }, []);

  const modal = document.querySelector('.modal') as Element;

  const toggleModal = () => {
    modal.classList.toggle('hide');
  };

  const handleSubmit = async () => {
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

    });
  };

  const handleChangeDescription = (event: ChangeEvent<{ value: string }>) => {
    setDescription(event?.currentTarget?.value);
  };

  return (
    <div className={styles['']}>
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
            <FilterInput />
          </th>
          <th>
            <FilterInput />
          </th>
          <th>
            <FilterSelect />
          </th>
          <th>
            <FilterInput />
          </th>
          <th></th>
        </thead>
        <tbody>
          {tickets.map((item, index) => (
            <ItemTicket item={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
