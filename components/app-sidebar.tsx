"use client";

import {
	FolderIcon,
	InboxIcon,
	LayersIcon,
	PackageIcon,
	PanelLeftIcon,
	RefreshCwIcon,
	ShoppingCartIcon,
	TrendingUpIcon,
	UserRoundIcon,
	UsersIcon,
} from "lucide-react";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";

const navMain = [
	{
		title: "Dashboard",
		url: "/",
		icon: PanelLeftIcon,
	},
	{
		title: "Inbox",
		url: "/chat",
		icon: InboxIcon,
	},
	{
		title: "Products",
		url: "/products",
		icon: PackageIcon,
	},
	{
		title: "Customers",
		url: "/customers",
		icon: UserRoundIcon,
	},
	{
		title: "Orders",
		url: "/orders",
		icon: ShoppingCartIcon,
	},
	// {
	// 	title: "Lifecycle",
	// 	url: "#",
	// 	icon: RefreshCwIcon,
	// },
	// {
	// 	title: "Analytics",
	// 	url: "#",
	// 	icon: TrendingUpIcon,
	// },
	// {
	// 	title: "Projects",
	// 	url: "#",
	// 	icon: FolderIcon,
	// },
	// {
	// 	title: "Team",
	// 	url: "#",
	// 	icon: UsersIcon,
	// },
];

// const documents = [
// 	{
// 		name: "Data Library",
// 		url: "#",
// 	},
// 	{
// 		name: "Reports",
// 		url: "#",
// 	},
// 	{
// 		name: "Word Assistant",
// 		url: "#",
// 	},
// ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	};

	return (
		<Sidebar
			collapsible="icon"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<a href="#">
								<LayersIcon className="size-5!" />
								<span className="text-base font-semibold">Xoro Inc.</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain} />
				{/* <NavDocuments items={documents} /> */}
				{/* <NavSecondary
					items={navSecondary}
					className="mt-auto"
				/> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
