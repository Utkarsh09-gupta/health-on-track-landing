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
  Plus,
  Minus,
  Search,
  FileText,
  ShoppingCart,
  LayoutDashboard,
  Package,
  User,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Play,
  Pause,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";

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

// Mock Medicine Catalog
type Medicine = {
  id: string;
  name: string;
  brand: string;
  form: string;
  price: number;
  rx: boolean;
};

const MEDICINES: Medicine[] = [
  { id: "m1", name: "Paracetamol 650mg", brand: "Dolo", form: "Strip of 15 tablets", price: 32, rx: false },
  { id: "m2", name: "ORS Electrolyte Powder", brand: "Electral", form: "Sachet, 21.8g", price: 22, rx: false },
  { id: "m3", name: "Pantoprazole 40mg", brand: "Pantocid", form: "Strip of 10 tablets", price: 96, rx: true },
  { id: "m4", name: "Cetirizine 10mg", brand: "Cetzine", form: "Strip of 10 tablets", price: 28, rx: false },
  { id: "m5", name: "Insulin Glargine", brand: "Lantus", form: "3ml cartridge", price: 845, rx: true },
  { id: "m6", name: "Digital Thermometer", brand: "Dr. Trust", form: "1 unit", price: 199, rx: false },
  { id: "m7", name: "Antiseptic Bandage Kit", brand: "Handyplast", form: "Pack of 20", price: 145, rx: false },
  { id: "m8", name: "Salbutamol Inhaler", brand: "Asthalin", form: "200 MDI", price: 128, rx: true },
];

type CartLine = { medicine: Medicine; qty: number };

type StationStop = {
  code: string;
  name: string;
  haltMinutes: number;
  scheduledArrival: string;
  pharmaciesCount: number;
  stockStatus: "in-stock" | "partial" | "out-of-stock";
  distanceKm: number;
};

type TrainRoute = {
  number: string;
  name: string;
  stops: StationStop[];
};

const TRAIN_ROUTES: Record<string, TrainRoute> = {
  "12952": {
    number: "12952",
    name: "Mumbai Rajdhani Express",
    stops: [
      { code: "MMCT", name: "Mumbai Central", haltMinutes: 0, scheduledArrival: "17:00", pharmaciesCount: 5, stockStatus: "in-stock", distanceKm: 0 },
      { code: "ST", name: "Surat", haltMinutes: 3, scheduledArrival: "19:43", pharmaciesCount: 4, stockStatus: "in-stock", distanceKm: 263 },
      { code: "BRC", name: "Vadodara Junction", haltMinutes: 10, scheduledArrival: "21:01", pharmaciesCount: 6, stockStatus: "in-stock", distanceKm: 392 },
      { code: "RTM", name: "Ratlam Junction", haltMinutes: 2, scheduledArrival: "00:40", pharmaciesCount: 2, stockStatus: "partial", distanceKm: 653 },
      { code: "KOTA", name: "Kota Junction", haltMinutes: 10, scheduledArrival: "03:15", pharmaciesCount: 3, stockStatus: "in-stock", distanceKm: 920 },
      { code: "NDLS", name: "New Delhi", haltMinutes: 0, scheduledArrival: "08:30", pharmaciesCount: 10, stockStatus: "in-stock", distanceKm: 1386 },
    ],
  },
  "12002": {
    number: "12002",
    name: "NDLS Bhopal Shatabdi",
    stops: [
      { code: "NDLS", name: "New Delhi", haltMinutes: 0, scheduledArrival: "06:00", pharmaciesCount: 10, stockStatus: "in-stock", distanceKm: 0 },
      { code: "MTJ", name: "Mathura Junction", haltMinutes: 2, scheduledArrival: "07:19", pharmaciesCount: 3, stockStatus: "in-stock", distanceKm: 141 },
      { code: "AGC", name: "Agra Cantt", haltMinutes: 5, scheduledArrival: "07:50", pharmaciesCount: 5, stockStatus: "in-stock", distanceKm: 195 },
      { code: "GWL", name: "Gwalior Junction", haltMinutes: 2, scheduledArrival: "09:23", pharmaciesCount: 2, stockStatus: "partial", distanceKm: 313 },
      { code: "VGLJ", name: "VGL Jhansi Junction", haltMinutes: 8, scheduledArrival: "10:43", pharmaciesCount: 4, stockStatus: "in-stock", distanceKm: 411 },
      { code: "BPL", name: "Bhopal Junction", haltMinutes: 0, scheduledArrival: "14:40", pharmaciesCount: 7, stockStatus: "in-stock", distanceKm: 703 },
    ],
  },
};

function getRouteForTrain(trainNumber: string): TrainRoute {
  if (TRAIN_ROUTES[trainNumber]) {
    return TRAIN_ROUTES[trainNumber];
  }
  const name = `Express ${trainNumber || "10000"}`;
  return {
    number: trainNumber,
    name,
    stops: [
      { code: "START", name: "Origin Station", haltMinutes: 0, scheduledArrival: "10:00", pharmaciesCount: 3, stockStatus: "in-stock", distanceKm: 0 },
      { code: "STN1", name: "Intermediate Hub A", haltMinutes: 3, scheduledArrival: "12:30", pharmaciesCount: 2, stockStatus: "in-stock", distanceKm: 120 },
      { code: "STN2", name: "Junction Station B", haltMinutes: 12, scheduledArrival: "14:45", pharmaciesCount: 5, stockStatus: "in-stock", distanceKm: 280 },
      { code: "STN3", name: "Central Terminal C", haltMinutes: 4, scheduledArrival: "18:15", pharmaciesCount: 4, stockStatus: "partial", distanceKm: 450 },
      { code: "DEST", name: "Destination Station", haltMinutes: 0, scheduledArrival: "22:00", pharmaciesCount: 6, stockStatus: "in-stock", distanceKm: 650 },
    ],
  };
}

function addMinutesToTime(timeStr: string, minutes: number): string {
  if (minutes === 0) return timeStr;
  const [hrs, mins] = timeStr.split(":").map(Number);
  let totalMins = hrs * 60 + mins + minutes;
  totalMins = (totalMins + 1440) % 1440;
  const newHrs = Math.floor(totalMins / 60);
  const newMins = totalMins % 60;
  return `${String(newHrs).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
}

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
    description: "Share your journey details so we can map your route and upcoming stops.",
  },
  {
    icon: Pill,
    title: "Search Medicines",
    description: "Browse or search for the medicines and healthcare essentials you need.",
  },
  {
    icon: MapPin,
    title: "Smart Station Selection",
    description: "Our SSSE recommends the best station for delivery based on timing and availability.",
  },
  {
    icon: HeartPulse,
    title: "Pharmacy Prepares Order",
    description: "Verified partner pharmacies verify your prescription and pack your medicines.",
  },
  {
    icon: Lock,
    title: "Collect with OTP",
    description: "Pick up your order at the selected station using a secure one-time password.",
  },
];

const features = [
  {
    icon: Train,
    title: "Journey-Based Medicine Delivery",
    description: "Medicines are planned around your train route, ensuring you never miss a dose.",
  },
  {
    icon: MapPin,
    title: "Smart Station Selection Engine",
    description: "AI-driven recommendations choose the ideal station for quick, reliable pickup.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Pharmacies",
    description: "Every pharmacy partner is licensed, verified, and quality-checked for safety.",
  },
  {
    icon: Upload,
    title: "Prescription Upload",
    description: "Upload your prescription in seconds and our team validates it securely.",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Track your order from pharmacy packing to station arrival in real time.",
  },
  {
    icon: PackageCheck,
    title: "Secure OTP Delivery",
    description: "Your medicine is handed over only after a secure OTP verification at the station.",
  },
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [userName, setUserName] = useState<string>("Guest Passenger");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "" });

  // Tab Manager: 'home' | 'order' | 'ssse' | 'tracking'
  const [activeTab, setActiveTab] = useState<"home" | "order" | "ssse" | "tracking">("home");

  // Step 1: Order Setup States
  const [journey, setJourney] = useState({
    pnr: "4321098765",
    train: "12952",
    coach: "B4",
    seat: "32",
    date: new Date().toISOString().split("T")[0],
  });
  const [fetched, setFetched] = useState(true);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([
    { medicine: MEDICINES[0], qty: 2 },
    { medicine: MEDICINES[2], qty: 1 },
  ]);
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // Step 2: SSSE Selection States
  const [activeTrainRoute, setActiveTrainRoute] = useState<TrainRoute>(getRouteForTrain("12952"));
  const [selectedStation, setSelectedStation] = useState<StationStop | null>(null);

  // Step 3: Simulation Sandbox States
  const [simulatedDelay, setSimulatedDelay] = useState<number>(8);
  const [trainPosition, setTrainPosition] = useState<number>(310);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>("");
  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);

  // Set default route on load
  useEffect(() => {
    setActiveTrainRoute(getRouteForTrain(journey.train));
  }, []);

  // Update selected station when route shifts
  useEffect(() => {
    if (activeTrainRoute) {
      const best = activeTrainRoute.stops.find((s) => s.haltMinutes >= 5 && s.stockStatus === "in-stock") || activeTrainRoute.stops[2];
      setSelectedStation(best || null);
      if (best) {
        setTrainPosition(Math.max(0, best.distanceKm - 80));
      }
    }
  }, [activeTrainRoute]);

  // Simulated Train Movement Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating && selectedStation) {
      interval = setInterval(() => {
        setTrainPosition((prev) => {
          const target = selectedStation.distanceKm;
          if (prev >= target) {
            setIsSimulating(false);
            return target;
          }
          const nextVal = prev + 5;
          return nextVal > target ? target : nextVal;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isSimulating, selectedStation]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      setActiveTab("home");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const handleFetchJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journey.pnr || journey.pnr.length < 10) {
      toast.error("Please enter a valid 10-digit PNR.");
      return;
    }
    const route = getRouteForTrain(journey.train);
    setActiveTrainRoute(route);
    setFetched(true);
    toast.success(`Journey details fetched for Train: ${route.name}`);
  };

  const addToCart = (medicine: Medicine) =>
    setCart((prev) => {
      const found = prev.find((l) => l.medicine.id === medicine.id);
      if (found) {
        return prev.map((l) => (l.medicine.id === medicine.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { medicine, qty: 1 }];
    });

  const changeQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((l) => (l.medicine.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );

  const acceptFiles = (list: FileList | null) => {
    if (!list) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    const next = Array.from(list)
      .filter((f) => allowed.includes(f.type))
      .map((f) => ({ name: f.name, size: f.size }));
    setFiles((prev) => [...prev, ...next]);
    toast.success(`${next.length} prescription files added.`);
  };

  const results = MEDICINES.filter((m) =>
    (m.name + " " + m.brand).toLowerCase().includes(query.trim().toLowerCase())
  );

  const subtotal = cart.reduce((s, l) => s + l.medicine.price * l.qty, 0);
  const delivery = cart.length ? 40 : 0;
  const isRxInCart = cart.some((l) => l.medicine.rx);

  const handleProceedToSSSE = () => {
    if (cart.length === 0) {
      toast.error("Your shopping cart is empty!");
      return;
    }
    if (!fetched) {
      toast.error("Please verify your journey details first.");
      return;
    }
    if (isRxInCart && files.length === 0) {
      toast.warning("You have added prescription (Rx) medicines. Please upload a copy of your prescription.", {
        action: {
          label: "Proceed Anyway",
          onClick: () => {
            setActiveTab("ssse");
          },
        },
      });
      return;
    }
    setActiveTab("ssse");
  };

  const handleConfirmOrder = () => {
    if (!selectedStation) {
      toast.error("Please select a delivery station.");
      return;
    }
    setActiveTab("tracking");
    setOrderDelivered(false);
    setOtpInput("");
    toast.success(`Order locked for delivery at ${selectedStation.name}! Tracking initialized.`);
  };

  const getMilestoneState = () => {
    if (!selectedStation) return { stage: 0, distanceLeft: 0 };
    const distanceLeft = selectedStation.distanceKm - trainPosition;
    if (orderDelivered) {
      return { stage: 4, distanceLeft: 0 };
    }
    if (distanceLeft <= 0) {
      return { stage: 3, distanceLeft: 0 };
    }
    if (distanceLeft < 15) {
      return { stage: 2, distanceLeft };
    }
    if (distanceLeft < 50) {
      return { stage: 1, distanceLeft };
    }
    return { stage: 0, distanceLeft };
  };

  const trackingState = getMilestoneState();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Toaster position="top-right" richColors />

      {/* Unified Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-primary"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse size={20} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Health On Track
            </span>
          </a>

          {/* Navigation Items (Responsive toggles) */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => setActiveTab("home")}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "home" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "order" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Order Medicines
            </button>
            <button
              disabled={!selectedStation}
              onClick={() => setActiveTab("tracking")}
              className={`text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 ${
                activeTab === "tracking" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Live Tracker
            </button>
            {navLinks.slice(1).map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/5 cursor-pointer"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-accent px-3 py-1.5 rounded-full border border-border">
                  <User className="h-3.5 w-3.5 text-primary" /> {userName}
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserName("Guest Passenger");
                    setActiveTab("home");
                    toast.success("Successfully logged out.");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-muted cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
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
          <div className="border-t border-border md:hidden bg-background">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setActiveTab("home");
                }}
                className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setActiveTab("order");
                }}
                className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                Order Medicines
              </button>
              <button
                disabled={!selectedStation}
                onClick={() => {
                  setMobileOpen(false);
                  setActiveTab("tracking");
                }}
                className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40"
              >
                Live Tracker
              </button>
              {navLinks.slice(1).map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }}
                  className="mt-2 block w-full text-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer"
                >
                  Sign In
                </button>
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="block w-full text-center rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-muted-foreground border border-border">
                    Logged in as: {userName}
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setIsLoggedIn(false);
                      setUserName("Guest Passenger");
                      setActiveTab("home");
                      toast.success("Successfully logged out.");
                    }}
                    className="block w-full text-center rounded-lg bg-destructive px-3 py-2.5 text-sm font-semibold text-destructive-foreground cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* -------------------- VIEW 1: HOME LANDING PAGE -------------------- */}
      {activeTab === "home" && (
        <div id="home">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-accent/40 to-background pb-20 pt-16 sm:pt-24 lg:pb-28 lg:pt-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Train size={16} />
                  <span>Healthcare for Indian Railways</span>
                </div>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Medicine Delivery <span className="text-primary">During Train Journeys</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Health On Track is a railway-focused digital platform that enables passengers to order
                  medicines during train travel and receive them at an upcoming railway station.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button
                    onClick={() => setActiveTab("order")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 cursor-pointer"
                  >
                    Start Your Order
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => handleNavClick("#how-it-works")}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-background px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-primary/5 cursor-pointer"
                  >
                    How It Works
                  </button>
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
                  From PNR to pickup — five simple steps to get your medicine on track.
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
                  Built for passengers, powered by verified pharmacies, and guided by smart railway logistics.
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
                    Millions of Indians travel by train every day. Access to medicines during long
                    journeys can be unpredictable. Health On Track bridges that gap by connecting
                    passengers with verified pharmacies at railway stations along their route.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Whether it is a forgotten prescription, a sudden need, or chronic medication,
                    our platform ensures your healthcare stays on track — station to station.
                  </p>
                  <button
                    onClick={() => setActiveTab("order")}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    Start Order Simulation
                    <ChevronRight size={18} />
                  </button>
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
                    Join thousands of passengers who trust Health On Track for safe, timely medicine
                    delivery during train journeys.
                  </p>
                  <button
                    onClick={() => setActiveTab("order")}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-background px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-colors hover:bg-background/90 cursor-pointer"
                  >
                    Start Your Order
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              </div>
            </div>
          </section>
        </div>
      )}

      {/* -------------------- PRIVATE WORKSPACE AREA -------------------- */}
      {activeTab !== "home" && !isLoggedIn ? (
        <main className="mx-auto max-w-lg px-4 py-20 text-center flex-1 flex flex-col justify-center items-center">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg w-full animate-zoom-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <Lock className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign In Required</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Authentication is required to configure railway journey details, select online pharmacies, and access the live tracking simulator.
            </p>
            
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer"
              >
                Sign In to Your Account
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted cursor-pointer"
              >
                Create a New Profile
              </button>
            </div>
          </div>
        </main>
      ) : (
        <>
          {/* -------------------- VIEW 2: ORDER CATALOG SETUP -------------------- */}
          {activeTab === "order" && (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 flex-1 w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Configure Journey & Medicine Cart
            </h2>
            <p className="text-sm text-muted-foreground">
              Provide your details, choose medicines, and sync with the Selection Engine.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Journey Details Form */}
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                    <Train className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Journey details</h2>
                    <p className="text-xs text-muted-foreground">
                      We check actual speeds, stops, and pharmacy connections at each halt
                    </p>
                  </div>
                </div>

                <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleFetchJourney}>
                  <div className="sm:col-span-2">
                    <label htmlFor="pnr" className="mb-1.5 block text-sm font-medium text-foreground">
                      PNR Number
                    </label>
                    <input
                      id="pnr"
                      className={inputClass}
                      placeholder="10-digit PNR"
                      maxLength={10}
                      value={journey.pnr}
                      onChange={(e) => setJourney({ ...journey, pnr: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="train" className="mb-1.5 block text-sm font-medium text-foreground">
                      Train Number / Name
                    </label>
                    <select
                      id="train"
                      className={inputClass}
                      value={journey.train}
                      onChange={(e) => setJourney({ ...journey, train: e.target.value })}
                    >
                      <option value="12952">12952 - Mumbai Rajdhani Express</option>
                      <option value="12002">12002 - New Delhi Bhopal Shatabdi</option>
                      <option value="12626">12626 - Kerala Express</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-foreground">
                      Journey Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className={inputClass}
                      value={journey.date}
                      onChange={(e) => setJourney({ ...journey, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="coach" className="mb-1.5 block text-sm font-medium text-foreground">
                      Coach Number
                    </label>
                    <input
                      id="coach"
                      className={inputClass}
                      placeholder="e.g. B4"
                      maxLength={5}
                      value={journey.coach}
                      onChange={(e) => setJourney({ ...journey, coach: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="seat" className="mb-1.5 block text-sm font-medium text-foreground">
                      Seat Number
                    </label>
                    <input
                      id="seat"
                      className={inputClass}
                      placeholder="e.g. 32"
                      maxLength={3}
                      value={journey.seat}
                      onChange={(e) => setJourney({ ...journey, seat: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:w-auto cursor-pointer"
                    >
                      <Train className="h-4 w-4" />
                      Verify Route & Sync PNR
                    </button>
                  </div>
                </form>

                {fetched && activeTrainRoute && (
                  <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Route Synced · {activeTrainRoute.name} ({activeTrainRoute.number})
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Handoff point calculated for Coach {journey.coach || "—"}, Seat {journey.seat || "—"}. 
                          Ready for Smart Station selection engine.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Search Medicines */}
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-foreground">Search Healthcare Items</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Browse pharmaceuticals, first aid kits, or essential medicines
                </p>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className={`${inputClass} pl-11`}
                    placeholder="Search medicines (e.g. Paracetamol, Dolo, Insulin...)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search medicines"
                  />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {results.map((m) => (
                    <article
                      key={m.id}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                          {m.rx && (
                            <span className="shrink-0 rounded-full bg-red-100 dark:bg-red-950/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
                              Rx Required
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {m.brand} · {m.form}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-bold text-foreground">₹{m.price}</span>
                        <button
                          onClick={() => addToCart(m)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition hover:opacity-90 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                  {results.length === 0 && (
                    <p className="text-sm text-muted-foreground">No items matched "{query}".</p>
                  )}
                </div>
              </section>

              {/* Prescription Upload Area */}
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Prescription Upload</h2>
                  <span className="rounded-full bg-amber-100 dark:bg-amber-950/40 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    Rx
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upload prescription copy for verified medications. Files are validated prior to dispatch.
                </p>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    acceptFiles(e.dataTransfer.files);
                  }}
                  onClick={() => fileInput.current?.click()}
                  className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                    dragging ? "border-primary bg-accent/60" : "border-border bg-muted/40 hover:border-primary/50"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <Upload className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    Drag and drop your prescription file here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse · Supports JPG, PNG, PDF
                  </p>
                  <input
                    ref={fileInput}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={(e) => acceptFiles(e.target.files)}
                  />
                </div>

                {files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <li
                        key={`${f.name}-${i}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <FileText className="h-4 w-4 shrink-0 text-primary" />
                          <span className="truncate text-sm text-foreground">{f.name}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {(f.size / 1024).toFixed(0)} KB
                          </span>
                        </span>
                        <button
                          aria-label={`Remove ${f.name}`}
                          onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {/* Cart Summary */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Shopping Cart</h2>
                  <span className="ml-auto rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {cart.reduce((s, l) => s + l.qty, 0)}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <p className="mt-6 text-sm text-muted-foreground">
                    Your cart is empty. Search and add medicines to continue.
                  </p>
                ) : (
                  <ul className="mt-5 space-y-4">
                    {cart.map((l) => (
                      <li key={l.medicine.id} className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-sm font-medium text-foreground">
                              {l.medicine.name}
                            </p>
                            {l.medicine.rx && (
                              <span className="shrink-0 rounded bg-red-100 px-1 py-0.5 text-[8px] font-bold text-red-600 uppercase">
                                Rx
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">₹{l.medicine.price} each</p>
                          <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-border px-2 py-1 bg-background">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => changeQty(l.medicine.id, -1)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-semibold text-foreground">
                              {l.qty}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => changeQty(l.medicine.id, 1)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-foreground">
                          ₹{l.medicine.price * l.qty}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Station Logistics Fee</span>
                    <span>₹{delivery}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground">
                    <span>Total</span>
                    <span>₹{subtotal + delivery}</span>
                  </div>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleProceedToSSSE}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  <MapPin className="h-4 w-4" />
                  Proceed to Smart Station Selection
                </button>
              </section>
            </aside>
          </div>
        </main>
      )}

      {/* -------------------- VIEW 3: SSSE TIMELINE ENGINE -------------------- */}
      {activeTab === "ssse" && (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 flex-1 w-full animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Smart Station Selection Engine
            </h2>
            <p className="text-sm text-muted-foreground">
              SSSE resolves dynamic halts, medicine stock, and railway logistics.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Optimal Handoff Selector</h2>
                      <p className="text-xs text-muted-foreground">
                        Matching train route timing with local platform partner availability.
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Zap className="h-3 w-3" /> AI Active
                  </span>
                </div>

                {/* Delay Simulator */}
                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/60 dark:bg-amber-950/10">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-amber-900 dark:text-amber-400">
                        Dynamic Halt & Arrival Predictor
                      </span>
                      <p className="text-xs text-amber-800 dark:text-amber-500 mt-1">
                        Indian Railways frequently faces schedule delays. Use the slider below to test how the engine dynamically shifts delivery:
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-background/50 rounded-lg p-2.5">
                    <span className="text-xs font-medium text-foreground">Current Delay:</span>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      step="5"
                      value={simulatedDelay}
                      onChange={(e) => setSimulatedDelay(Number(e.target.value))}
                      className="flex-1 accent-primary h-1.5 rounded-lg appearance-none bg-muted cursor-pointer"
                    />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                      {simulatedDelay} Mins
                    </span>
                  </div>
                </div>

                {/* Station Timeline options */}
                <div className="mt-6 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Available Route Delivery Nodes
                  </p>

                  <div className="relative pl-6 border-l-2 border-primary/20 space-y-6">
                    {activeTrainRoute.stops.map((stop) => {
                      const isRecommended = stop.haltMinutes >= 5 && stop.stockStatus === "in-stock";
                      const actualArrival = addMinutesToTime(stop.scheduledArrival, simulatedDelay);

                      let badgeColor = "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400";
                      let badgeText = "Unfeasible";
                      let disableClick = false;

                      if (stop.haltMinutes >= 8) {
                        badgeColor = "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400";
                        badgeText = "Optimal Halt";
                      } else if (stop.haltMinutes >= 3) {
                        badgeColor = "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400";
                        badgeText = "Short Halt Warning";
                      } else if (stop.haltMinutes === 0) {
                        badgeText = "No Stop (Crossing)";
                        disableClick = true;
                      } else {
                        badgeText = "High Risk Handoff";
                      }

                      const isSelected = selectedStation?.code === stop.code;

                      return (
                        <div key={stop.code} className="relative group animate-fade-in">
                          <span
                            className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background transition ${
                              isSelected
                                ? "border-primary scale-125 ring-4 ring-primary/20"
                                : "border-primary/40 group-hover:border-primary"
                            }`}
                          >
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                          </span>

                          <div
                            onClick={() => {
                              if (!disableClick) setSelectedStation(stop);
                            }}
                            className={`rounded-2xl border p-4 text-left transition cursor-pointer select-none ${
                              disableClick
                                ? "opacity-50 cursor-not-allowed border-border bg-muted/20"
                                : isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md"
                                : "border-border bg-background hover:border-primary/40 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                                  {stop.name} ({stop.code})
                                  {isRecommended && (
                                    <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                                      <Sparkles className="h-2 w-2" /> SSSE Suggested
                                    </span>
                                  )}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {stop.distanceKm} km from origin
                                </p>
                              </div>
                              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                                {badgeText}
                              </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground sm:grid-cols-4">
                              <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-bold text-muted-foreground/80">Arrival Time</span>
                                <span className="font-semibold text-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-primary" /> {actualArrival}
                                  {simulatedDelay > 0 && (
                                    <span className="text-[10px] text-amber-600">({simulatedDelay}m delay)</span>
                                  )}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-bold text-muted-foreground/80">Halt Duration</span>
                                <span className="font-semibold text-foreground">
                                  {stop.haltMinutes > 0 ? `${stop.haltMinutes} mins` : "Passing stop"}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-bold text-muted-foreground/80">Online Partners</span>
                                <span className="font-semibold text-foreground flex items-center gap-1">
                                  <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> {stop.pharmaciesCount} pharmacies
                                </span>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-bold text-muted-foreground/80">Stock Check</span>
                                <span
                                  className={`font-semibold uppercase tracking-wider ${
                                    stop.stockStatus === "in-stock" ? "text-secondary" : "text-amber-600"
                                  }`}
                                >
                                  {stop.stockStatus === "in-stock" ? "All In Stock" : "Partial Stock"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" /> Choice Recommendations
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Vadodara Junction (BRC) or Kota Junction are heavily favored by the engine due to 10-minute halts. 
                  Short halts (less than 3 minutes) present platforms micro-logistics risks due to platform vendor crowds.
                </p>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-foreground">Delivery Summary</h2>
                <div className="mt-4 space-y-3 border-b border-border pb-4 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Train & Coach</span>
                    <span className="font-semibold text-foreground text-right">
                      {activeTrainRoute.name} · Coach {journey.coach || "B4"}, Seat {journey.seat || "32"}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Handoff Station</span>
                    <span className="font-semibold text-primary text-right">
                      {selectedStation ? `${selectedStation.name} (${selectedStation.code})` : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Est. Handoff Arrival</span>
                    <span className="font-semibold text-foreground text-right">
                      {selectedStation ? addMinutesToTime(selectedStation.scheduledArrival, simulatedDelay) : "—"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground">
                    <span>Total Bill</span>
                    <span>₹{subtotal + delivery}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={handleConfirmOrder}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer"
                  >
                    Confirm Delivery & Pay
                  </button>
                  <button
                    onClick={() => setActiveTab("order")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted cursor-pointer"
                  >
                    Modify items / Details
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </main>
      )}

      {/* -------------------- VIEW 4: LIVE TRACKING SIMULATOR -------------------- */}
      {activeTab === "tracking" && selectedStation && (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 flex-1 w-full animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Live Order & Route Tracking
            </h2>
            <p className="text-sm text-muted-foreground">
              Monitor train position and local delivery partner progress in real time.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Train className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Real-Time Route Sync</h2>
                      <p className="text-xs text-muted-foreground">{activeTrainRoute.name}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold self-start sm:self-center">
                    {simulatedDelay > 0 ? `${simulatedDelay}m Delay Recorded` : "On Schedule"}
                  </span>
                </div>

                {/* Train progress bar track */}
                <div className="mt-8 bg-muted/30 rounded-2xl p-6 border border-border/40">
                  <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-4">
                    <span>Train Progress Indicator</span>
                    <span>Target: {selectedStation.name}</span>
                  </div>

                  <div className="relative pt-6 pb-2">
                    <div className="absolute top-8 left-2 right-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(100, (trainPosition / selectedStation.distanceKm) * 100)}%`,
                        }}
                      />
                    </div>

                    <div className="absolute top-[30px] left-2 right-2 flex justify-between h-2 pointer-events-none opacity-40">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="w-0.5 h-2 bg-foreground" />
                      ))}
                    </div>

                    {/* Sliding Train Icon */}
                    <div
                      className="absolute top-2 transition-all duration-500 ease-out -ml-4 z-10"
                      style={{
                        left: `${Math.min(98, Math.max(2, (trainPosition / selectedStation.distanceKm) * 100))}%`,
                      }}
                    >
                      <div className="relative flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20 animate-bounce">
                          <Train className="h-4 w-4" />
                        </span>
                        <span className="absolute -bottom-6 text-[10px] font-bold text-primary bg-background border border-primary/20 px-1.5 py-0.5 rounded">
                          {trainPosition} km
                        </span>
                      </div>
                    </div>

                    {/* Nodes */}
                    <div className="relative flex justify-between mt-8">
                      {activeTrainRoute.stops.map((stop) => {
                        const isPassed = trainPosition >= stop.distanceKm;
                        const isTarget = stop.code === selectedStation.code;

                        return (
                          <div key={stop.code} className="flex flex-col items-center">
                            <span
                              className={`h-3.5 w-3.5 rounded-full border-2 bg-background z-20 ${
                                isTarget
                                  ? "border-secondary ring-4 ring-secondary/20 h-4 w-4 bg-secondary"
                                  : isPassed
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground/30"
                              }`}
                            />
                            <span className="mt-2 text-[9px] font-bold text-foreground">
                              {stop.code}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border pt-4">
                  <div className="p-3 bg-muted/40 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground">Train Speed</span>
                    <span className="text-sm font-semibold text-foreground">
                      {isSimulating ? "115 km/h" : "0 km/h"}
                    </span>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground">Distance Left</span>
                    <span className="text-sm font-semibold text-foreground">
                      {Math.max(0, selectedStation.distanceKm - trainPosition).toFixed(0)} km
                    </span>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground">Handoff ETA</span>
                    <span className="text-sm font-semibold text-foreground">
                      {addMinutesToTime(selectedStation.scheduledArrival, simulatedDelay)}
                    </span>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground">Proximity Status</span>
                    <span className="text-sm font-semibold text-primary">
                      {trainPosition >= selectedStation.distanceKm ? "Arrived" : "En Route"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Milestones Checkpoints */}
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Delivery Milestone Checkpoints</h3>
                <div className="relative pl-6 border-l-2 border-primary/20 space-y-6 text-left">
                  {/* Milestones */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-primary-foreground border border-secondary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Order Assigned & Confirmed</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Assigned local pharmacy partner: **Apollo Station Pharmacy** (Platform 2 Hub).
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-background ${
                      trackingState.stage >= 1 ? "bg-secondary text-primary-foreground border-secondary" : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {trackingState.stage >= 1 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${trackingState.stage >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                        Order Packed in Security Sealed bag
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Medications verified, packed in tamper-evident pouch, and temperature-logged.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-background ${
                      trackingState.stage >= 2 ? "bg-secondary text-primary-foreground border-secondary" : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {trackingState.stage >= 2 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${trackingState.stage >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                        Delivery Agent Dispatched to Platform Position
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Courier agent positioned at platform alignment indicator for Coach **{journey.coach || "B4"}**.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-background ${
                      trackingState.stage >= 3 ? "bg-secondary text-primary-foreground border-secondary" : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {trackingState.stage >= 3 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${trackingState.stage >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                        Secure Handoff Verification
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Provide the delivery code to the agent at your seat (**{journey.coach || "B4"}**, Seat **{journey.seat || "32"}**) to complete the handoff.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              {/* Secure OTP Card */}
              <section className="rounded-2xl border border-secondary bg-secondary/5 p-5 shadow-sm sm:p-6 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">Secure Handover OTP</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Handoff PIN: Provide to agent at Coach **{journey.coach || "B4"}**, Seat **{journey.seat || "32"}**
                </p>

                {orderDelivered ? (
                  <div className="mt-5 rounded-2xl bg-secondary/10 border border-secondary/20 p-4">
                    <span className="text-sm font-bold text-secondary uppercase tracking-wider block">
                      ✓ Handover Completed
                    </span>
                    <span className="text-[10px] text-muted-foreground block mt-1">
                      Order successfully delivered at platform. Enjoy your journey!
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="mt-5 inline-flex gap-2 justify-center">
                      {"4829".split("").map((digit, index) => (
                        <span
                          key={index}
                          className="h-12 w-10 rounded-lg border border-secondary/30 flex items-center justify-center text-xl font-bold bg-background text-foreground shadow-sm font-mono"
                        >
                          {digit}
                        </span>
                      ))}
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (otpInput === "4829") {
                          setOrderDelivered(true);
                          setTrainPosition(selectedStation.distanceKm);
                          toast.success("OTP verified. Order marked delivered!");
                        } else {
                          toast.error("Incorrect OTP code. Enter 4829 to simulate handover.");
                        }
                      }}
                      className="mt-6 space-y-3"
                    >
                      <input
                        className={`${inputClass} text-center text-base tracking-widest font-mono`}
                        placeholder="Verify agent OTP (4829)"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        aria-label="Verify OTP"
                      />
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-xs font-semibold text-secondary-foreground transition hover:opacity-90 cursor-pointer"
                      >
                        Verify OTP
                      </button>
                    </form>
                  </div>
                )}
              </section>

              {/* Sandbox controls */}
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 text-left">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  🕹️ Simulation Controls
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Interact with the simulator logic below:
                </p>

                <div className="mt-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Train Position</span>
                      <span className="font-semibold text-foreground">
                        {trainPosition} km / {selectedStation.distanceKm} km
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={selectedStation.distanceKm}
                      value={trainPosition}
                      onChange={(e) => {
                        setTrainPosition(Number(e.target.value));
                        if (Number(e.target.value) < selectedStation.distanceKm) {
                          setOrderDelivered(false);
                        }
                      }}
                      className="w-full accent-primary h-1.5 rounded-lg bg-muted cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsSimulating(!isSimulating)}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold border transition cursor-pointer ${
                        isSimulating
                          ? "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                          : "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                      }`}
                    >
                      {isSimulating ? (
                        <>
                          <Pause className="h-3.5 w-3.5" /> Pause movement
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" /> Auto-move train
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setTrainPosition(Math.max(0, selectedStation.distanceKm - 80));
                        setIsSimulating(false);
                        setOrderDelivered(false);
                        toast.success("Simulation reset.");
                      }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset position
                    </button>
                  </div>

                  <div className="border-t border-border pt-4">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                      Modify Train Delay (On The Fly)
                    </span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setSimulatedDelay(0);
                          toast.success("Train marked on-time.");
                        }}
                        className="rounded-lg border border-border py-1.5 text-[10px] font-medium text-foreground hover:bg-muted cursor-pointer"
                      >
                        On-time
                      </button>
                      <button
                        onClick={() => {
                          setSimulatedDelay((d) => d + 20);
                          toast.warning("20m delay added.");
                        }}
                        className="rounded-lg border border-border py-1.5 text-[10px] font-medium text-foreground hover:bg-muted cursor-pointer"
                      >
                        +20m
                      </button>
                      <button
                        onClick={() => {
                          setSimulatedDelay((d) => Math.max(0, d - 20));
                          toast.success("Reduced delay by 20m.");
                        }}
                        className="rounded-lg border border-border py-1.5 text-[10px] font-medium text-foreground hover:bg-muted cursor-pointer"
                      >
                        -20m
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setActiveTab("ssse");
                    setIsSimulating(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Select another station
                </button>
              </div>
            </aside>
          </div>
        </main>
      )}
        </>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl animate-zoom-in text-left">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
              aria-label="Close authentication"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex border-b border-border mb-6">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                  authMode === "login"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                  authMode === "signup"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Create Profile
              </button>
            </div>

            {authMode === "login" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!loginForm.email || !loginForm.password) {
                    toast.error("Please fill in all fields.");
                    return;
                  }
                  setIsLoggedIn(true);
                  setUserName(loginForm.email.split("@")[0]);
                  setShowAuthModal(false);
                  toast.success("Successfully signed in!");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="name@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer mt-2"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password) {
                    toast.error("Please fill in all fields.");
                    return;
                  }
                  setIsLoggedIn(true);
                  setUserName(signupForm.name);
                  setShowAuthModal(false);
                  toast.success("Passenger profile created successfully!");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Rahul Sharma"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="e.g. +91 9876543210"
                    value={signupForm.phone}
                    onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="name@email.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="Create password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer mt-2"
                >
                  Create Profile
                </button>
              </form>
            )}

            <div className="mt-5 text-center text-[10px] text-muted-foreground">
              By continuing, you agree to Health On Track's Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="mt-auto border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-left">
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
                India's first railway-focused medicine delivery platform. We keep your health on track, one station at a time.
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
                <li>
                  <button onClick={() => setActiveTab("home")} className="hover:text-primary cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("#features")} className="hover:text-primary cursor-pointer text-left">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("#how-it-works")} className="hover:text-primary cursor-pointer text-left">
                    How it Works
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("#about")} className="hover:text-primary cursor-pointer text-left">
                    About
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
                <li><button onClick={() => handleNavClick("#contact")} className="hover:text-primary cursor-pointer text-left">Contact</button></li>
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
