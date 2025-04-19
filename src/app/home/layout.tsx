import { NavProvider } from "@/app/home/context";
import HomeLayout from "@/components/layouts/home";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<NavProvider>
			<HomeLayout>{children}</HomeLayout>
		</NavProvider>
	);
}
