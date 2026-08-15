const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];
  
  export default function Navbar() {
    return (
      <header className="navbar">
        <a href="#" className="nav-logo">
          AJAY<span>.</span>
        </a>
  
        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
  
        <a href="#contact" className="nav-connect">
          Let&apos;s Talk
        </a>
      </header>
    );
  }