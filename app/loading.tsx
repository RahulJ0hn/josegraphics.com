export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-32"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-px w-24 bg-primary/40">
        <div className="h-px w-1/2 animate-pulse bg-primary" />
      </div>
    </div>
  );
}
