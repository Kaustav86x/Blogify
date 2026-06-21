// src/components/PageLoader.jsx
export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
}