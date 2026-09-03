import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/courses", label: "Courses" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/dashboard" className="flex items-baseline gap-1">
          <span className="font-serif text-xl italic text-ink">Fieldnote</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-brass sm:inline-block" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-[15px] transition-colors ${
                  isActive ? "text-ink" : "text-ink/50 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            className="border border-ink px-4 py-1.5 font-sans text-[15px] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Sign out
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 pb-5 pt-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b border-line py-3 font-sans text-[15px] ${
                  isActive ? "text-ink" : "text-ink/60"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="py-3 font-sans text-[15px] text-brass"
          >
            Sign out
          </Link>
        </nav>
      )}
    </header>
  );
}
