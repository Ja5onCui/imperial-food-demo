import React, { useMemo, useState } from "react";
import {
  Search, Menu, Star, Clock, SlidersHorizontal, ShoppingBag, Plus, Minus,
  Trash2, CheckCircle2, ArrowRight, CreditCard, Lock, MessageSquare, Utensils,
  ShieldCheck, Send, CalendarClock, Armchair, X, Nfc, ScanLine, RotateCcw,
  WalletCards, MonitorSmartphone, Home, Store, MapPinned
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BLUE = "#003E74";
const YELLOW = "#FFC72C";
const BORDER = "#E8D8B8";

const pickupSlots = ["11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:30","16:00"];

const seatingAreas = [
  { id: "A", name: "Area A", description: "Quiet study dining zone", rows: 5, cols: 8, occupied: [2,5,6,9,14,19,22,27,31,33,38] },
  { id: "B", name: "Area B", description: "Social dining zone", rows: 6, cols: 7, occupied: [1,3,4,8,11,12,17,21,24,28,29,34,37,39] },
];

const restaurants = [
  {
    id: 1, name: "Kimiko", tags: ["Japanese", "Sushi", "Hot food"], rating: 4.7, wait: 12,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", status: "Popular",
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
    id: 2, name: "Haochi", tags: ["Chinese", "Noodles", "Rice bowl"], rating: 4.5, wait: 15,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop", status: "Busy",
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
    id: 3, name: "La Cantina", tags: ["Mexican", "Burrito", "Tacos"], rating: 4.4, wait: 10,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop", status: "Available",
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
    id: 4, name: "Feast", tags: ["Hot meals", "Grill", "Campus classic"], rating: 4.2, wait: 18,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600&auto=format&fit=crop", status: "Busy",
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
    id: 5, name: "Pizza Pi", tags: ["Pizza", "Vegetarian", "Fast"], rating: 4.3, wait: 8,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", status: "Available",
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
    id: 6, name: "Starbucks", tags: ["Coffee", "Bakery", "Grab-and-go"], rating: 4.1, wait: 5,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop", status: "Fast",
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
  return <div className="flex items-center gap-1">{[1,2,3,4,5].map(i => {
    const icon = <Star className={`${small ? "h-4 w-4" : "h-6 w-6"} ${i <= value ? "fill-[#FFC72C] text-[#FFC72C]" : "fill-slate-200 text-slate-200"}`} />;
    return interactive ? <button key={i} onClick={() => onChange(i)} className="transition hover:scale-110 active:scale-95">{icon}</button> : <span key={i}>{icon}</span>;
  })}</div>;
}
function Rating({ value }) {
  return <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-[#FFC72C] text-[#FFC72C]" /><span className="text-sm font-bold text-[#003E74]">{value.toFixed(1)}</span></div>;
}
function getAvailableSeats(area) { return area.rows * area.cols - area.occupied.length; }

function SeatGrid({ area, large = false }) {
  const total = area.rows * area.cols;
  return <div className="rounded-3xl bg-white p-4">
    <div className="mb-4 rounded-2xl bg-[#FFC72C] py-2 text-center text-xs font-black text-slate-950">CAFETERIA FRONT</div>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${area.cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }).map((_, index) => {
        const seatNo = index + 1;
        const occupied = area.occupied.includes(seatNo);
        return <div key={seatNo} className={`flex items-center justify-center rounded-lg border text-[10px] font-black transition ${large ? "h-10" : "h-7"} ${occupied ? "border-red-200 bg-red-500 text-slate-950" : "border-[#E8D8B8] bg-white text-slate-300 hover:border-[#003E74] hover:text-[#003E74]"}`}>{occupied ? "●" : seatNo}</div>;
      })}
    </div>
    <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold text-slate-500"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-white ring-1 ring-[#E8D8B8]" />Available</div><div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-red-500" />Occupied</div></div>
  </div>;
}
function SeatingCard({ area, onOpen }) {
  const available = getAvailableSeats(area), total = area.rows * area.cols;
  return <button onClick={() => onOpen(area)} className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-[#E8D8B8] transition hover:-translate-y-0.5">
    <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-slate-600">{area.name}</p><h3 className="mt-1 text-4xl font-black text-slate-950">{available}</h3><p className="text-xs text-slate-600">seats available / {total}</p></div><div className="rounded-full bg-[#F5F7FA] p-3 text-[#003E74]"><Armchair className="h-6 w-6" /></div></div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F5F7FA]"><div className="h-full rounded-full bg-[#FFC72C]" style={{ width: `${(available / total) * 100}%` }} /></div>
    <p className="mt-3 text-xs text-slate-600">Click to view seat map</p>
  </button>;
}
function RestaurantCard({ item, selected, onSelect, goNext }) {
  const active = selected?.id === item.id;
  return <motion.button layout onClick={() => { onSelect(item); goNext?.(); }} className={`group w-full rounded-3xl border p-3 text-left transition-all duration-200 ${active ? "border-[#FFC72C] bg-[#FFF7D8] shadow-sm" : "border-[#E8D8B8] bg-white hover:border-[#FFC72C] hover:shadow-sm"}`}>
    <div className="flex gap-3"><img src={item.image} alt="Restaurant" className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h3 className="truncate text-base font-black text-slate-950">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.tags.slice(0,2).join(" · ")}</p></div><ArrowRight className={`h-5 w-5 transition ${active ? "text-[#003E74]" : "text-slate-300 group-hover:text-[#003E74]"}`} /></div><div className="mt-4 flex items-center justify-between"><Rating value={item.rating} /><div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-black text-slate-900 shadow-sm"><Clock className="h-4 w-4 text-[#003E74]" /> {item.wait} min</div></div></div></div>
  </motion.button>;
}
function MenuItem({ item, addToCart, goCart }) {
  return <motion.div layout className="group overflow-hidden rounded-[1.75rem] border border-[#E8D8B8] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h4 className="text-lg font-black leading-tight text-slate-950">{item.name}</h4><p className="mt-1 text-sm text-slate-500">{item.calories}</p></div><p className="text-lg font-black text-slate-950">£{item.price.toFixed(2)}</p></div><div className="mt-4 flex items-center justify-between"><Pill><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.prep} min</span></Pill><button onClick={() => { addToCart(item); goCart?.(); }} className="flex h-10 items-center gap-2 rounded-full bg-[#FFC72C] px-4 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#E5A900] active:scale-95"><Plus className="h-4 w-4" /> Add</button></div></div>
  </motion.div>;
}
function NfcItemCard({ item, onRemove }) {
  return <div className="rounded-3xl border border-[#E8D8B8] bg-white p-4 shadow-sm">
    <div className="flex gap-4"><img src={item.image} className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h4 className="font-black text-slate-950">{item.name}</h4><p className="text-xs text-slate-500">{item.restaurant} · {item.calories}</p></div><p className="font-black">£{item.price.toFixed(2)}</p></div><div className="mt-4 flex items-center justify-between"><span className="rounded-full bg-[#F5F7FA] px-3 py-1 text-xs font-black text-[#003E74]">{item.tag}</span><button onClick={() => onRemove(item.id)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button></div></div></div>
  </div>;
}
function MobileNav({ mainMode, onlineView, nfcView, setOnlineView, setNfcView, itemCount, nfcCount }) {
  const items = mainMode === "online"
    ? [
      ["seats", MapPinned, "Seats"], ["shops", Store, "Shops"], ["menu", Utensils, "Menu"], ["cart", ShoppingBag, `Cart${itemCount ? ` ${itemCount}` : ""}`]
    ]
    : [["scan", ScanLine, "Scan"], ["tray", ShoppingBag, `Tray${nfcCount ? ` ${nfcCount}` : ""}`], ["seats", MapPinned, "Seats"]];
  const current = mainMode === "online" ? onlineView : nfcView;
  const setter = mainMode === "online" ? setOnlineView : setNfcView;
  return <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E8D8B8] bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map(([id, Icon, label]) => <button key={id} onClick={() => setter(id)} className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs font-black transition ${current === id ? "bg-[#FFC72C] text-slate-950" : "text-slate-500"}`}><Icon className="mb-1 h-5 w-5" />{label}</button>)}
    </div>
  </div>;
}
function ShowOnMobile({ active, children }) {
  return <div className={active ? "block" : "hidden md:block"}>{children}</div>;
}

export default function ImperialFoodWebpage() {
  const [mainMode, setMainMode] = useState("online");
  const [onlineView, setOnlineView] = useState("seats");
  const [nfcView, setNfcView] = useState("scan");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("wait");
  const [selected, setSelected] = useState(restaurants[0]);
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [tab, setTab] = useState("order");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState("online");
  const [localReviews, setLocalReviews] = useState({});
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [pickupTime, setPickupTime] = useState("13:00");
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [nfcItems, setNfcItems] = useState([nfcSampleItems[0], nfcSampleItems[1]]);
  const [nfcPaid, setNfcPaid] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let data = restaurants.filter(r => r.name.toLowerCase().includes(q) || r.tags.join(" ").toLowerCase().includes(q));
    if (sort === "wait") data = [...data].sort((a,b) => a.wait - b.wait);
    if (sort === "rating") data = [...data].sort((a,b) => b.rating - a.rating);
    return data;
  }, [query, sort]);

  const selectedMenu = selected.menu.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || query === "");
  const displayReviews = [...(localReviews[selected.id] || []), ...selected.reviews];
  const onlineTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const nfcTotal = nfcItems.reduce((sum, item) => sum + item.price, 0);
  const total = paymentMode === "nfc" ? nfcTotal : onlineTotal;
  const maxPrep = cart.length ? Math.max(...cart.map(item => item.prep)) : 0;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(item) {
    setOrdered(false);
    setCart(prev => {
      const found = prev.find(x => x.id === item.id);
      if (found) return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, restaurant: selected.name, qty: 1 }];
    });
  }
  function changeQty(id, delta) {
    setOrdered(false);
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0));
  }
  function submitReview() {
    const text = reviewText.trim();
    if (!text) return;
    const newReview = { id: `local-${Date.now()}`, user: anonymiseName(reviewName), rating: reviewRating, text };
    setLocalReviews(prev => ({ ...prev, [selected.id]: [newReview, ...(prev[selected.id] || [])] }));
    setReviewName(""); setReviewText(""); setReviewRating(5);
  }
  function scanNextItem() {
    setNfcPaid(false);
    const next = nfcSampleItems.find(item => !nfcItems.some(existing => existing.id === item.id));
    if (next) setNfcItems(prev => [...prev, next]);
    setNfcView("tray");
  }
  function clearNfcItems() { setNfcItems([]); setNfcPaid(false); }
  function removeNfcItem(id) { setNfcItems(prev => prev.filter(item => item.id !== id)); setNfcPaid(false); }
  function openPayment(mode) { setPaymentMode(mode); setShowPayment(true); }
  function completePayment() { setShowPayment(false); paymentMode === "nfc" ? setNfcPaid(true) : setOrdered(true); }

  return <div className="min-h-screen bg-white pb-24 text-slate-950 md:pb-0">
    <header className="sticky top-0 z-20 border-b border-[#E8D8B8] bg-white/95 px-5 py-4 backdrop-blur md:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between"><div className="flex items-baseline gap-1"><h1 className="tracking-[0.28em] text-2xl font-black text-[#003E74]">IMPERIAL</h1><span className="text-xs font-black text-[#003E74]">Food</span></div><div className="flex items-center gap-3"><div className="hidden rounded-full bg-[#F5F7FA] px-4 py-2 text-sm font-bold text-[#003E74] md:block">Fast campus ordering</div><button className="rounded-full border border-[#E8D8B8] bg-white p-2"><Menu className="h-5 w-5" /></button></div></div></header>

    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <section className="space-y-5 md:space-y-6">
        <ShowOnMobile active={mainMode === "online" ? onlineView === "seats" : nfcView === "seats"}>
          <div className="rounded-[2rem] bg-white p-5 shadow-lg ring-1 ring-[#E8D8B8] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-center"><div><Pill active>Smart cafeteria system</Pill><h2 className="mt-5 max-w-2xl text-4xl font-black tracking-tight md:text-5xl"><span className="text-[#FFC72C]">Order online</span> or pay by NFC tray.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">Choose online pre-ordering, or use an NFC tray to detect food already picked up on site.</p><button onClick={() => mainMode === "online" ? setOnlineView("shops") : setNfcView("scan")} className="mt-5 rounded-full bg-[#FFC72C] px-5 py-3 font-black text-slate-950 md:hidden">Start</button></div><div className="grid gap-4 sm:grid-cols-2">{seatingAreas.map(area => <SeatingCard key={area.id} area={area} onOpen={setSelectedArea} />)}</div></div>
          </div>
        </ShowOnMobile>

        <div className="rounded-full bg-white p-1 shadow-sm ring-1 ring-[#E8D8B8]"><div className="grid grid-cols-2 gap-1"><button onClick={() => { setMainMode("online"); setOnlineView("shops"); }} className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${mainMode === "online" ? "bg-[#FFC72C] text-slate-950" : "text-slate-500 hover:text-slate-950"}`}><MonitorSmartphone className="h-4 w-4" /> Online ordering</button><button onClick={() => { setMainMode("nfc"); setNfcView("scan"); }} className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${mainMode === "nfc" ? "bg-[#FFC72C] text-slate-950" : "text-slate-500 hover:text-slate-950"}`}><Nfc className="h-4 w-4" /> NFC smart tray</button></div></div>

        {mainMode === "nfc" ? <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <ShowOnMobile active={nfcView === "scan"}>
            <section className="rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-sm md:p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-center"><div><Pill active>NFC smart tray</Pill><h3 className="mt-4 text-4xl font-black text-slate-950">Scan tray. Detect dishes. Pay directly.</h3><p className="mt-3 text-sm leading-6 text-slate-600">Tap scan to simulate dishes detected on the tray.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={scanNextItem} className="flex items-center gap-2 rounded-full bg-[#FFC72C] px-5 py-3 font-black text-slate-950 shadow-sm hover:bg-[#E5A900]"><ScanLine className="h-5 w-5" /> Scan item</button><button onClick={clearNfcItems} className="flex items-center gap-2 rounded-full border border-[#E8D8B8] bg-white px-5 py-3 font-black text-slate-700 hover:bg-[#F5F7FA]"><RotateCcw className="h-5 w-5" /> Reset tray</button></div></div><div className="rounded-[2rem] bg-[#FFC72C] p-6 text-slate-950"><div className="flex items-center gap-3"><div className="rounded-full bg-white/60 p-4"><Nfc className="h-9 w-9" /></div><div><p className="text-sm text-slate-600">Active tray</p><p className="text-3xl font-black">NFC-A12</p></div></div><div className="mt-6 rounded-2xl bg-white p-4"><p className="text-xs font-bold text-slate-500">Detected items</p><p className="text-4xl font-black text-[#003E74]">{nfcItems.length}</p></div></div></div>
            </section>
          </ShowOnMobile>
          <ShowOnMobile active={nfcView === "tray"}>
            <aside className="sticky top-24 h-fit rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-lg"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-[#003E74]">NFC tray basket</p><h2 className="text-3xl font-black">Tray</h2></div><div className="rounded-full bg-[#FFC72C] px-4 py-2 text-sm font-black text-slate-950">{nfcItems.length} items</div></div><div className="mt-5 max-h-[420px] space-y-3 overflow-auto pr-1">{nfcItems.length ? nfcItems.map(item => <NfcItemCard key={item.id} item={item} onRemove={removeNfcItem} />) : <div className="rounded-3xl border border-dashed border-[#E8D8B8] bg-white py-12 text-center text-slate-500"><ShoppingBag className="mx-auto h-10 w-10 text-[#003E74]" /><p className="mt-3 font-black text-slate-700">Empty tray</p><p className="text-sm">Scanned food will appear here.</p></div>}</div><div className="mt-5 rounded-3xl bg-[#F5F7FA] p-4"><div className="flex justify-between text-sm text-slate-600"><span>Detection mode</span><span className="font-black text-slate-950">NFC / QR backup</span></div><div className="mt-2 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span className="font-black text-slate-950">£{nfcTotal.toFixed(2)}</span></div><div className="my-4 h-px bg-[#E8D8B8]" /><div className="flex justify-between text-2xl font-black"><span>Total</span><span>£{nfcTotal.toFixed(2)}</span></div><button onClick={() => openPayment("nfc")} disabled={!nfcItems.length} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-5 py-4 font-black text-slate-950 shadow-md transition hover:bg-[#E5A900] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"><WalletCards className="h-5 w-5" /> Pay tray basket</button></div><AnimatePresence>{nfcPaid && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800"><div className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" /> NFC tray payment complete</div><p className="mt-1 text-sm">Tray session NFC-A12 has been closed.</p></motion.div>}</AnimatePresence></aside>
          </ShowOnMobile>
        </div> : <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <section className="grid gap-6 xl:grid-cols-[310px_1fr]">
            <ShowOnMobile active={onlineView === "shops"}>
              <aside className="rounded-[2rem] border border-[#E8D8B8] bg-white p-4 shadow-sm"><div className="flex items-center justify-between px-2 py-2"><h3 className="text-xl font-black">Shops</h3><button onClick={() => setSort(sort === "wait" ? "rating" : "wait")} className="flex items-center gap-1 rounded-full bg-[#F5F7FA] px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-[#FFF7D8]"><SlidersHorizontal className="h-4 w-4" /> {sort === "wait" ? "Time" : "Rating"}</button></div><div className="mt-3 space-y-3">{filtered.map(item => <RestaurantCard key={item.id} item={item} selected={selected} onSelect={setSelected} goNext={() => setOnlineView("menu")} />)}</div></aside>
            </ShowOnMobile>
            <ShowOnMobile active={onlineView === "menu"}>
              <section className="rounded-[2rem] border border-[#E8D8B8] bg-white p-4 shadow-sm md:p-5"><div className="mb-5 flex rounded-full bg-[#F5F7FA] p-1"><button onClick={() => setTab("order")} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${tab === "order" ? "bg-[#FFC72C] text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}><Utensils className="h-4 w-4" /> Order</button><button onClick={() => setTab("reviews")} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${tab === "reviews" ? "bg-[#FFC72C] text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}><MessageSquare className="h-4 w-4" /> Ratings</button></div>
                {tab === "order" ? <><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 className="text-2xl font-black">Menu</h3><p className="text-sm text-slate-500">Choose dishes from {selected.name}</p></div><div className="relative md:w-80"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dishes or shops..." className="h-12 w-full rounded-full border border-[#E8D8B8] bg-[#F5F7FA] pl-11 pr-4 text-sm outline-none transition focus:border-[#FFC72C] focus:bg-white" /></div></div><div className="mt-5 grid gap-4 md:grid-cols-2">{selectedMenu.map(item => <MenuItem key={item.id} item={item} addToCart={addToCart} goCart={() => setOnlineView("cart")} />)}</div></> : <div><div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-black">Ratings for {selected.name}</h3><p className="mt-1 text-sm text-slate-500">Prototype data only.</p></div><div className="rounded-3xl bg-[#F5F7FA] p-4 text-right"><p className="text-sm font-bold text-slate-500">Average</p><p className="text-3xl font-black text-[#003E74]">{selected.rating.toFixed(1)}</p><StarRating value={Math.round(selected.rating)} small /></div></div><div className="mt-6 rounded-3xl border border-[#E8D8B8] bg-white p-5"><div className="flex items-center justify-between gap-3"><div><h4 className="font-black text-slate-950">Leave a review</h4><p className="text-xs text-slate-500">Username will be anonymised.</p></div><StarRating value={reviewRating} interactive onChange={setReviewRating} /></div><input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="Your name" className="mt-4 h-11 w-full rounded-2xl border border-[#E8D8B8] bg-white px-4 text-sm outline-none focus:border-[#FFC72C]" /><div className="mt-3 flex gap-3"><textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Write your comment..." className="min-h-24 flex-1 resize-none rounded-2xl border border-[#E8D8B8] bg-white p-4 text-sm outline-none focus:border-[#FFC72C]" /><button onClick={submitReview} className="self-end rounded-full bg-[#FFC72C] p-4 text-slate-950 shadow-sm transition hover:bg-[#E5A900]"><Send className="h-5 w-5" /></button></div></div><div className="mt-6 space-y-4">{displayReviews.map(review => <div key={review.id} className="rounded-3xl border border-[#E8D8B8] bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="font-black text-slate-950">{review.user}</p><p className="text-xs text-slate-500">Verified student · sample review</p></div><StarRating value={review.rating} small /></div><p className="mt-4 text-sm leading-6 text-slate-600">“{review.text}”</p></div>)}</div></div>}
              </section>
            </ShowOnMobile>
          </section>
          <ShowOnMobile active={onlineView === "cart"}>
            <aside className="sticky top-24 h-fit rounded-[2rem] border border-[#E8D8B8] bg-white p-5 shadow-lg"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-[#003E74]">Your basket</p><h2 className="text-3xl font-black">Cart</h2></div><div className="rounded-full bg-[#FFC72C] px-4 py-2 text-sm font-black text-slate-950">{itemCount} items</div></div><div className="mt-5 max-h-[360px] overflow-auto pr-1">{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-[#E8D8B8] bg-white py-12 text-center text-slate-500"><ShoppingBag className="mx-auto h-10 w-10 text-[#003E74]" /><p className="mt-3 font-black text-slate-700">No items yet</p><p className="text-sm">Add a dish from the menu.</p></div> : <div className="space-y-3">{cart.map(item => <motion.div layout key={item.id} className="rounded-3xl border border-[#E8D8B8] bg-white p-3 shadow-sm"><div className="flex gap-3"><img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><p className="truncate font-black">{item.name}</p><p className="text-xs text-slate-500">{item.restaurant} · {item.prep} min</p></div><p className="font-black">£{(item.price * item.qty).toFixed(2)}</p></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-full bg-[#F5F7FA] p-1"><button onClick={() => changeQty(item.id, -1)} className="rounded-full bg-white p-1 shadow-sm"><Minus className="h-4 w-4" /></button><span className="w-6 text-center text-sm font-black">{item.qty}</span><button onClick={() => changeQty(item.id, 1)} className="rounded-full bg-white p-1 shadow-sm"><Plus className="h-4 w-4" /></button></div><button onClick={() => changeQty(item.id, -item.qty)} className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button></div></div></div></motion.div>)}</div>}</div><div className="mt-5 rounded-3xl bg-[#F5F7FA] p-4"><button onClick={() => setShowPickupPicker(prev => !prev)} className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition hover:bg-[#FFF7D8]"><div className="flex items-center gap-3"><div className="rounded-full bg-[#F5F7FA] p-2 text-[#003E74]"><CalendarClock className="h-5 w-5" /></div><div><p className="text-xs font-bold text-slate-500">Reserved pickup time</p><p className="text-lg font-black text-[#003E74]">Today {pickupTime}</p></div></div><span className="text-sm font-black text-slate-400">{showPickupPicker ? "Close" : "Change"}</span></button><AnimatePresence>{showPickupPicker && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-3 max-h-40 overflow-y-auto rounded-2xl border border-[#E8D8B8] bg-white p-2">{pickupSlots.map(slot => <button key={slot} onClick={() => { setPickupTime(slot); setShowPickupPicker(false); }} className={`mb-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition last:mb-0 ${pickupTime === slot ? "bg-[#FFC72C] text-slate-950" : "text-slate-700 hover:bg-[#FFF7D8]"}`}><span>Today {slot}</span>{pickupTime === slot && <CheckCircle2 className="h-4 w-4" />}</button>)}</div></motion.div>}</AnimatePresence><div className="mt-4 flex justify-between text-sm text-slate-600"><span>Estimated preparation</span><span className="font-black text-slate-950">{maxPrep || "--"} min</span></div><div className="mt-2 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span className="font-black text-slate-950">£{onlineTotal.toFixed(2)}</span></div><div className="my-4 h-px bg-[#E8D8B8]" /><div className="flex justify-between text-2xl font-black"><span>Total</span><span>£{onlineTotal.toFixed(2)}</span></div><button onClick={() => cart.length && openPayment("online")} disabled={!cart.length} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-5 py-4 font-black text-slate-950 shadow-md transition hover:bg-[#E5A900] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"><CreditCard className="h-5 w-5" /> Continue to payment</button></div><AnimatePresence>{ordered && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800"><div className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" /> Payment complete</div><p className="mt-1 text-sm">Collect at <b>{pickupTime}</b>.</p></motion.div>}</AnimatePresence></aside>
          </ShowOnMobile>
        </div>}
      </section>
    </main>
    <MobileNav mainMode={mainMode} onlineView={onlineView} nfcView={nfcView} setOnlineView={setOnlineView} setNfcView={setNfcView} itemCount={itemCount} nfcCount={nfcItems.length} />

    <AnimatePresence>{selectedArea && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm"><motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-3xl rounded-[2rem] bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-sm font-black text-[#003E74]">Seat availability</p><h2 className="text-3xl font-black">{selectedArea.name}</h2><p className="mt-1 text-sm text-slate-500">{selectedArea.description} · {getAvailableSeats(selectedArea)} seats available</p></div><button onClick={() => setSelectedArea(null)} className="rounded-full border border-[#E8D8B8] p-2 hover:bg-[#F5F7FA]"><X className="h-5 w-5" /></button></div><SeatGrid area={selectedArea} large /><button onClick={() => setSelectedArea(null)} className="mt-6 h-12 w-full rounded-full bg-[#FFC72C] font-black text-slate-950 hover:bg-[#E5A900]">Done</button></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{showPayment && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm"><motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-sm font-black text-[#003E74]">Test payment</p><h2 className="text-3xl font-black">Checkout</h2></div><div className="rounded-full bg-[#F5F7FA] p-3 text-[#003E74]"><Lock className="h-6 w-6" /></div></div><div className="mt-6 rounded-3xl bg-[#FFC72C] p-5 text-slate-950"><p className="text-sm text-slate-600">Imperial Food Card</p><p className="mt-6 text-xl font-black tracking-[0.25em]">4242 4242 4242 4242</p><div className="mt-5 flex justify-between text-sm"><span>TEST USER</span><span>12/30</span></div></div><div className="mt-5 space-y-3"><div className="flex justify-between text-sm"><span className="text-slate-500">Payment type</span><span className="font-black">{paymentMode === "nfc" ? "NFC tray" : "Online order"}</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">Amount</span><span className="font-black">£{total.toFixed(2)}</span></div>{paymentMode === "online" && <div className="flex justify-between text-sm"><span className="text-slate-500">Reserved pickup</span><span className="font-black">Today {pickupTime}</span></div>}<div className="flex items-center gap-2 rounded-2xl bg-green-50 p-3 text-sm font-bold text-green-700"><ShieldCheck className="h-5 w-5" /> This is a simulated payment for testing only.</div></div><div className="mt-6 flex gap-3"><button onClick={() => setShowPayment(false)} className="h-12 flex-1 rounded-full border border-[#E8D8B8] font-black text-slate-700 hover:bg-[#F5F7FA]">Cancel</button><button onClick={completePayment} className="h-12 flex-1 rounded-full bg-[#FFC72C] font-black text-slate-950 hover:bg-[#E5A900]">Pay now</button></div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
