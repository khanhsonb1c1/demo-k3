import _ from "lodash"; // khai báo thư viện lodash
import { ChangeEvent } from 'react';

type FilterInputPropTypes = {
  onChange: (t: string) => any;
};

function FilterInput({ onChange }: FilterInputPropTypes) {

  const handleEmitFilter = (event: ChangeEvent<{ value: string }>) => {
   
    const keyFilter = event?.target?.value;

    console.log(keyFilter, '/debounce')
    
     // emit keyFilter to parent component
    onChange(keyFilter);

  };
  //? CÁCH 1: 
  //* Sử dụng debouce ( lodash ) - Thực tế đi làm hay dùng cái này.

  // debounce sẽ ghi nhận từ lúc bắt đầu sự kiện, cho đến hết thời gian đc xét, và sẽ thực thi hàm trả về sau khi hết thời gian.
  // func debounce truyền vào 2 tham số, 1 function và thời gian ( trường hợp này là 500 - đơn vị "ms")
  const debouncedOnChange = _.debounce(handleEmitFilter, 500);
  //* ================================


   //? CÁCH 2: 
  //* Sử dụng code thuần - để hiểu bản chất.

  let debounce = 0 as any; // tạo 1 vùng nhớ cho setTimeout.

  const debounceOnChange2 = (event: ChangeEvent<{ value: string }>) => {
    clearTimeout(debounce);

    debounce = setTimeout(()=> {
      handleEmitFilter(event)
    }, 500)
  }
  //* ================================

  return (
    <div className="input_filter">
      {/* Chỉ hiển thị 1 trong 2 */}
      {/* Cách 1 */}
      <input type="text" onChange={debouncedOnChange} /> 
      {/* Cách 2 */}
      {/* <input type="text" onChange={debounceOnChange2} /> */}
    </div>
  );
}

export default FilterInput;