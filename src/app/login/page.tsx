import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFB] px-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "rounded-2xl border border-[#DDE3EA] shadow-sm",
            headerTitle: "text-[#1A2517]",
            formButtonPrimary:
              "bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white rounded-xl",
            footerActionLink: "text-[#4FC3E7]",
          },
        }}
      />
    </main>
  );
}
