
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
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
          <NavLink to="/map" active={isActive("/map")}>
            Map
          </NavLink>
          <NavLink to="/contact" active={isActive("/contact")}>
            Contact
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="md:hidden">
      <div className="flex items-center space-x-2">
        
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
            <MobileNavLink to="/map">Map</MobileNavLink>
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