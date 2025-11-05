"use client"

import * as React from "react"
import {ChevronDownIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function FieldDatetime(field: { data: any; }) {
    let data = field.data,
        settings = data.settings ?? {};

    // Parse initial value
    const parseInitialValue = () => {
        let initialValue = data.value ?? '';

        if (typeof initialValue === "undefined" || initialValue === null || initialValue === '') {
            initialValue = data.default ?? '';
        }

        if (!initialValue) {
            // Set current date and time as default
            const now = new Date();
            return {
                date: now,
                time: now.toTimeString().split(' ')[0] // HH:MM:SS format
            };
        }

        try {
            // Handle datetime string (YYYY-MM-DD HH:MM:SS or ISO format)
            if (initialValue.includes(' ')) {
                const [datePart, timePart] = initialValue.split(' ');
                return {
                    date: new Date(datePart),
                    time: timePart || "10:30:00"
                };
            } else if (initialValue.includes('T')) {
                // ISO format
                const dateObj = new Date(initialValue);
                return {
                    date: dateObj,
                    time: dateObj.toTimeString().split(' ')[0]
                };
            } else {
                // Just date
                return {
                    date: new Date(initialValue),
                    time: "10:30:00"
                };
            }
        } catch (error) {
            const now = new Date();
            return {
                date: now,
                time: now.toTimeString().split(' ')[0]
            };
        }
    };

    const initialValues = parseInitialValue();

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(initialValues.date)
    const [time, setTime] = React.useState<string>(initialValues.time)

    const formatDateForInput = (date: Date | undefined) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Combine date and time into the appropriate format
    const getDateTimeValue = () => {
        if (!date) return "";
        if (settings.timePicker) {
            return `${formatDateForInput(date)} ${time}`;
        }
        return formatDateForInput(date);
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id={`date-picker-${data.id}`}
                            className="w-auto justify-between font-normal hover:bg-white"
                        >
                            {date ? date.toLocaleDateString() : data.placeholder || "Pick a date"}
                            <ChevronDownIcon/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
                <input type="hidden" name={data.id} value={getDateTimeValue()}/>
            </div>
            {
                settings.timePicker && (
                    <div className="flex flex-col gap-3">
                        <Input
                            type="time"
                            id={`time-picker-${data.id}`}
                            step="1"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                )
            }
        </div>
    )
}