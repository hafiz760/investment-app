import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import LiveInvestmentToast from "@/components/LiveInvestment/LiveInvestmentToast";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <div className="min-h-screen">{children}</div>
      <LiveInvestmentToast />

      <Footer />
    </>
  );
}
