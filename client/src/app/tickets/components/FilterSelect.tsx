import { User } from '@acme/shared-models';
import { useSelector } from 'react-redux';


function FilterSelect(props: any) {

    const users = useSelector((state:any) => state.user.list);

    return (
        <div className='input_filter'>
            <select>
                {
                    users && users.map((item:User) => (
                        <option value={item.id}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default FilterSelect;