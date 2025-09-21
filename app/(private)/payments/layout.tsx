import CreatePaymentButton from "@/components/payments/CreatePaymentButton";
import UserMenu from "@/components/UserMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-gray-200 rounded-2xl shadow-lg py-4 px-6 flex flex-col gap-2 items-center">
        <div className="flex items-center justify-between w-full">
          <img
            src="/tadim-logo.webp"
            alt="Tadım Logo"
            className="w-24 h-24 object-contain drop-shadow-lg"
          />
          <UserMenu />
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide font-sans text-neutral-800">
          Günlük Satış Paneli
        </h1>
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-xl font-bold">Ödemeler</h2>
          <CreatePaymentButton />
        </div>
        {children}
        <div className="mt-6 text-xs text-center">
          © {new Date().getFullYear()} Ek-Pa. All rights reserved.
        </div>
      </div>
    </section>
  );
}
