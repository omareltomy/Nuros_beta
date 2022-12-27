export default function MaxWidthWrapper({ children }: { children: React.ReactNode }) {
    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
  }