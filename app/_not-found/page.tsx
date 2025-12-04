"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Page introuvable</h1>
        <p>La page que vous recherchez n’existe pas.</p>
      </main>
    </div>
  );
}
