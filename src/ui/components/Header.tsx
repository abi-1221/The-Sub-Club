"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Nav } from "./nav/Nav";

export function Header({ channel, cart }: { channel: string; cart: ReactNode }) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={`sticky top-0 z-20 bg-neutral-100/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-sm" : ""}`}>
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className={`flex flex-col transition-all duration-300 ${isScrolled ? "h-16 justify-center" : "h-32 justify-end pb-4"}`}>
					<div className="relative flex items-center justify-between w-full">

						{/* Left: Mobile Menu (Hidden on Desktop) */}
						<div className="md:hidden">
							{/* Mobile menu trigger is inside Nav */}
						</div>

						{/* Center: Logo */}
						<div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isScrolled ? "scale-75 origin-center" : "scale-100 -translate-y-[60%]"}`}>
							<div className="flex flex-col items-center justify-center">
								<div className="h-12 w-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold tracking-widest text-xl cursor-pointer">
									THE SUB CLUB
								</div>
							</div>
						</div>

						{/* Right: Nav Actions & Search */}
						<div className="w-full">
							<Nav channel={channel} isScrolled={isScrolled} cart={cart} />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
