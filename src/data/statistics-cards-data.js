import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon:  UserPlusIcon,
    title: "Registered Users",
    value: "500",
    footer: {
      color: "text-green-500",
       value: "+55%",
       label: "than last week",
    },
  },
    {
    color: "gray",
    icon:  UsersIcon,
    title: "Registered Users",
    value: "40",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Category lists",
    value: "10",
    footer: {
      color: "text-green-500",
      // value: "+3%",
      label: "updated 2 days ago",
    },
  },
  {
    color: "gray",
    icon:BanknotesIcon ,
    title: "Question Lists",
    value: "15",
    footer: {
      color: "text-red-500",
      // value: "-2%",
       label: "updated 10 days ago",
    },
  },

];

export default statisticsCardsData;
