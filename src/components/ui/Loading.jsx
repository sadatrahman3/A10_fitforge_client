import { Dumbbell } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative">
        <Dumbbell size={48} className="text-primary animate-bounce" />
      </div>
      <p className="text-muted text-sm">Loading...</p>
    </div>
  );
}
