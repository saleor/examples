export default function RootPage() {
	return (
		<div>
			<h1 className="mb-8 text-5xl font-bold">Saleor Klarna Next.js example</h1>
			<p className="mb-4 text-2xl">Select one of the approaches:</p>
			<ul className="flex flex-row flex-wrap gap-x-4">
				<li>
					<a
						href="/app-router"
						className="flex h-36 w-72 items-center justify-center rounded-md border text-2xl font-bold shadow-md transition-shadow hover:shadow-lg"
					>
						Next.js App Router
					</a>
				</li>
				{/* @todo <li>
					<Link
						href="/pages-router"
						className="flex h-36 w-72 items-center justify-center rounded-md border text-2xl font-bold shadow-md transition-shadow hover:shadow-lg"
					>
						Next.js Pages Router
					</Link>
				</li> */}
			</ul>
		</div>
	);
}
