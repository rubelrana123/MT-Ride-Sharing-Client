export default function Overview() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="text-muted-foreground">Welcome to your ride-sharing dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border p-4">Total Rides</div>
        <div className="rounded-lg border border-border p-4">Active Drivers</div>
        <div className="rounded-lg border border-border p-4">Earnings</div>
      </div>
    </div>
  );
}


