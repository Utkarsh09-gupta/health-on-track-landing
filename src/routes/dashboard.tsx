import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  HeartPulse,
  Train,
  Search,
  Plus,
  Minus,
  Upload,
  FileText,
  X,
  ShoppingCart,
  MapPin,
  LogOut,
  LayoutDashboard,
  Package,
  User,
  Menu,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Passenger Dashboard | Health On Track" },
      {
        name: "description",
        content:
          "Enter your journey details, search medicines, upload prescriptions and check out with Smart Station Selection on Health On Track.",
      },
      { property: "og:title", content: "Passenger Dashboard | Health On Track" },
      {
        property: "og:description",
        content:
          "Manage your train journey medicine orders: PNR lookup, medicine search, prescription upload and cart checkout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

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

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: Package },
  { label: "Profile", icon: User },
];

function Dashboard() {
  const [journey, setJourney] = useState({
    pnr: "",
    train: "",
    coach: "",
    seat: "",
    date: "",
  });
  const [fetched, setFetched] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [dragging, setDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const results = MEDICINES.filter((m) =>
    (m.name + " " + m.brand).toLowerCase().includes(query.trim().toLowerCase()),
  );

  const addToCart = (medicine: Medicine) =>
    setCart((prev) => {
      const found = prev.find((l) => l.medicine.id === medicine.id);
      if (found)
        return prev.map((l) =>
          l.medicine.id === medicine.id ? { ...l, qty: l.qty + 1 } : l,
        );
      return [...prev, { medicine, qty: 1 }];
    });

  const changeQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((l) => (l.medicine.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );

  const acceptFiles = (list: FileList | null) => {
    if (!list) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    const next = Array.from(list)
      .filter((f) => allowed.includes(f.type))
      .map((f) => ({ name: f.name, size: f.size }));
    setFiles((prev) => [...prev, ...next]);
  };

  const subtotal = cart.reduce((s, l) => s + l.medicine.price * l.qty, 0);
  const delivery = cart.length ? 40 : 0;

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-base font-bold tracking-tight text-foreground">
              Health On Track
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  i === 0
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <Link
              to="/"
              className="ml-2 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <Link
              to="/"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Passenger Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your journey details, order medicines and collect them at the
          recommended station.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Journey card */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Train className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Journey Details
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    We use these to map your route and upcoming stations.
                  </p>
                </div>
              </div>

              <form
                className="mt-5 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFetched(true);
                }}
              >
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
                    Train Number
                  </label>
                  <input
                    id="train"
                    className={inputClass}
                    placeholder="e.g. 12951"
                    maxLength={5}
                    value={journey.train}
                    onChange={(e) => setJourney({ ...journey, train: e.target.value })}
                  />
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:w-auto"
                  >
                    <Train className="h-4 w-4" />
                    Fetch Journey
                  </button>
                </div>
              </form>

              {fetched && (
                <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm">
                  <p className="font-semibold text-foreground">
                    Journey found{journey.train ? ` · Train ${journey.train}` : ""}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Coach {journey.coach || "—"}, Seat {journey.seat || "—"}
                    {journey.date ? ` · ${journey.date}` : ""} · Upcoming stations
                    loaded for Smart Station Selection.
                  </p>
                </div>
              )}
            </section>

            {/* Medicine search */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Search Medicines
              </h2>
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={`${inputClass} pl-11`}
                  placeholder="Search medicines, brands or essentials"
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
                        <h3 className="text-sm font-semibold text-foreground">
                          {m.name}
                        </h3>
                        {m.rx && (
                          <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                            Rx
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {m.brand} · {m.form}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-bold text-foreground">
                        ₹{m.price}
                      </span>
                      <button
                        onClick={() => addToCart(m)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition hover:opacity-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
                {results.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No medicines matched "{query}".
                  </p>
                )}
              </div>
            </section>

            {/* Prescription upload */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Upload Prescription
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Required for prescription-only (Rx) medicines.
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
                  dragging
                    ? "border-primary bg-accent/60"
                    : "border-border bg-muted/40 hover:border-primary/50"
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <Upload className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-medium text-foreground">
                  Drag and drop your prescription here
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or click to browse · Accepted: JPG, PNG, PDF
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
                        <span className="truncate text-sm text-foreground">
                          {f.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {(f.size / 1024).toFixed(0)} KB
                        </span>
                      </span>
                      <button
                        aria-label={`Remove ${f.name}`}
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, idx) => idx !== i))
                        }
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

          {/* Cart */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Shopping Cart
                </h2>
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
                        <p className="truncate text-sm font-medium text-foreground">
                          {l.medicine.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{l.medicine.price} each
                        </p>
                        <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-border px-2 py-1">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => changeQty(l.medicine.id, -1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm font-semibold text-foreground">
                            {l.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => changeQty(l.medicine.id, 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" />
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
                  <span>Station handling</span>
                  <span>₹{delivery}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{subtotal + delivery}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MapPin className="h-4 w-4" />
                Proceed to Smart Station Selection
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
