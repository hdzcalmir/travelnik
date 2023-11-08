import { MdSpaceDashboard } from "react-icons/md";
import { BsCalendar2EventFill } from "react-icons/bs";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { IoIosAddCircle } from "react-icons/io";

export const Sitemap = [
    {
        name: 'Dashboard',
        route: '/panel/dashboard',
        icon: MdSpaceDashboard
    },
    {
        name: 'Add Venture',
        route: '/panel/add-venture',
        icon: IoIosAddCircle
    },
    {
        name: 'Add Event',
        route: '/panel/add-event',
        icon: IoIosAddCircle
    },
    {
        name: 'Add Activity',
        route: '/panel/add-activity',
        icon: IoIosAddCircle
    }
]