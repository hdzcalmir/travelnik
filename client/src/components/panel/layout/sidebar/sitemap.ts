import { BsCalendar2EventFill } from "react-icons/bs";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { IoIosAddCircle } from "react-icons/io";
import { BiSolidBusiness } from "react-icons/bi";

export const Sitemap = [
    {
        name: 'VENTURE',
        routes: [
            {
                name: 'Ventures',
                route: '/panel/add-venture',
                icon: BiSolidBusiness
            },
            {
                name: 'Add Venture',
                route: '/panel/add-venture',
                icon: IoIosAddCircle
            }
        ]
    },
    {
        name: 'EVENT',
        routes: [
            {
                name: 'Events',
                route: '/panel/events',
                icon: BsCalendar2EventFill
            },
            {
                name: 'Add Event',
                route: '/panel/add-event',
                icon: IoIosAddCircle
            }
        ]
    },
    {
        name: 'ACTIVITY',
        routes: [
            {
                name: 'Activities',
                route: '/panel/activities',
                icon: VscActivateBreakpoints
            },
            {
                name: 'Add Activity',
                route: '/panel/add-activity',
                icon: IoIosAddCircle
            },
        ]
    }
]