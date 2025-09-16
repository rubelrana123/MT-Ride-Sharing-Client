import { useState } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import DashBoard from '@/components/layout/DashBoard';

export default function DashBoardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0a1020] text-foreground">
      <Sidebar visible={sidebarOpen} />
      <div className="flex">
        <main className={`min-h-screen flex-1 bg-[#0f1831] ${sidebarOpen ? "pl-72" : "pl-0"} transition-[padding] duration-300`}>
          <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/5 bg-[#0f1831]/80 px-4 py-3 backdrop-blur">
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <span className="i-lucide:panel-left-open">☰</span>
              <span>Menu</span>
            </button>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </header>
          <DashBoard />
        </main>
      </div>
    </div>
  );
}
