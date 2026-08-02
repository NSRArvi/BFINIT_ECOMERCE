import { NavLink } from "react-router";
import useBasePath from "@/hooks/useBasePath";

export default function LandingHeaderMobile({ navLinks, handleToggle }) {
  const basePath = useBasePath();

  return (
    <div className="bg-background fixed h-full w-full lg:hidden">
      <nav className="border-border flex flex-col border-t">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={`${basePath}${link.href}`}
            onClick={handleToggle}
            className={({ isActive }) =>
              `border-border hover:bg-accent flex items-center border-b px-6 py-4 text-base font-medium transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
