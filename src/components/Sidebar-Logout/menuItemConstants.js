//necessary icon imports
import { MdLandscape } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GiTruck } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";


export const menuItem = [
  {
    path: "./home",
    name: "Account Info",
    icon: <FaRegUser />,
  },
  {
    path: "./users",
    name: "Users",
    icon: <MdSupervisorAccount />,
  },
  {
    path: "./trucks",
    name: "Trucks",
    icon: <GiTruck />,
  },
  {
    path: "./sts",
    name: "STS",
    icon: <RiBuilding2Fill />,
  },
  {
    path: "./landfill",
    name: "Landfill",
    icon: <MdLandscape />,
  },
  {
    name: "Logout", // No path needed for logout
    icon: <RiLogoutBoxLine />,
    action: "logout", // Additional field to identify logout action
  },
  {
    path: "./trucks",
    name: "Trucks",
    icon: <GiTruck />,
  },
  {
    path: "./sts",
    name: "STS",
    icon: <RiBuilding2Fill />,
  },
  {
    path: "./landfill",
    name: "Landfill",
    icon: <MdLandscape />,
  },
  {
    name: "Logout", // No path needed for logout
    icon: <RiLogoutBoxLine />,
    action: "logout", // Additional field to identify logout action
  },
];