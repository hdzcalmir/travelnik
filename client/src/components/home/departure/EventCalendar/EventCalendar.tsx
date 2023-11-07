import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./EventCalendar.css";
import { IEvent } from '@/common/interfaces/IEvent';
import { Tooltip } from '@nextui-org/react';

interface EventCalendarProps {
    startDate?: Date | Date[];
    endDate?: Date;
    events?: IEvent[];
}

const EventCalendar = ({ startDate, endDate, events }: EventCalendarProps) => {
    const defaultValues = startDate && endDate ? [startDate, endDate] : undefined;

    const tileContent = ({ date }: { date: Date }) => {
        const eventDates = events?.map(event => new Date(event.start_date));
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        const isEventDate = eventDates?.some(eventDate => {
            const formattedEventDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
            return formattedEventDate === formattedDate;
        });

        if (isEventDate) {
            const event = events?.find(event => {
                const eventDate = new Date(event.start_date);
                const formattedEventDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
                return formattedEventDate === formattedDate;
            });

            return (
                <Tooltip
                    content={
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">{event?.name}</div>
                            <div className="text-tiny">Category: {event?.category}</div>
                            <div className="text-tiny">Description: {event?.description}</div>
                            <div className="text-tiny">End date: {event?.end_date ? new Date(event.end_date).toLocaleDateString('en-GB') : ""}</div>
                        </div>
                    }
                >
                    <div className="event-tile h-1.5 w-1.5 rounded-full bg-white/70 mx-auto"></div>
                </Tooltip>
            );
        }

        return null;
    };

    return (
        <>
            <div className='calendar-container px-4'>
                <Calendar
                    selectRange={true}
                    defaultValue={defaultValues as any}
                    tileContent={tileContent}
                />
            </div>
        </>
    );
}

export default EventCalendar;
