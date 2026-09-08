'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',            label: 'Overview' },
  { href: '/maps',        label: 'Maps' },
  { href: '/guns',        label: 'Weapons' },
  { href: '/zones',       label: 'Zone Timers' },
  { href: '/esports',     label: 'Esports' },
  { href: '/team-stats',  label: 'Team Stats' },
  { href: '/international', label: 'Global Stats' },
  { href: '/rankings',    label: 'Pro Rankings' },
  { href: '/sensitivity', label: 'Sensitivity' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/95 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Mark with Rich Colors */}
          <Link href="/" className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-orange-500/20 tracking-tighter">
              B
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                <span className="text-orange-400">BGMI</span>
                <span className="text-white">Breakdown</span>
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-amber-300/80 font-medium">
                Competitive Dossier
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Larger, Clear Fonts */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                    active
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Functional Meta Badge & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Version 4.5 Live (Upcoming 4.6)</span>
            </div>

            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0e1424] px-4 py-4 space-y-1.5 shadow-xl">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  active
                    ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
