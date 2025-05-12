import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FaceIcon from '@mui/icons-material/Face';

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Students",
    icon: <FaceIcon />,
    link: "/students",
  },
  {
    title: "Subjects",
    icon: <SupervisedUserCircleIcon />,
    link: "/subjects",
  },
  {
    title: "Teachers",
    icon: <ContactMailIcon />,
    link: "/teachers",
  },
  {
    title: "Enrollments",
    icon: <ScheduleIcon />,
    link: "/enrollments",
  },
  {
    title: "Calendar",
    icon: <AssessmentIcon />,
    link: "/calendar",
  },
  {
    title: "Attendance",
    icon: <AccountBalanceIcon />,
    link: "/attendance",
  },
  {
    title: "Replacements",
    icon: <AddAlertIcon />,
    link: "/replacements",
  },
  {
    title: "Feedback",
    icon: <FeedbackIcon />,
    link: "/feedback",
  },
  {
    title: "Logout",
    icon: <ExitToAppIcon />,
    action: "logout",
  },
];
