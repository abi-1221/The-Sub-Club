import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="relative flex w-full items-center justify-between py-2" aria-label="Main navigation">

			{/* Left: Navigation Links */}
			<div className="flex-1">
				<ul className="hidden gap-4 md:flex lg:gap-8">
					<NavLinks />
				</ul>
				<div className="md:hidden">
					<MobileMenu>
						<SearchBar channel={channel} />
						<NavLinks />
					</MobileMenu>
				</div>
			</div>

			{/* Center: 3D Logo Placeholder */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
				<div className="flex flex-col items-center justify-center">
					<div className="h-12 w-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold tracking-widest text-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
						THE SUB CLUB
					</div>
				</div>
			</div>

			{/* Right: Actions (Search, Profile, Cart) */}
			<div className="flex-1 flex items-center justify-end gap-4 lg:gap-6">
				<div className="hidden lg:block w-64">
					<SearchBar channel={channel} />
				</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>
		</nav>
	);
};
