"use client"

import {Label} from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {useMemo, useState} from "react";

export function FieldRadio(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    const initialValue = data.value !== undefined ? data.value : (data.default ?? '');

    const [selectedValue, setSelectedValue] = useState(initialValue);

    return (
        <>
            <input type="hidden" name={data.id} value={selectedValue}/>

            <RadioGroup
                name={'field_radio_' + data.id}
                value={selectedValue}
                onValueChange={setSelectedValue}
                id={data.id}
            >
                {
                    options.map(([key, label]) => (
                        <div
                            key={key}
                            className="flex items-center gap-3"
                        >
                            <RadioGroupItem
                                id={data.id + '_' + key}
                                value={key}
                            />
                            <Label
                                className="cursor-pointer"
                                htmlFor={data.id + '_' + key}
                            >
                                {label}
                            </Label>
                        </div>
                    ))
                }
            </RadioGroup>
        </>
    )
}