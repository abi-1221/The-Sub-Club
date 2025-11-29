import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel, isScrolled }: { channel: string; isScrolled: boolean }) => {
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

			{/* Center: Search Bar (Dynamic Position) */}
			<div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${isScrolled ? "top-1/2 -translate-y-1/2 opacity-0 pointer-events-none" : "top-[140%] w-full max-w-md opacity-100"}`}>
				<div className="w-full">
					<SearchBar channel={channel} />
				</div>
			</div>

			{/* Right: Actions (Search, Profile, Cart) */}
			<div className="flex-1 flex items-center justify-end gap-4 lg:gap-6">
				{/* Search Bar in Header (Visible only when scrolled) */}
				<div className={`hidden lg:block w-64 transition-all duration-500 ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
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
