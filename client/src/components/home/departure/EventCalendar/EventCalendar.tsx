import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EventCalendar.css";
import { IEvent } from "@/common/interfaces/IEvent";
import { Tooltip } from "@nextui-org/react";

interface EventCalendarProps {
  startDate?: Date | Date[];
  endDate?: Date;
  events?: IEvent[];
}

const EventCalendar = ({ startDate, endDate, events }: EventCalendarProps) => {
  const defaultValues = startDate && endDate ? [startDate, endDate] : undefined;

  const tileContent = ({ date }: { date: Date }) => {
    const isEventDate = events?.some((event) => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);

      // Add one day to start and end dates
      eventStartDate.setDate(eventStartDate.getDate());
      eventEndDate.setDate(eventEndDate.getDate() + 1);

      return date >= eventStartDate && date <= eventEndDate;
    });

    if (isEventDate) {
      const event = events?.find((event) => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);

        // Add one day to start and end dates
        eventStartDate.setDate(eventStartDate.getDate());
        eventEndDate.setDate(eventEndDate.getDate() + 1);

        return date >= eventStartDate && date <= eventEndDate;
      });

      if (event) {
        // Add one more day to the end date for display
        const displayEndDate = new Date(event.end_date);
        displayEndDate.setDate(displayEndDate.getDate() + 1);

        return (
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">{event.name}</div>
                <div className="text-tiny">Category: {event.category}</div>
                <div className="text-tiny">
                  Description: {event.description}
                </div>
                <div className="text-tiny">
                  End date:{" "}
                  {event.end_date
                    ? displayEndDate.toLocaleDateString("en-GB", {
                        timeZone: "UTC",
                      })
                    : ""}
                </div>
              </div>
            }
          >
            <div className="event-tile h-1.5 w-1.5 rounded-full bg-white/70 mx-auto"></div>
          </Tooltip>
        );
      }
    }

    return null;
  };

  return (
    <>
      <div className="calendar-container px-4">
        <Calendar
          selectRange={true}
          defaultValue={defaultValues as any}
          tileContent={tileContent}
        />
      </div>
    </>
  );
};

export default EventCalendar;
