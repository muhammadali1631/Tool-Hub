import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - ToolHub | Get in Touch",
  description:
    "Have questions, suggestions, or feedback? Contact the ToolHub team. We'd love to hear from you.",
  alternates: { canonical: "https://toolhub1.vercel.app/contact" },
  openGraph: {
    title: "Contact Us - ToolHub",
    description:
      "Get in touch with the ToolHub team for questions, suggestions, or bug reports.",
    type: "website",
    url: "https://toolhub1.vercel.app/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - ToolHub",
    description: "Get in touch with the ToolHub team.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}