import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  CalendarClock,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  Menu,
  MessageSquare,
  Minus,
  MonitorSmartphone,
  Nfc,
  Plus,
  RotateCcw,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Store,
  Trash2,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const pickupSlots = [
  "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:30", "16:00",
];

const seatingAreas = [
  { id: "A", name: "Area A", description: "Quiet study dining zone", rows: 5, cols: 8, occupied: [2, 5, 6, 9, 14, 19, 22, 27, 31, 33, 38] },
  { id: "B", name: "Area B", description: "Social dining zone", rows: 6, cols: 7, occupied: [1, 3, 4, 8, 11, 12, 17, 21, 24, 28, 29, 34, 37, 39] },
];

const restaurants = [
  {
    id: 1,
    name: "Kimiko",
    tags: ["Japanese", "Sushi", "Hot food"],
    rating: 4.7,
    wait: 12,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "L****", rating: 5, text: "Fresh sushi and clear collection timing. Very convenient between lectures." },
      { id: "r2", user: "M****", rating: 4, text: "Good quality, but it gets busy around lunchtime." },
    ],
    menu: [
      { id: "kimiko-1", name: "Salmon Sushi Box", price: 8.25, calories: "560 kcal", prep: 8, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop" },
      { id: "kimiko-2", name: "Chicken Teriyaki Don", price: 7.49, calories: "820 kcal", prep: 12, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" },
      { id: "kimiko-3", name: "Vegetable Gyoza", price: 4.95, calories: "420 kcal", prep: 7, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 2,
    name: "Haochi",
    tags: ["Chinese", "Noodles", "Rice bowl"],
    rating: 4.5,
    wait: 15,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "E****", rating: 5, text: "Large portions and good value. Pre-ordering helps avoid the queue." },
      { id: "r2", user: "Y****", rating: 4, text: "Tasty food, but waiting time can be long at peak hours." },
    ],
    menu: [
      { id: "haochi-1", name: "Beef Noodle Soup", price: 7.95, calories: "780 kcal", prep: 15, image: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop" },
      { id: "haochi-2", name: "Mapo Tofu Rice", price: 6.8, calories: "690 kcal", prep: 12, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop" },
      { id: "haochi-3", name: "Chicken Dumplings", price: 5.5, calories: "530 kcal", prep: 10, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 3,
    name: "La Cantina",
    tags: ["Mexican", "Burrito", "Tacos"],
    rating: 4.4,
    wait: 10,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "J****", rating: 4, text: "Good burritos and fast enough if ordered before lunch rush." },
      { id: "r2", user: "S****", rating: 5, text: "The collection slot is useful when I have back-to-back classes." },
    ],
    menu: [
      { id: "cantina-1", name: "Chicken Burrito", price: 7.2, calories: "850 kcal", prep: 10, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop" },
      { id: "cantina-2", name: "Beef Tacos", price: 6.75, calories: "640 kcal", prep: 9, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop" },
      { id: "cantina-3", name: "Veggie Quesadilla", price: 6.2, calories: "590 kcal", prep: 8, image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 4,
    name: "Feast",
    tags: ["Hot meals", "Grill", "Campus classic"],
    rating: 4.2,
    wait: 18,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "A****", rating: 4, text: "Reliable hot meals and good portion size." },
      { id: "r2", user: "T****", rating: 4, text: "A reservation pickup time would make this much easier during peak lunch." },
    ],
    menu: [
      { id: "feast-1", name: "Grilled Chicken Plate", price: 7.85, calories: "760 kcal", prep: 18, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=600&auto=format&fit=crop" },
      { id: "feast-2", name: "Roast Vegetable Bowl", price: 6.9, calories: "610 kcal", prep: 14, image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=600&auto=format&fit=crop" },
      { id: "feast-3", name: "Fish and Chips", price: 8.4, calories: "920 kcal", prep: 16, image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 5,
    name: "Pizza Pi",
    tags: ["Pizza", "Vegetarian", "Fast"],
    rating: 4.3,
    wait: 8,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "N****", rating: 4, text: "Convenient and quick. The menu is easy to understand." },
      { id: "r2", user: "K****", rating: 5, text: "Good option when I need something fast between lectures." },
    ],
    menu: [
      { id: "pizza-1", name: "Margherita Slice", price: 4.5, calories: "520 kcal", prep: 8, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" },
      { id: "pizza-2", name: "Pepperoni Slice", price: 4.95, calories: "610 kcal", prep: 8, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop" },
      { id: "pizza-3", name: "Veggie Pizza", price: 5.2, calories: "580 kcal", prep: 10, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 6,
    name: "Starbucks",
    tags: ["Coffee", "Bakery", "Grab-and-go"],
    rating: 4.1,
    wait: 5,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "r1", user: "C****", rating: 4, text: "Good for coffee pickup before lectures." },
      { id: "r2", user: "D****", rating: 4, text: "Short waiting time, but morning queue can be crowded." },
    ],
    menu: [
      { id: "starbucks-1", name: "Iced Latte", price: 3.95, calories: "130 kcal", prep: 5, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop" },
      { id: "starbucks-2", name: "Cappuccino", price: 3.65, calories: "120 kcal", prep: 4, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop" },
      { id: "starbucks-3", name: "Blueberry Muffin", price: 2.75, calories: "430 kcal", prep: 2, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop" },
    ],
  },
];

const nfcSampleItems = [
  { id: "nfc-1", name: "Chicken Teriyaki Don", restaurant: "Kimiko", price: 7.49, calories: "820 kcal", tag: "NFC-K12", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" },
  { id: "nfc-2", name: "Iced Latte", restaurant: "Starbucks", price: 3.95, calories: "130 kcal", tag: "NFC-S03", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop" },
  { id: "nfc-3", name: "Blueberry Muffin", restaurant: "Starbucks", price: 2.75, calories: "430 kcal", tag: "NFC-S18", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop" },
];

function anonymiseName(name) {
  const trimmed = name.trim();
  return trimmed ? `${trimmed[0].toUpperCase()}****` : "U****";
}

function Pill({ children, active = false }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-[#FFC72C] text-slate-950" : "bg-[#F5F7FA] text-slate-600"}`}>{children}</span>;
}

function StarRating({ value, small = false, interactive = false, onChange }) {
  return <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((i) => {
    const icon = <Star className={`${small ? "h-4 w-4" : "h-6 w-6"} ${i <= value ? "fill-[#FFC72C] text-[#FFC72C]" : "fill-slate-200 text-slate-200"}`} />;
    return interactive ? <button key={i} onClick={() => onChange(i)} className="transition hover:scale-110 active:scale-95">{icon}</button> : <span key={i}>{icon}</span>;
  })}</div>;
}

function Rating({ value }) {
  return <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-[#FFC72C] text-[#FFC72C]" /><span className="text-sm font-bold text-[#003E74]">{value.toFixed(1)}</span></div>;
}

function getAvailableSeats(area) {
  return area.rows * area.cols - area.occupied.length;
}

function SeatGrid({ area }) {
  const total = area.rows * area.cols;
  return <div className="rounded-3xl bg-white p-4">
    <div className="mb-4 rounded-2xl bg-[#FFC72C] py-2 text-center text-xs font-black text-slate-950">CAFETERIA FRONT</div>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${area.cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }).map((_, index) => {
        const seatNo = index + 1;
        const occupied = area.occupied.includes(seatNo);
        return <div key={seatNo} className={`flex h-9 items-center justify-center rounded-lg border text-[10px] font-black transition ${occupied ? "border-red-200 bg-red-500 text-white" : "border-[#E8D8B8] bg-white text-slate-300 hover:border-[#003E74] hover:text-[#003E74]"}`}>{occupied ? "●" : seatNo}</div>;
      })}
    </div>
    <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold text-slate-500"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-white ring-1 ring-[#E8D8B8]" />Available</div><div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-red-500" />Occupied</div></div>
  </div>;
}

function SeatCard({ area, onClick }) {
  const available = getAvailableSeats(area);
  const total = area.rows * area.cols;
  return <button onClick={onClick} className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-[#E8D8B8] transition hover:-translate-y-0.5">
    <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-slate-600">{area.name}</p><h3 className="mt-1 text-4xl font-black text-slate-950">{available}</h3><p className="text-xs text-slate-600">seats available / {total}</p></div><div className="rounded-full bg-[#F5F7FA] p-3 text-[#003E74]"><Armchair className="h-6 w-6" /></div></div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F5F7FA]"><div className="h-full rounded-full bg-[#FFC72C]" style={{ width: `${(available / total) * 100}%` }} /></div>
    <p className="mt-3 text-xs text-slate-600">Tap to view seat map</p>
  </button>;
}

function RestaurantCard({ item, selected, onSelect }) {
  const active = selected?.id === item.id;
  return <button onClick={() => onSelect(item)} className={`w-full rounded-3xl border p-3 text-left transition ${active ? "border-[#FFC72C] bg-[#FFF7D8]" : "border-[#E8D8B8] bg-white"}`}>
    <div className="flex gap-3"><img src={item.image} className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h3 className="truncate text-base font-black text-slate-950">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.tags.slice(0, 2).join(" · ")}</p></div><ArrowRight className="h-5 w-5 text-[#003E74]" /></div><div className="mt-4 flex items-center justify-between"><Rating value={item.rating} /><div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-black shadow-sm"><Clock className="h-4 w-4 text-[#003E74]" /> {item.wait} min</div></div></div></div>
  </button>;
}

function MenuItem({ item, onAdd }) {
  return <div className="overflow-hidden rounded-[1.75rem] border border-[#E8D8B8] bg-white shadow-sm">
    <img src={item.image} className="h-36 w-full object-cover md:h-40" />
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h4 className="font-black text-slate-950">{item.name}</h4><p className="mt-1 text-sm text-slate-500">{item.calories}</p></div><p className="font-black">£{item.price.toFixed(2)}</p></div><div className="mt-4 flex items-center justify-between"><Pill><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.prep} min</span></Pill><button onClick={() => onAdd(item)} className="rounded-full bg-[#FFC72C] px-4 py-2 text-sm font-black text-slate-950 hover:bg-[#E5A900]"><Plus className="mr-1 inline h-4 w-4" />Add</button></div></div>
  </div>;
}

function NfcItemCard({ item, onRemove }) {
  return <div className="rounded-3xl border border-[#E8D8B8] bg-white p-4 shadow-sm">
    <div className="flex gap-4"><img src={item.image} className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h4 className="font-black text-slate-950">{item.name}</h4><p className="text-xs text-slate-500">{item.restaurant} · {item.calories}</p></div><p className="font-black">£{item.price.toFixed(2)}</p></div><div className="mt-4 flex items-center justify-between"><span className="rounded-full bg-[#F5F7FA] px-3 py-1 text-xs font-black text-[#003E74]">{item.tag}</span><button onClick={() => onRemove(item.id)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button></div></div></div>
  </div>;
}

const SCREEN_TITLES = {
  home: "Imperial Food",
  onlineShops: "Choose shop",
  onlineMenu: "Menu",
  onlineRatings: "Ratings",
  onlineCart: "Cart",
  onlineSeats: "Seats",
  nfcScan: "NFC tray",
  nfcTray: "Tray basket",
  nfcSeats: "Seats",
};

export default function ImperialFoodWebpage() {
  const [screen, setScreen] = useState("onlineShops");
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(restaurants[0]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("wait");
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [paymentMode, setPaymentMode] = useState("online");
  const [showPayment, setShowPayment] = useState(false);
  const [pickupTime, setPickupTime] = useState("13:00");
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [nfcItems, setNfcItems] = useState([nfcSampleItems[0], nfcSampleItems[1]]);
  const [nfcPaid, setNfcPaid] = useState(false);
  const [showNfcConnect, setShowNfcConnect] = useState(false);
  const [trayBound, setTrayBound] = useState(false);
  const [localReviews, setLocalReviews] = useState({});
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  function go(next) {
    setHistory((prev) => [...prev, screen]);
    setScreen(next);
  }
  function back() {
    setHistory((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      setScreen(last || "home");
      return copy;
    });
  }

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("nfc") === "true") {
    setScreen("nfcTray");
    setHistory([]);
    setShowNfcConnect(true);
    setTrayBound(true);
  }
}, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let data = restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.tags.join(" ").toLowerCase().includes(q));
    if (sort === "wait") data = [...data].sort((a, b) => a.wait - b.wait);
    if (sort === "rating") data = [...data].sort((a, b) => b.rating - a.rating);
    return data;
  }, [query, sort]);

  const selectedMenu = selected.menu.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || query === "");
  const displayReviews = [...(localReviews[selected.id] || []), ...selected.reviews];
  const onlineTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const nfcTotal = nfcItems.reduce((sum, item) => sum + item.price, 0);
  const total = paymentMode === "nfc" ? nfcTotal : onlineTotal;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const maxPrep = cart.length ? Math.max(...cart.map((item) => item.prep)) : 0;

  function addToCart(item) {
    setOrdered(false);
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { ...item, restaurant: selected.name, qty: 1 }];
    });
  }
  function changeQty(id, delta) {
    setOrdered(false);
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + delta } : x)).filter((x) => x.qty > 0));
  }
  function submitReview() {
    const text = reviewText.trim();
    if (!text) return;
    const newReview = { id: `local-${Date.now()}`, user: anonymiseName(reviewName), rating: reviewRating, text };
    setLocalReviews((prev) => ({ ...prev, [selected.id]: [newReview, ...(prev[selected.id] || [])] }));
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  }
  function scanNextItem() {
    setNfcPaid(false);
    const next = nfcSampleItems.find((item) => !nfcItems.some((existing) => existing.id === item.id));
    if (next) setNfcItems((prev) => [...prev, next]);
    go("nfcTray");
  }
  function openPayment(mode) {
    setPaymentMode(mode);
    setShowPayment(true);
  }
  function completePayment() {
    setShowPayment(false);
    paymentMode === "nfc" ? setNfcPaid(true) : setOrdered(true);
  }

  const isHome = screen === "onlineShops";

  return <div className="min-h-screen bg-white text-slate-950">
    <header className="sticky top-0 z-30 border-b border-[#E8D8B8] bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && <button onClick={back} className="rounded-full border border-[#E8D8B8] p-2"><ArrowLeft className="h-5 w-5" /></button>}
          <div>
            
            <h1 className="tracking-[0.24em] text-xl font-black text-[#003E74]">IMPERIAL</h1>
            <p className="text-xs font-black text-[#003E74]">{SCREEN_TITLES[screen]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">

  <div
    className={`flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-black transition-all
    ${
      trayBound
        ? "bg-green-100 text-green-700 ring-2 ring-green-300"
        : "bg-slate-100 text-slate-500"
    }`}
  >
    <Nfc className="h-4 w-4" />
    {trayBound ? "Tray Connected" : "No Tray"}
  </div>

  <button
    onClick={() => go("onlineCart")}
    className="relative rounded-full border border-[#E8D8B8] bg-white p-2"
  >
    <ShoppingBag className="h-5 w-5" />

    {itemCount > 0 && (
      <span className="absolute -right-1 -top-1 rounded-full bg-[#FFC72C] px-1.5 text-xs font-black">
        {itemCount}
      </span>
    )}
  </button>

</div>
      </div>
    </header>

    <main className="mx-auto max-w-5xl p-4 pb-32">
      <AnimatePresence mode="wait">
        <motion.div key={screen} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.18 }}>
          

          {screen === "onlineSeats" && <section className="grid gap-4 md:grid-cols-2">{seatingAreas.map((area) => <SeatCard key={area.id} area={area} onClick={() => setSelectedArea(area)} />)}</section>}

          {screen === "onlineShops" && <section className="space-y-4">
            <div className="flex items-center justify-between"><div><h2 className="text-2xl font-black">Choose a shop</h2><p className="text-sm text-slate-500">Tap a shop to open its menu.</p></div><button onClick={() => setSort(sort === "wait" ? "rating" : "wait")} className="rounded-full bg-[#F5F7FA] px-3 py-2 text-xs font-black"><SlidersHorizontal className="mr-1 inline h-4 w-4" />{sort === "wait" ? "Time" : "Rating"}</button></div>
            <div className="grid gap-3 md:grid-cols-2">{filtered.map((item) => <RestaurantCard key={item.id} item={item} selected={selected} onSelect={(shop) => { setSelected(shop); go("onlineMenu"); }} />)}</div>
          </section>}

          {screen === "onlineMenu" && <section className="space-y-4">
            <div className="rounded-[2rem] border border-[#E8D8B8] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3"><div><h2 className="text-2xl font-black">{selected.name}</h2><p className="text-sm text-slate-500">{selected.tags.join(" · ")} · {selected.wait} min</p></div><button onClick={() => go("onlineRatings")} className="rounded-full bg-[#F5F7FA] px-4 py-2 text-sm font-black"><MessageSquare className="mr-1 inline h-4 w-4" />Ratings</button></div>
              <div className="relative mt-4"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes..." className="h-12 w-full rounded-full border border-[#E8D8B8] bg-[#F5F7FA] pl-11 pr-4 text-sm outline-none focus:border-[#FFC72C]" /></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">{selectedMenu.map((item) => <MenuItem key={item.id} item={item} onAdd={(dish) => { addToCart(dish); go("onlineCart"); }} />)}</div>
          </section>}

          {screen === "onlineRatings" && <section className="space-y-4">
            <div className="rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div><h2 className="text-2xl font-black">Ratings for {selected.name}</h2><p className="mt-1 text-sm text-slate-500">Prototype data only.</p></div><div className="text-right"><p className="text-3xl font-black text-[#003E74]">{selected.rating.toFixed(1)}</p><StarRating value={Math.round(selected.rating)} small /></div></div></div>
            <div className="rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><h4 className="font-black">Leave a review</h4><p className="text-xs text-slate-500">Name is anonymised.</p></div><StarRating value={reviewRating} interactive onChange={setReviewRating} /></div><input value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Your name" className="mt-4 h-11 w-full rounded-2xl border border-[#E8D8B8] px-4 text-sm outline-none focus:border-[#FFC72C]" /><div className="mt-3 flex gap-3"><textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your comment..." className="min-h-24 flex-1 resize-none rounded-2xl border border-[#E8D8B8] p-4 text-sm outline-none focus:border-[#FFC72C]" /><button onClick={submitReview} className="self-end rounded-full bg-[#FFC72C] p-4 text-slate-950"><Send className="h-5 w-5" /></button></div></div>
            <div className="space-y-3">{displayReviews.map((review) => <div key={review.id} className="rounded-3xl border border-[#E8D8B8] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="font-black">{review.user}</p><p className="text-xs text-slate-500">Verified student</p></div><StarRating value={review.rating} small /></div><p className="mt-4 text-sm leading-6 text-slate-600">“{review.text}”</p></div>)}</div>
          </section>}

          {screen === "onlineCart" && <section className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-[#003E74]">Online basket</p><h2 className="text-3xl font-black">Cart</h2></div><div className="rounded-full bg-[#FFC72C] px-4 py-2 text-sm font-black">{itemCount} items</div></div>
            {cart.length === 0 ? <div className="rounded-3xl border border-dashed border-[#E8D8B8] bg-white py-14 text-center text-slate-500"><ShoppingBag className="mx-auto h-10 w-10 text-[#003E74]" /><p className="mt-3 font-black text-slate-700">No items yet</p><button onClick={() => go("onlineShops")} className="mt-4 rounded-full bg-[#FFC72C] px-5 py-3 font-black text-slate-950">Choose food</button></div> : <div className="space-y-3">{cart.map((item) => <div key={item.id} className="rounded-3xl border border-[#E8D8B8] bg-white p-3 shadow-sm"><div className="flex gap-3"><img src={item.image} className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><p className="truncate font-black">{item.name}</p><p className="text-xs text-slate-500">{item.restaurant} · {item.prep} min</p></div><p className="font-black">£{(item.price * item.qty).toFixed(2)}</p></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-full bg-[#F5F7FA] p-1"><button onClick={() => changeQty(item.id, -1)} className="rounded-full bg-white p-1 shadow-sm"><Minus className="h-4 w-4" /></button><span className="w-6 text-center text-sm font-black">{item.qty}</span><button onClick={() => changeQty(item.id, 1)} className="rounded-full bg-white p-1 shadow-sm"><Plus className="h-4 w-4" /></button></div><button onClick={() => changeQty(item.id, -item.qty)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button></div></div></div></div>)}</div>}
            <div className="rounded-3xl bg-[#F5F7FA] p-4"><button onClick={() => setShowPickupPicker((prev) => !prev)} className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm"><div className="flex items-center gap-3"><CalendarClock className="h-5 w-5 text-[#003E74]" /><div><p className="text-xs font-bold text-slate-500">Reserved pickup time</p><p className="text-lg font-black text-[#003E74]">Today {pickupTime}</p></div></div><span className="text-sm font-black text-slate-400">{showPickupPicker ? "Close" : "Change"}</span></button><AnimatePresence>{showPickupPicker && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-3 max-h-40 overflow-y-auto rounded-2xl border border-[#E8D8B8] bg-white p-2">{pickupSlots.map((slot) => <button key={slot} onClick={() => { setPickupTime(slot); setShowPickupPicker(false); }} className={`mb-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black last:mb-0 ${pickupTime === slot ? "bg-[#FFC72C] text-slate-950" : "text-slate-700 hover:bg-[#FFF7D8]"}`}><span>Today {slot}</span>{pickupTime === slot && <CheckCircle2 className="h-4 w-4" />}</button>)}</div></motion.div>}</AnimatePresence><div className="mt-4 flex justify-between text-sm text-slate-600"><span>Estimated preparation</span><span className="font-black text-slate-950">{maxPrep || "--"} min</span></div><div className="mt-2 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span className="font-black text-slate-950">£{onlineTotal.toFixed(2)}</span></div><div className="my-4 h-px bg-[#E8D8B8]" /><div className="flex justify-between text-2xl font-black"><span>Total</span><span>£{onlineTotal.toFixed(2)}</span></div><button onClick={() => cart.length && openPayment("online")} disabled={!cart.length} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-5 py-4 font-black text-slate-950 shadow-md disabled:bg-slate-300"><CreditCard className="h-5 w-5" /> Continue to payment</button></div>{ordered && <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800"><div className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" /> Payment complete</div><p className="mt-1 text-sm">Collect at <b>{pickupTime}</b>.</p></div>}
          </section>}

          {screen === "nfcScan" && <section className="space-y-4">
            <div className="rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-sm"><Pill active>NFC smart tray</Pill><h2 className="mt-4 text-4xl font-black">Scan tray. Detect dishes.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Tap scan to simulate dishes detected on the tray.</p><div className="mt-6 grid gap-3"><button onClick={scanNextItem} className="flex items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-5 py-4 font-black text-slate-950"><ScanLine className="h-5 w-5" /> Scan item</button><button onClick={() => { setNfcItems([]); setNfcPaid(false); }} className="flex items-center justify-center gap-2 rounded-full border border-[#E8D8B8] bg-white px-5 py-4 font-black text-slate-700"><RotateCcw className="h-5 w-5" /> Reset tray</button></div></div>
            <button onClick={() => go("nfcTray")} className="w-full rounded-[2rem] bg-[#FFC72C] p-5 text-left font-black">View tray basket <ArrowRight className="float-right h-5 w-5" /></button>
          </section>}

          {screen === "nfcTray" && <section className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-[#003E74]">NFC tray basket</p><h2 className="text-3xl font-black">Tray</h2></div><div className="rounded-full bg-[#FFC72C] px-4 py-2 text-sm font-black">{nfcItems.length} items</div></div>
            {nfcItems.length ? <div className="space-y-3">{nfcItems.map((item) => <NfcItemCard key={item.id} item={item} onRemove={(id) => { setNfcItems((prev) => prev.filter((x) => x.id !== id)); setNfcPaid(false); }} />)}</div> : <div className="rounded-3xl border border-dashed border-[#E8D8B8] bg-white py-14 text-center text-slate-500"><Nfc className="mx-auto h-10 w-10 text-[#003E74]" /><p className="mt-3 font-black text-slate-700">Empty tray</p><button onClick={() => go("nfcScan")} className="mt-4 rounded-full bg-[#FFC72C] px-5 py-3 font-black text-slate-950">Scan item</button></div>}
            <div className="rounded-3xl bg-[#F5F7FA] p-4"><div className="flex justify-between text-sm text-slate-600"><span>Detection mode</span><span className="font-black text-slate-950">NFC / QR backup</span></div><div className="mt-2 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span className="font-black text-slate-950">£{nfcTotal.toFixed(2)}</span></div><div className="my-4 h-px bg-[#E8D8B8]" /><div className="flex justify-between text-2xl font-black"><span>Total</span><span>£{nfcTotal.toFixed(2)}</span></div><button onClick={() => openPayment("nfc")} disabled={!nfcItems.length} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-5 py-4 font-black text-slate-950 shadow-md disabled:bg-slate-300"><WalletCards className="h-5 w-5" /> Pay tray basket</button></div>{nfcPaid && <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800"><div className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" /> NFC tray payment complete</div><p className="mt-1 text-sm">Tray session NFC-A12 has been closed.</p></div>}
          </section>}
        </motion.div>
      </AnimatePresence>
    </main>
    <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#E8D8B8] bg-white/90 px-4 py-3 shadow-2xl backdrop-blur-xl">

  <button
    onClick={() => {
  setScreen("onlineShops");
  setHistory([]);
}}
    className={`flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-black transition
${
  screen === "onlineShops"
    ? "bg-[#003E74] text-white shadow-lg shadow-[#003E74]/30"
    : "text-[#003E74] hover:bg-[#F5F7FA]"
}`}
  >
    <Store className="h-5 w-5" />
    Menu
  </button>

  <button
    onClick={() => go("onlineCart")}
    className={`relative flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-black transition
${
  screen === "onlineCart"
    ? "bg-[#003E74] text-white shadow-lg shadow-[#003E74]/30"
    : "text-[#003E74] hover:bg-[#F5F7FA]"
}`}
  >
    <ShoppingBag className="h-5 w-5" />
    Cart

    {itemCount > 0 && (
      <span className="absolute right-2 top-1 rounded-full bg-[#FFC72C] px-1.5 text-[10px] font-black text-slate-950">
        {itemCount}
      </span>
    )}
  </button>

  <button
    onClick={() => go("onlineSeats")}
    className={`flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-black transition
${
  screen === "onlineSeats"
    ? "bg-[#003E74] text-white shadow-lg shadow-[#003E74]/30"
    : "text-[#003E74] hover:bg-[#F5F7FA]"
}`}
  >
    <Armchair className="h-5 w-5" />
    Seats
  </button>

</div>
    <AnimatePresence>{showNfcConnect && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-5 backdrop-blur-sm"><motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center shadow-2xl ring-1 ring-[#E8D8B8]"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC72C] text-slate-950"><Nfc className="h-8 w-8" /></div><p className="mt-4 text-xl font-black text-slate-950">Successfully connected to smart tray</p><p className="mt-2 text-sm text-slate-500">NFC session started</p><button onClick={() => setShowNfcConnect(false)} className="mt-5 w-full rounded-full bg-[#003E74] px-5 py-3 font-black text-white">Continue</button></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{selectedArea && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm"><motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-sm font-black text-[#003E74]">Seat availability</p><h2 className="text-3xl font-black">{selectedArea.name}</h2><p className="mt-1 text-sm text-slate-500">{selectedArea.description} · {getAvailableSeats(selectedArea)} seats available</p></div><button onClick={() => setSelectedArea(null)} className="rounded-full border border-[#E8D8B8] p-2 hover:bg-[#F5F7FA]"><X className="h-5 w-5" /></button></div><SeatGrid area={selectedArea} /><button onClick={() => setSelectedArea(null)} className="mt-6 h-12 w-full rounded-full bg-[#FFC72C] font-black text-slate-950 hover:bg-[#E5A900]">Done</button></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{showPayment && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm"><motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-sm font-black text-[#003E74]">Test payment</p><h2 className="text-3xl font-black">Checkout</h2></div><div className="rounded-full bg-[#F5F7FA] p-3 text-[#003E74]"><Lock className="h-6 w-6" /></div></div><div className="mt-6 rounded-3xl bg-[#FFC72C] p-5 text-slate-950"><p className="text-sm text-slate-600">Imperial Food Card</p><p className="mt-6 text-xl font-black tracking-[0.25em]">4242 4242 4242 4242</p><div className="mt-5 flex justify-between text-sm"><span>TEST USER</span><span>12/30</span></div></div><div className="mt-5 space-y-3"><div className="flex justify-between text-sm"><span className="text-slate-500">Payment type</span><span className="font-black">{paymentMode === "nfc" ? "NFC tray" : "Online order"}</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">Amount</span><span className="font-black">£{total.toFixed(2)}</span></div>{paymentMode === "online" && <div className="flex justify-between text-sm"><span className="text-slate-500">Reserved pickup</span><span className="font-black">Today {pickupTime}</span></div>}<div className="flex items-center gap-2 rounded-2xl bg-green-50 p-3 text-sm font-bold text-green-700"><ShieldCheck className="h-5 w-5" /> This is a simulated payment for testing only.</div></div><div className="mt-6 flex gap-3"><button onClick={() => setShowPayment(false)} className="h-12 flex-1 rounded-full border border-[#E8D8B8] font-black text-slate-700 hover:bg-[#F5F7FA]">Cancel</button><button onClick={completePayment} className="h-12 flex-1 rounded-full bg-[#FFC72C] font-black text-slate-950 hover:bg-[#E5A900]">Pay now</button></div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
