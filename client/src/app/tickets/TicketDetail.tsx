import { User } from '@acme/shared-models';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './tickets.module.css';
import { Ticket } from '@acme/shared-models';

function TicketDetail() {
  const users = useSelector((state: any) => state.user.list);

  const [ticket, setTicket] = useState({} as Ticket);

  const { id } = useParams();

  const navigate = useNavigate()

  const handleChangeStt = async () => {
    if (!ticket.completed) {
      await fetch(`/api/tickets/${id}/complete`, {
        method: 'PUT',
      }).then(() => {
        fetchDetail();
      });
    } else {
      await fetch(`/api/tickets/${id}/delete`, {
        method: 'DELETE',
      }).then(() => {
        navigate("/")
      }).catch(()=> {
        //
      });
    }
  };

  const handleChangeAssignee = async (
    event: ChangeEvent<{ value: string }>
  ) => {
    const userId = event?.currentTarget?.value;

    if (userId) {
      await fetch(`/api/tickets/${id}/assign/${event?.currentTarget?.value}`, {
        method: 'PUT',
      }).then(() => {
        //
      });
    } else {
      await fetch(`/api/tickets/${id}/unassign`, {
        method: 'PUT',
      }).then(() => {
        //
      });
    }
    fetchDetail();
  };

  const fetchDetail = async () => {
    const data = await fetch(`/api/tickets/${id}`);
    setTicket(await data.json());

    // await setAssignee()
  };

  useLayoutEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <div className="form">
      <div className="title">
        <h2>Ticket Detail</h2>
      </div>
      <div className="form_body">
        <div className="input_form">
          <label>ID</label>
          <input disabled value={ticket.id || ''} />
        </div>

        <div className="input_form">
          <label>Description</label>
          <textarea disabled value={ticket.description || ''} />
        </div>

        <div className="input_form">
          <label>Assignee</label>
          <select
            value={ticket.assigneeId || ''}
            onChange={handleChangeAssignee}
          >
             <option value=''>...</option>
            {users &&
              users.map((item: User) => (
               
                <option value={item.id} key={item.id}>{item.name}</option>
              ))}
          </select>
        </div>

        <div className="input_form">
          <label>Status</label>
          <div className="label_wrap">
            <span
              className={
                styles[ticket.completed ? 'label_danger' : 'label_success']
              }
            >
              {ticket.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
      <div className="form_bottom">
        <div className="btn_create" onClick={handleChangeStt}>
          {ticket.completed ? 'Click to delete' : 'Click to complete'}
        </div>

        <div className="btn_back">
          <Link to={'/'}>
            <i className="fa-solid fa-arrow-left"></i>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
