import Link from "next/link";

export function ExampleLink({ name, href, children }: { name: string; href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group rounded border border-slate-400 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className="mb-3 text-2xl font-semibold">{name}</h2>
      <p className={`m-0 text-sm opacity-50`}>{children}</p>
    </Link>
  );
}
