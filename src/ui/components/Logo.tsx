"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "THE SUB CLUB";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<div className="flex flex-col">
				<h1 className="flex items-center font-bold text-xl" aria-label="homepage">
					{companyName}
				</h1>
				<span className="text-xs text-neutral-500 font-normal hidden sm:block">
					Premium software & AI tools at student‑friendly prices
				</span>
			</div>
		);
	}
	return (
		<div className="flex items-center font-bold text-xl">
			<LinkWithChannel aria-label="homepage" href="/">
				{companyName}
			</LinkWithChannel>
		</div>
	);
};
