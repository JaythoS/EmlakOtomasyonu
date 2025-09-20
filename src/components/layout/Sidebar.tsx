'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Users,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  User,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggle,
  className,
}) => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigationItems: NavItem[] = [
    {
      title: t('navigation.dashboard'),
      href: '/dashboard',
      icon: 'Home',
    },
    {
      title: t('navigation.customers'),
      href: '/customers',
      icon: 'Users',
    },
    {
      title: t('navigation.properties'),
      href: '/properties',
      icon: 'Building2',
    },
    {
      title: t('navigation.meetings'),
      href: '/meetings',
      icon: 'Calendar',
    },
    {
      title: t('navigation.reports'),
      href: '/reports',
      icon: 'BarChart3',
    },
    {
      title: t('navigation.team'),
      href: '/team',
      icon: 'Users',
    },
    {
      title: t('navigation.settings'),
      href: '/settings',
      icon: 'Settings',
    },
  ];

  const iconMap = {
    Home,
    Users,
    Building2,
    Calendar,
    BarChart3,
    Settings,
    User,
    Bell,
    HelpCircle,
  };

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-lg">Emlak CRM</span>
          </div>
        )}
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isCollapsed ? 'px-2' : 'px-3',
                  isActive && 'bg-secondary text-secondary-foreground'
                )}
              >
                <Icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
                {!isCollapsed && (
                  <span className="truncate">{item.title}</span>
                )}
                {item.badge && !isCollapsed && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start',
              isCollapsed ? 'px-2' : 'px-3'
            )}
          >
            <HelpCircle className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
            {!isCollapsed && <span>{t('navigation.help')}</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
