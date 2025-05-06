import { usePage } from '@inertiajs/react';
import classes from "../Layouts/AppLayout.module.css";

const Header = () => {
  const { props } = usePage();
  const currentRoute = props.currentRoute; // this comes from Laravel

  const pageDetails = {
    dashboard: {
      title: "Dashboard",
      description: "Summary of total revenue, total active members, and more.",
    },
    members: {
      title: "Member Management",
      description:
        "Add, update, search, view, and delete member records to update the member database.",
    },
    trainers: {
      title: "Trainer Management",
      description:
        "Add, update, search, view, and delete trainer records to update the trainer database.",
    },
    memberships: {
      title: "Membership Management",
      description:
        "Create, update, search, view, and delete membership plans to update membership database.",
    },
    schedules: {
      title: "Class Schedules",
      description: "Create, update & manage gym class schedules.",
    },
    analytics: {
      title: "Analytics",
      description:
        "View and generate report of analytics on member attendance, class popularity & more.",
    },
    billing: {
      title: "Billing",
      description: "Manage billing and invoices for members.",
    },
    announcements: {
      title: "Announcements",
      description: "Create and send announcements to members and trainers.",
    },
    feedback: {
      title: "Feedback",
      description: "Track trainer performance and view feedback from members.",
    },
  };

  const { title, description } = pageDetails[currentRoute] || {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
  };

  return (
    <div className={classes.Header}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Header;
