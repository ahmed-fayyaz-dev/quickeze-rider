/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { CustomDropDownPicker } from 'src/components/dropDownPicker';
import { orderStatusArr } from 'src/screens/myOrders/dataFormat';

export default function ChangeOrderStatusDropdown({ selectedValue, onChange }) {
    const [value, setValue] = useState(selectedValue);

    function handleChange(v) {
        setValue(v);
        // onChange(v);
        // Call API ACTION
    }

    return (
        <CustomDropDownPicker
            title="Change Status"
            items={orderStatusArr}
            setValue={handleChange}
            value={value}
        />
    );
}
