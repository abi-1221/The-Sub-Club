import { Suspense, type ReactNode } from "react";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel, isScrolled, cart, userMenu }: { channel: string; isScrolled: boolean; cart: ReactNode; userMenu: ReactNode }) => {
	return (
		<nav className="relative flex w-full items-center justify-between" aria-label="Main navigation">

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

			{/* Search Bar (Dynamic Position - Right below icons) */}
			<div className={`absolute right-0 transition-all duration-500 ease-in-out ${isScrolled ? "top-1/2 -translate-y-1/2 opacity-0 invisible" : "top-full mt-2 w-80 opacity-100 visible"}`}>
				<div className="w-full">
					<SearchBar channel={channel} />
				</div>
			</div>

			{/* Right: Actions (Search, Profile, Cart) */}
			<div className="flex-1 flex items-center justify-end gap-4 lg:gap-6">
				{/* Search Bar in Header (Visible only when scrolled) */}
				<div className={`hidden lg:block w-64 transition-all duration-500 ${isScrolled ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}>
					<SearchBar channel={channel} />
				</div>

				<Suspense fallback={<div className="w-8" />}>
					{userMenu}
				</Suspense>
				<Suspense fallback={<div className="w-6" />}>
					{cart}
				</Suspense>
			</div>
		</nav>
	);
};
