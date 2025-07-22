
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Determine if the current theme is dark
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, [theme]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // If system theme, toggle to the opposite of current appearance
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Gauri Sharma
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive("/")}>
            Home
          </NavLink>
          <NavLink to="/about" active={isActive("/about")}>
            About
          </NavLink>
          <NavLink to="/projects" active={isActive("/projects")}>
            Projects
          </NavLink>
          <NavLink to="/blog" active={isActive("/blog")}>
            Blog
          </NavLink>
          <NavLink to="/contact" active={isActive("/contact")}>
            Contact
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden md:flex"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  active, 
  children 
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <Link
      to={to}
      className={`relative py-2 transition-colors hover:text-primary ${
        active 
          ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" 
          : "text-foreground/80"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    // Determine if the current theme is dark
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // If system theme, toggle to the opposite of current appearance
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span 
              className={`block h-0.5 bg-foreground transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`} 
            />
            <span 
              className={`block h-0.5 bg-foreground transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`} 
            />
            <span 
              className={`block h-0.5 bg-foreground transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`} 
            />
          </div>
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/projects">Projects</MobileNavLink>
            <MobileNavLink to="/blog">Blog</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`py-2 ${
        active ? "text-primary font-medium" : "text-foreground/80"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;