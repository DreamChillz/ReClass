import { usePage, Link } from '@inertiajs/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const { props } = usePage();
  const { auth, currentRoute } = props;

  const pageDetails = {
    dashboard: {
      title: "Dashboard",
    },
    students: {
      title: "Students",
    },
    trainers: {
      title: "Trainer Management",
    },
    memberships: {
      title: "Membership Management",
    },
    schedules: {
      title: "Class Schedules",
    },
    analytics: {
      title: "Analytics",
    },
    billing: {
      title: "Billing",
    },
    announcements: {
      title: "Announcements",
    },
    feedback: {
      title: "Feedback",
    },
  };

  const { title } = pageDetails[currentRoute] || {
    title: "Page Not Found",
  };

  return (
    <div className="w-full px-5 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-gray-800">
      <div>
        <h2 className="text-m font-semibold">{title}</h2>
      </div>
      <Link href={route('profile.edit')}>
        <div className="px-2 py-1 flex flex-col items-center border border-gray-300 my-2 rounded text-xs hover:bg-[#2e2e2e]">
          <div className="flex gap-2 items-center justify-between">
            <AccountCircleIcon />
            {auth.user.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
