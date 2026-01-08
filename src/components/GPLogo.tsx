import gpLogo from 'figma:asset/f67043b176b14f66a0ac56aa05988d5a201fdc50.png';

export function GPLogo({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Optional Glow Effect behind logo */}
      <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-50 pointer-events-none" />
      
      <img 
        src={gpLogo} 
        alt="Magic Is You Logo" 
        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]" 
      />
    </div>
  );
}
