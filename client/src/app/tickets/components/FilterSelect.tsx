import { User } from '@acme/shared-models';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

type FilterInputPropTypes = {
    onChange: (t: string) => any;
};

function FilterSelect({onChange}: FilterInputPropTypes) {

   const handleEmitFilter = (event: ChangeEvent<{ value: string }>) => {
        
        const keyFilter = event?.currentTarget?.value;

        onChange(keyFilter);
    }

    const users = useSelector((state:any) => state.user.list);

    return (
        <div className='input_filter'>
            <select onChange={handleEmitFilter}>
                <option value={''}>All</option>
                {
                    users && users.map((item:User) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default FilterSelect;