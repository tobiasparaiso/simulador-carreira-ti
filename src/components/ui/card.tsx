import * as React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-3">{children}</div>
);