import { createFileRoute } from "@tanstack/react-router";
import {
  Train,
  Pill,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Upload,
  Clock,
  Lock,
  ChevronRight,
  HeartPulse,
  Menu,
  X,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Health On Track | Medicine Delivery During Train Journeys" },
      {
        name: "description",
        content:
          "Health On Track is a railway-focused digital platform that enables passengers to order medicines during train travel and receive them at an upcoming railway station.",
      },
      {
        property: "og:title",
        content: "Health On Track | Medicine Delivery During Train Journeys",
      },
      {
        property: "og:description",
        content:
          "Order medicines during train travel and receive them at an upcoming railway station with Health On Track.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const steps = [
  {
    icon: Train,
    title: "Enter PNR or Train Number",
    description:
      "Share your journey details so we can map your route and upcoming stops.",
  },
  {
    icon: Pill,
    title: "Search Medicines",
    description:
      "Browse or search for the medicines and healthcare essentials you need.",
  },
  {
    icon: MapPin,
    title: "Smart Station Selection",
    description:
      "Our SSSE recommends the best station for delivery based on timing and availability.",
  },
  {
    icon: HeartPulse,
    title: "Pharmacy Prepares Order",
    description:
      "Verified partner pharmacies verify your prescription and pack your medicines.",
  },
  {
    icon: Lock,
    title: "Collect with OTP",
    description:
      "Pick up your order at the selected station using a secure one-time password.",
  },
];

const features = [
  {
    icon: Train,
    title: "Journey-Based Medicine Delivery",
    description:
      "Medicines are planned around your train route, ensuring you never miss a dose.",
  },
  {
    icon: MapPin,
    title: "Smart Station Selection Engine",
    description:
      "AI-driven recommendations choose the ideal station for quick, reliable pickup.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Pharmacies",
    description:
      "Every pharmacy partner is licensed, verified, and quality-checked for safety.",
  },
  {
    icon: Upload,
    title: "Prescription Upload",
    description:
      "Upload your prescription in seconds and our team validates it securely.",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description:
      "Track your order from pharmacy packing to station arrival in real time.",
  },
  {
    icon: PackageCheck,
    title: "Secure OTP Delivery",
    description:
      "Your medicine is handed over only after a secure OTP verification at the station.",
  },
];

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-primary">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse size={20} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Health On Track
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border md:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-accent/40 to-background pb-20 pt-16 sm:pt-24 lg:pb-28 lg:pt-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Train size={16} />
              <span>Healthcare for Indian Railways</span>
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Medicine Delivery{" "}
              <span className="text-primary">During Train Journeys</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Health On Track is a railway-focused digital platform that enables
              passengers to order medicines during train travel and receive
              them at an upcoming railway station.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
              >
                Get Started
                <ChevronRight size={18} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-background px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-primary/5"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Simple Process
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From PNR to pickup — five simple steps to get your medicine on
              track.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon size={24} />
                </div>
                <div className="absolute right-4 top-4 text-2xl font-bold text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Features
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built for passengers, powered by verified pharmacies, and guided
              by smart railway logistics.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section id="about" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 sm:p-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-background p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-primary">500+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Stations Covered</div>
                </div>
                <div className="rounded-2xl bg-background p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-secondary">98%</div>
                  <div className="mt-1 text-sm text-muted-foreground">On-Time Delivery</div>
                </div>
                <div className="rounded-2xl bg-background p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-primary">10k+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Happy Passengers</div>
                </div>
                <div className="rounded-2xl bg-background p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-secondary">24/7</div>
                  <div className="mt-1 text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                About Health On Track
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Bringing Healthcare to Every Railway Journey
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Millions of Indians travel by train every day. Access to
                medicines during long journeys can be unpredictable. Health On
                Track bridges that gap by connecting passengers with verified
                pharmacies at railway stations along their route.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Whether it is a forgotten prescription, a sudden need, or
                chronic medication, our platform ensures your healthcare stays
                on track — station to station.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Us
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Never miss your medicine on the move.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
                Join thousands of passengers who trust Health On Track for
                safe, timely medicine delivery during train journeys.
              </p>
              <a
                href="#how-it-works"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-background px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-colors hover:bg-background/90"
              >
                Start Your Order
                <ChevronRight size={18} />
              </a>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-primary">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <HeartPulse size={20} strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold tracking-tight text-foreground">
                  Health On Track
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                India's first railway-focused medicine delivery platform. We
                keep your health on track, one station at a time.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="mailto:hello@healthontrack.in" className="flex items-center gap-2 hover:text-primary">
                  <Mail size={16} /> hello@healthontrack.in
                </a>
                <a href="tel:+911800123456" className="flex items-center gap-2 hover:text-primary">
                  <Phone size={16} /> 1800-123-456
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-primary">Home</a></li>
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary">How it Works</a></li>
                <li><a href="#about" className="hover:text-primary">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Health On Track. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
