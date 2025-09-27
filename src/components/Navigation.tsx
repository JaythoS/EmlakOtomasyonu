"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  MessageCircle, 
  Building, 
  Settings, 
  Phone, 
  BarChart3,
  Menu,
  X,
  User
} from 'lucide-react';

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'WhatsApp',
      href: '/whatsapp',
      icon: MessageCircle,
    },
    // MVP için gizlendi - ileride aktifleştirilecek
    // {
    //   name: 'Soğuk Arama',
    //   href: '/cold-calling',
    //   icon: Phone,
    // },
    // {
    //   name: 'Mülkler',
    //   href: '/properties',
    //   icon: Building,
    // },
    {
      name: 'Ayarlar',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4 shadow-lg">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Building className="h-8 w-8 text-blue-400" />
            <span className="ml-3 text-xl font-bold text-white">Emlak Otomasyonu</span>
          </div>

          {/* User Profile */}
          <div className="modern-card p-4 mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Hoş geldin, Admin</p>
                <p className="text-xs text-gray-400">Emlak Uzmanı</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`${
                            isActive
                              ? 'bg-blue-900 text-blue-300 border-r-2 border-blue-400'
                              : 'text-gray-300 hover:text-blue-300 hover:bg-gray-700'
                          } group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200`}
                        >
                          <Icon className={`${
                            isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
                          } h-5 w-5 shrink-0`} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>

          {/* Stats Card */}
          <div className="modern-card p-4 stat-card-gradient-1 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Bu ay</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs opacity-75">Emlak satışı</p>
              </div>
              <BarChart3 className="h-8 w-8 opacity-80" />
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-sidebar px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-300 lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          <Building className="h-6 w-6 text-blue-400 inline mr-2" />
          Emlak Otomasyonu
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80"></div>
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Menüyü kapat"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Building className="h-8 w-8 text-blue-400" />
                  <span className="ml-3 text-xl font-bold text-white">Emlak Otomasyonu</span>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigationItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          
                          return (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`${
                                  isActive
                                    ? 'bg-blue-900 text-blue-300'
                                    : 'text-gray-300 hover:text-blue-300 hover:bg-gray-700'
                                } group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium`}
                              >
                                <Icon className={`${
                                  isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
                                } h-5 w-5 shrink-0`} />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
