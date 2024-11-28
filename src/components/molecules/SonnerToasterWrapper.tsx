import { Toaster as SonnerToaster, toast as baseToast } from "sonner";
import "./style.css";

interface ToastOptions {
  type?: "success" | "error" | "warning" | "info"; // Add types
  description?: string; // Add description
  action?: {
    label: string;
    onClick: () => void;
  }; // Add action support
  duration?: number;
}

export const SonnerToasterWrapper = (message: string, options?: ToastOptions) => {
  const { type, description, action, duration } = options || {};

  baseToast(message, {
    description,
    action,
    className: `toast-${type || "default"}`, // Add class for styling
    duration: duration ?? 3500,
  });
};

export const CustomSonnerToaster = () => {
  // it is added to layout.tsx
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast: "rounded-lg shadow-lg text-lg font-bold ", // Base toast classes
          description: "text-sm font-regular", // Style for the description
          actionButton: "px-4 py-2 bg-white text-black rounded-md", // Style for the action button
        },
      }}
    />
  );
};
