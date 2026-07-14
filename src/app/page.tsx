/* eslint-disable react/no-unescaped-entities */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import SkillsSection from "@/components/SkillsSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-2">
              <div className="inline-flex items-center gap-x-2 sm:gap-x-3 flex-wrap">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 pb-1"
                  yOffset={8}
                  text={`Hi, I am ${DATA.name.split(" ")[0]}`}
                />
                <span className="relative -top-2 ml-4 inline-block select-none animate-wave-mirrored">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="size-8 sm:size-12 xl:size-14 inline-block select-none overflow-visible"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="neonHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#a855f7" />
                        <stop offset="50%" stop-color="#ec4899" />
                        <stop offset="100%" stop-color="#3b82f6" />
                      </linearGradient>
                      {/* Mask to carve a gap between thumb and index finger/palm */}
                      <mask id="thumbGapMask">
                        <rect x="-10" y="-10" width="44" height="44" fill="white" />
                        <path 
                          d="M 8.2 13.0 C 7.5 14.5, 6.0 16.0, 4.0 16.8" 
                          stroke="black" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                          fill="none" 
                        />
                      </mask>
                    </defs>
                    {/* Google Material Design Waving Hand Icon with thumb mask applied */}
                    <path 
                      d="M23 17c0 3.31-2.69 6-6 6v-1.5c2.48 0 4.5-2.02 4.5-4.5H23zM1 7c0-3.31 2.69-6 6-6v1.5C4.52 2.5 2.5 4.52 2.5 7H1zm7.01-2.68-4.6 4.6c-3.22 3.22-3.22 8.45 0 11.67s8.45 3.22 11.67 0l7.07-7.07c.49-.49.49-1.28 0-1.77a1.25 1.25 0 0 0-1.77 0l-4.42 4.42-.71-.71 6.54-6.54c.49-.49.49-1.28 0-1.77s-1.28-.49-1.77 0l-5.83 5.83-.71-.71 6.89-6.89c.49-.49.49-1.28 0-1.77s-1.28-.49-1.77 0l-6.89 6.89-.69-.7 5.48-5.48c.49-.49.49-1.28 0-1.77s-1.28-.49-1.77 0l-7.62 7.62a4.003 4.003 0 0 1-.33 5.28l-.71-.71a3 3 0 0 0 0-4.24l-.35-.35 4.07-4.07c.49-.49.49-1.28 0-1.77a1.27 1.27 0 0 0-1.78.01z" 
                      fill="url(#neonHandGrad)"
                      mask="url(#thumbGapMask)"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <BlurFadeText
                  className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
                  delay={BLUR_FADE_DELAY * 1.5}
                  text={DATA.description.split(" | ")[0]}
                />
                <BlurFadeText
                  className="max-w-[600px] text-xs sm:text-sm text-muted-foreground font-medium"
                  delay={BLUR_FADE_DELAY * 2}
                  text={DATA.description.split(" | ").slice(1).join(" | ")}
                />
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-36 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: DATA.summary }}
            className="text-sm text-muted-foreground font-sans"
          />
        </BlurFade>
      </section>
      <SkillsSection />
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={work.company + id}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                // href={work.href}
                // badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
                defaultExpanded={id === 0}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">My Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my latest work</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div className="flex flex-col items-center space-y-8 py-12">
          <h2 className="text-3xl font-bold">What People Say</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DATA.testimonials?.map((testimonial, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm bg-background dark:bg-muted text-sm"
              >
                <p className="italic">"{testimonial.quote}"</p>
                <p className="mt-2 text-right font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-6 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Contact</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <div className="mx-auto max-w-[600px] text-muted-foreground space-y-4 text-base md:text-xl">
                <p>
                  📞 Call: <a href="tel:+918541849528" className="text-blue-500 hover:underline">+91 85418 49528</a>
                </p>
                <p>
                  💬 WhatsApp: <a href="https://wa.me/918541849528" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Message on WhatsApp</a>
                </p>
                <p>
                  📧 Email: <a href="mailto:rrsrrsrajeev@gmail.com" className="text-blue-500 hover:underline">rrsrrsrajeev@gmail.com</a>
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 dark:bg-muted dark:text-white dark:border-gray-600 dark:hover:bg-muted/60"
                >
                  📄 Download Resume
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
