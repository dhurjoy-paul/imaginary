export default function loading() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-b-3 border-white" />
      </div>
    </div>
  );
}