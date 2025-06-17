export default function Banner() {
	return (
		<div className="flex items-center bg-gray-800 px-6 py-3">
			<div className="block text-sm text-white">
				<strong className="font-semibold">Saleor API URL</strong>
				<span className="ml-2 rounded bg-slate-700 p-1 text-slate-200">
					<code className="inline-block">{process.env.SALEOR_API_URL}</code>
				</span>
				<div className="text-xs text-slate-400">Defined in your .env file</div>
			</div>
		</div>
	);
}
