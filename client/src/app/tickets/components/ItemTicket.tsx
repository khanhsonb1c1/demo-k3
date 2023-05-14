import { Ticket, User } from '@acme/shared-models';
import styles from '../tickets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTicket } from '../../store/ticket';
import handleToast from '../functions/handleToast';

function ItemTicket({
  item,
  index,
}: {
  item: Ticket;
  index: number;
}) {
  // useSelector(): lấy từ store.
  const users = useSelector((state: any) => state.user.list);

  const toast = handleToast()

  const dispath = useDispatch();

  const getNameOfAssignee = () => {
    const x = users?.find((x: User) => {
      return x.id === item.assigneeId;
    });

    return x ? x.name : '...';
  };

  const handleDelete = async () => {
    await fetch(`/api/tickets/${item.id}/delete`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchTickets()
        const option = {title: "Deleted", message: "Delete successfully !", type: "success"}
        toast({option})
      })
      .catch(() => {
        const option = {title: "Deleted", message: "Delete fail !", type: "error"}
        toast({option}) 
      });
  };

  const fetchTickets = async() => {
    const data = await fetch('/api/tickets');
    dispath(updateTicket(await data.json()));
  }
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="col-middle">
        <div className="text-center">
          <p
            className={
              styles[item.completed ? 'label_danger' : 'label_success']
            }
          >
            {item.completed ? 'Completed' : 'Pending'}
          </p>
        </div>
      </td>
      <td className="col-middle">{item.id}</td>
      <td className="col-long">{getNameOfAssignee()}</td>
      <td>{item.description}</td>
      <td>
        <div className="btn_group">
          <Link
            className="fa-solid fa-pen-to-square color_primary"
            to={`/tickets/${item.id}`}
          ></Link>
          <i
            className="fa-solid fa-trash color_danger"
            onClick={handleDelete}
          ></i>
        </div>
      </td>
    </tr>
  );
}

export default ItemTicket;
