import { Link, useLocation } from "react-router-dom";
import { House, Search, ClipboardList, User } from "lucide-react";
import { userNavItems } from "../../constants/navItems";
import colors from "../../constants/colors";

const bottomNavIconSize = 20;

const iconMap = {
  home: House,
  search: Search,
  clipboard: ClipboardList,
  user: User,
};

function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 z-10 md:hidden"
      style={{ backgroundColor: colors.dark, borderTop: `1px solid ${colors.light}` }}
    >
      {userNavItems.map((navItem) => {
        const isActive = pathname === navItem.path || pathname.startsWith(navItem.path + "/");
        const Icon = iconMap[navItem.icon];
        return (
          <Link
            key={navItem.path}
            to={navItem.path}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <span style={{ color: isActive ? colors.accent : colors.gray }}>
              {Icon ? <Icon size={bottomNavIconSize} /> : null}
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: isActive ? colors.accent : colors.gray }}
            >
              {navItem.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
