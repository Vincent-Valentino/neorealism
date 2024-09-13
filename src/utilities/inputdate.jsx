import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pane } from 'evergreen-ui';

const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
    <h1>Release Year</h1>
    <Pane background="tint1" padding={16} borderRadius={4} className='bg-gray-100 m  p-4'>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="text-sm -ml-4 pl-3 w-full p-1 border border-gray-300 rounded-md text-gray-700"
      />
    </Pane>
    </>
  );
};

export default DateInput;
