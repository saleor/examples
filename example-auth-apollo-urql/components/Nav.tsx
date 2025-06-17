import Link from "next/link";

export async function Nav() {
  return (
    <div className="border-b sticky top-0 bg-gray-200 z-20">
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex h-16 justify-between">
          <div className="flex px-2">
            <div className="flex items-center font-bold">
              <Link href="/">Examples</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
