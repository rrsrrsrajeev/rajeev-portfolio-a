import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { GlowGrid } from "@/components/magicui/glow-grid";
import ChatBox from "@/components/chat-box";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajeevdev.vercel.app"),
  title: {
    default: `${DATA.name} | Senior Frontend Engineer - React, Next.js & React Native`,
    template: `%s | ${DATA.name}`,
  },
  description: "Senior Frontend Engineer with 4.5+ years of experience specializing in React, Next.js, React Native, and Micro Frontends (MFE). AWS developer transitioning to Full-Stack with NestJS.",
  keywords: [
    "Rajeev Ranjan Singh",
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Micro Frontends (MFE)",
    "TypeScript Developer",
    "NestJS Full-Stack",
    "AWS Certified",
    "Bengaluru Software Engineer",
    "AI Chatbot Developer",
    "RAG",
    "Python",
    "Scikit-Learn",
    "Pandas"
  ],
  openGraph: {
    title: `${DATA.name} – Senior Frontend Engineer Portfolio`,
    description:
      "Senior Frontend Engineer specializing in high-performance web/mobile apps, microfrontends, and AWS cloud integrations.",
    url: "https://rajeevdev.vercel.app",
    siteName: `${DATA.name} Portfolio`,
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: `Portfolio Preview of ${DATA.name}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} | Senior Frontend Engineer`,
    description: "Senior Frontend Engineer specializing in React, Next.js, React Native, and Micro Frontends.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": DATA.name,
    "jobTitle": "Senior Frontend Engineer / Full-Stack Developer",
    "url": "https://rajeevdev.vercel.app",
    "sameAs": [
      DATA.url,
      "https://www.linkedin.com/in/rajeevranjanse/",
      "https://x.com/rajeev54545"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": DATA.location.split(", ")[0],
      "addressRegion": DATA.location.split(", ")[1],
      "addressCountry": "India"
    },
    "description": "Senior Software Engineer specializing in React.js, Next.js, React Native, and Microfrontends. Strong cloud experience with AWS and expanding into backend NestJS development.",
    "knowsAbout": [
      "React.js",
      "Next.js",
      "React Native",
      "Micro Frontends (MFE)",
      "TypeScript",
      "JavaScript",
      "Redux",
      "NestJS",
      "Node.js",
      "Amazon Web Services (AWS)",
      "Tailwind CSS",
      "Material UI",
      "Unit Testing",
      "Jest",
      "Docker",
      "Jenkins",
      "Retrieval-Augmented Generation (RAG)",
      "Artificial Intelligence",
      "Scikit-Learn",
      "Pandas",
      "Python"
    ],
    "worksFor": DATA.work.map((job) => ({
      "@type": "Organization",
      "name": job.company
    })),
    "alumniOf": DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      "name": edu.school
    }))
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            <GlowGrid />
            <ChatBox />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
