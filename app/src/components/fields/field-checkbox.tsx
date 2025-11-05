"use client"

import {Label} from "@/components/ui/label"
import {useMemo, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

export function FieldCheckbox(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    const initialValue = data.value !== undefined ? data.value : (data.default ?? '');

    // Convert initial value to array if it's a string
    const initialChecked = initialValue ? (Array.isArray(initialValue) ? initialValue : initialValue.split(',')) : [];

    const [checkedValues, setCheckedValues] = useState<string[]>(initialChecked);

    const handleCheckedChange = (key: string, checked: boolean) => {
        setCheckedValues(prev =>
            checked
                ? [...prev, key]
                : prev.filter(v => v !== key)
        );
    };

    return (
        <div id={data.id}>
            {
                options.map(([key, label]) => (
                    <div key={key} className="flex items-center gap-3 mb-2">
                        <Checkbox
                            id={data.id + '_' + key}
                            checked={checkedValues.includes(key)}
                            onCheckedChange={(checked) => handleCheckedChange(key, checked as boolean)}
                        />
                        <Label className="cursor-pointer" htmlFor={data.id + '_' + key}>{label}</Label>
                    </div>
                ))
            }
            <input
                type="hidden"
                name={data.id}
                value={checkedValues.length > 0 ? checkedValues.join(',') : ''}
            />
        </div>
    )
}