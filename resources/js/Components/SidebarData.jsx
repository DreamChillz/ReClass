import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Members",
    icon: <PeopleIcon />,
    link: "/members",
  },
  {
    title: "Trainers",
    icon: <SupervisedUserCircleIcon />,
    link: "/Trainers",
  },
  {
    title: "Memberships",
    icon: <ContactMailIcon />,
    link: "/memberships",
  },
  {
    title: "Class Schedules",
    icon: <ScheduleIcon />,
    link: "/Schedules",
  },
  {
    title: "Analytics",
    icon: <AssessmentIcon />,
    link: "/Analytics",
  },
  {
    title: " Billing",
    icon: <AccountBalanceIcon />,
    link: "/Billing",
  },
  {
    title: " Announcements",
    icon: <AddAlertIcon />,
    link: "/Announcements",
  },
  {
    title: "Feedback",
    icon: <FeedbackIcon />,
    link: "/Feedback",
  },
  {
    title: "Logout",
    icon: <ExitToAppIcon />,
    action: "logout",
  },
];
