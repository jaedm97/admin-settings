"use client"

import {Switch} from "@/components/ui/switch"
import {useState} from "react";

export function FieldSwitch(field: { data: any; }) {
    let data = field.data;

    const [checked, setChecked] = useState(data.value === 'on');

    const handleChange = (value: boolean) => {
        setChecked(value);
    };

    return (
        <>
            <input type="hidden" name={data.id} value={checked ? 'on' : 'off'}/>
            <Switch
                name={'field_switch_' + data.id}
                id={data.id}
                checked={checked}
                onCheckedChange={handleChange}
            />
        </>
    )
}
