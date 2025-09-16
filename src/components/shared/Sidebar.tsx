import React, { useMemo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, ChevronRight, LayoutDashboard, Users, Car, Settings, BellRing, Star, MessageSquare, ShieldAlert } from 'lucide-react';

// Dummy nav items (collapsible and non-collapsible)
// Each item can have optional children for collapsible behaviour
type NavItem = {
  id: string;
  label: string;
  to?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: Array<NavItem>;
};

const buildNavItems = (): Array<NavItem> => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    to: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    id: 'rides',
    label: 'Manage Rides',
    icon: <Car className="h-4 w-4" />,
    children: [
      { id: 'rides-all', label: 'All Rides', to: '/dashboard/rides' },
      { id: 'rides-completed', label: 'Completed', to: '/dashboard/rides?status=completed' },
      { id: 'rides-pending', label: 'Pending', to: '/dashboard/rides?status=pending' },
    ],
  },
  {
    id: 'system',
    label: 'System Setup',
    icon: <Settings className="h-4 w-4" />,
    children: [
      { id: 'fare', label: 'Fare Rules', to: '/dashboard/system/fare' },
      { id: 'zones', label: 'Zones', to: '/dashboard/system/zones' },
    ],
  },
  {
    id: 'reviews',
    label: 'All Reviews',
    to: '/dashboard/reviews',
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: 'notify',
    label: 'Promotional Notify',
    to: '/dashboard/notify',
    icon: <BellRing className="h-4 w-4" />,
  },
  {
    id: 'riders',
    label: 'Manage Riders',
    icon: <Users className="h-4 w-4" />,
    badge: (
      <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[10px] font-semibold text-amber-400">
        !
      </span>
    ),
    children: [
      { id: 'riders-list', label: 'Rider List', to: '/dashboard/riders' },
      { id: 'riders-issues', label: 'Issues', to: '/dashboard/riders/issues' },
    ],
  },
  {
    id: 'drivers',
    label: 'Manage Drivers',
    icon: <Users className="h-4 w-4" />,
    badge: (
      <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[10px] font-semibold text-amber-400">
        !
      </span>
    ),
    children: [
      { id: 'drivers-list', label: 'Driver List', to: '/dashboard/drivers' },
      { id: 'drivers-apps', label: 'Applications', to: '/dashboard/drivers/applications' },
      { id: 'drivers-flags', label: 'Flags', to: '/dashboard/drivers/flags' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    to: '/dashboard/reports',
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    to: '/dashboard/feedback',
    icon: <MessageSquare className="h-4 w-4" />,
  },
];

type SidebarProps = {
  visible: boolean;
  onClose?: () => void;
};

export default function Sidebar({ visible }: SidebarProps) {
  const location = useLocation();
  const items = useMemo(() => buildNavItems(), []);
  const defaultOpen: Record<string, boolean> = useMemo(() => {
    const acc: Record<string, boolean> = {};
    items.forEach((i) => {
      if (i.children?.length) acc[i.id] = false;
    });
    return acc;
  }, [items]);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(defaultOpen);

  const toggle = (id: string) => setExpandedMap((s) => ({ ...s, [id]: !s[id] }));

  const isActive = (to?: string) => !!to && location.pathname.startsWith(to);

  // Expand the branch if any child is active
  useEffect(() => {
    const next = { ...defaultOpen };
    items.forEach((i) => {
      if (i.children?.length) {
        const hasActiveChild = i.children.some((c) => isActive(c.to));
        if (hasActiveChild) next[i.id] = true;
      }
    });
    setExpandedMap((s) => ({ ...s, ...next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <aside
      className={`sidebar fixed inset-y-0 overflow-y-auto left-0 z-40 h-screen w-72 transform bg-[#0b1324] text-slate-200 shadow-xl transition-transform duration-300 ${
        visible ? 'translate-x-0' : '-translate-x-full'
      }`}
      role="complementary"
    >
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">R</div>
        <div className="text-lg font-semibold tracking-wide">OVOride</div>
      </div>
      <nav className="mt-2 space-y-1 px-2">
        {items.map((item) => {
          const hasChildren = !!item.children?.length;
          const branchActive = hasChildren && item.children!.some((c) => isActive(c.to));
          if (!hasChildren) {
            return (
              <Link
                key={item.id}
                to={item.to || '#'}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5 ${
                  isActive(item.to) ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-slate-300'
                }`}
              >
                <span className="text-slate-300">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge}
              </Link>
            );
          }

          const expanded = expandedMap[item.id];
          return (
            <div key={item.id} className="rounded-md">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                  expanded || branchActive ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-slate-300'
                }`}
              >
                <span className="text-slate-300">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge}
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <div
                className={`ml-8 overflow-hidden transition-all duration-300 ${expanded ? 'mt-1' : ''}`}
                style={{ maxHeight: expanded ? 320 : 0 }}
              >
                <div className="space-y-1 border-l border-white/10 pl-3">
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      to={child.to || '#'}
                      className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-white/5 ${
                        isActive(child.to) ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-slate-300'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}