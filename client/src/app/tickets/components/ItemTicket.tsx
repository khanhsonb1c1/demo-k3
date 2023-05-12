import { Ticket, User } from '@acme/shared-models';
import styles from '../tickets.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ItemTicket({ item }: { item: Ticket }) {
  const users = useSelector((state: any) => state.user.list);

  const getNameOfAssignee = () => {
    const x = users?.find((x: User) => {
      return x.id === item.assigneeId;
    });

    return x ? x.name : '...';
  };

  const handleDelete = () => {
    //
  };
  return (
    <tr>
      <td>{}</td>
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
