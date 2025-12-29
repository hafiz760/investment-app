import React from "react";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">More</h1>
      <div className="bg-card rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 border border-dashed">
        <div className="text-4xl">🏗️</div>
        <p className="text-muted-foreground">
          This section is currently under development.
        </p>
      </div>
    </div>
  );
}
