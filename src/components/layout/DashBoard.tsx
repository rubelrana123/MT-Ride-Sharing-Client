import React from 'react';
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';

export default function DashBoard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Total Commission"
          amount="$5,466.69"
          suffix="USD"
          icon={<CreditCard className="h-5 w-5" />}
          accent="from-indigo-600/20 to-indigo-600/0"
        />
        <DashboardCard
          title="Total Online Payment"
          amount="$3,997.74"
          suffix="USD"
          icon={<DollarSign className="h-5 w-5" />}
          accent="from-amber-600/20 to-amber-600/0"
        />
        <DashboardCard
          title="Completed Ride"
          amount="683"
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="from-emerald-600/20 to-emerald-600/0"
        />
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  amount: string;
  suffix?: string;
  icon: React.ReactNode;
  accent?: string;
};

function DashboardCard({ title, amount, suffix, icon, accent }: DashboardCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#0b1324] p-5 text-slate-100 shadow-md">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-b opacity-60" style={{ borderTopLeftRadius: 9999 }} />
      <div className={`pointer-events-none absolute -left-10 top-0 h-full w-44 rotate-12 bg-gradient-to-br ${accent || ''}`} />
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/5">{icon}</span>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="relative z-10 mt-4 flex items-end gap-2">
        <div className="text-3xl font-semibold tracking-tight">{amount}</div>
        {suffix ? <div className="pb-1 text-xs text-slate-300">{suffix}</div> : null}
      </div>
    </div>
  );
}


