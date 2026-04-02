import { Link, useLocation } from "react-router-dom";
import { userNavItems } from "../../constants/navItems";
import colors from "../../styles/colors";

function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 z-10 md:hidden"
      style={{ backgroundColor: colors.dark, borderTop: `1px solid ${colors.light}` }}
    >
      {userNavItems.map((navItem) => {
        const isActive = pathname === navItem.path;
        return (
          <Link
            key={navItem.path}
            to={navItem.path}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <span className="text-xl">{navItem.icon}</span>
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
