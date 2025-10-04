import * as React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", ...props }, ref) => {
  return (
    <button
      className={`bg-black text-white py-2 px-4 rounded-md hover:bg-neutral-800 transition ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";