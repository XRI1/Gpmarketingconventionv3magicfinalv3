import { cn } from "./ui/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <div className={cn("text-center space-y-1", className)}>
      <p className="text-blue-200/60 text-sm">
        &copy; 2026 Grameenphone Ltd. | All rights reserved
      </p>
    </div>
  );
}
