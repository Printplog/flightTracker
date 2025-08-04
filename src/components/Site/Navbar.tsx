import { useState } from 'react';
import SectionPadding from '../../layouts/SectionPadding';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
];

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string, closeMenu?: () => void) {
  if (href.startsWith('#')) {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (closeMenu) closeMenu();
    }
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b relative backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[999]">
      <SectionPadding className="flex justify-between items-center py-4 lg:py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* <img src="/logo.png" alt="" className='size-[30px]' /> */}
          <span className="font-bold text-xl text-foreground">MySkyRoute</span>  
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleSmoothScroll(e, link.href)}
              className={`transition-colors text-xs font-medium ${index === 0 ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-accent"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 lg:hidden bg-background backdrop-blur-lg border-b shadow-lg z-[20]">
            <SectionPadding className="py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={e => handleSmoothScroll(e, link.href, () => setIsMenuOpen(false))}
                    className={`transition-colors font-medium py-2 ${index === 0 ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SectionPadding>
          </div>
        )}
      </SectionPadding>
    </nav>
  );
}