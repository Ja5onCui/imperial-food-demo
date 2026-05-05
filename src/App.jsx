import React, { useMemo, useState } from "react";
import { Search, Menu, Star, Clock, SlidersHorizontal, ShoppingBag, MapPin, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IMPERIAL_BLUE = "#003E74";

const restaurants = [
  {
    id: 1,
    name: "Kokoro",
    tags: ["Japanese", "Korean", "Hot food"],
    rating: 4.8,
    wait: 15,
    distance: "2 min walk",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
    status: "Busy",
    menu: [
      { id: "k1", name: "Chicken Katsu Curry", price: 6.99, calories: "1000 kcal", prep: 15, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop" },
      { id: "k2", name: "Teriyaki Chicken Bowl", price: 7.49, calories: "820 kcal", prep: 12, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" },
      { id: "k3", name: "Salmon Sushi Box", price: 8.25, calories: "560 kcal", prep: 6, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 2,
    name: "Pizza Pi",
    tags: ["Pizza", "Vegetarian"],
    rating: 4.3,
    wait: 8,
    distance: "3 min walk",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    status: "Available",
    menu: [
      { id: "p1", name: "Margherita Slice", price: 4.5, calories: "520 kcal", prep: 8, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" },
      { id: "p2", name: "Pepperoni Slice", price: 4.95, calories: "610 kcal", prep: 8, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop" },
      { id: "p3", name: "Veggie Pizza", price: 5.2, calories: "580 kcal", prep: 10, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: 3,
    name: "Sandwich Lab",
    tags: ["Sandwiches", "Cold food"],
    rating: 4.0,
    wait: 2,
    distance: "1 min walk",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop",
    status: "Fast",
    menu: [
      { id: "s1", name: "Chicken Caesar Wrap", price: 5.2, calories: "610 kcal", prep: 2, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop" },
      { id: "s2", name: "Tuna Mayo Sandwich", price: 4.8, calories: "490 kcal", prep: 2, image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600&auto=format&fit=crop" },
      { id: "s3", name: "Falafel Wrap", price: 5.4, calories: "540 kcal", prep: 3, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop" },
    ],
  },
];

function Pill({ children, active = false }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-[#003E74] text-white" : "bg-slate-100 text-slate-600"}`}>{children}</span>;
}

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-[#003E74] text-[#003E74]" />
      <span className="text-sm font-bold text-[#003E74]">{value.toFixed(1)}</span>
    </div>
  );
}

function RestaurantCard({ item, selected, onSelect }) {
  const active = selected?.id === item.id;
  return (
    <motion.button
      layout
      onClick={() => onSelect(item)}
      className={`group w-full rounded-3xl border p-3 text-left transition-all duration-200 ${
        active ? "border-[#003E74] bg-[#F1F6FA] shadow-sm" : "border-slate-200 bg-white hover:border-[#003E74]/40 hover:shadow-sm"
      }`}
    >
      <div className="flex gap-3">
        <img src={item.image} alt="Restaurant" className="h-20 w-20 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="truncate text-base font-black text-slate-950">{item.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.tags.slice(0, 2).join(" · ")}</p>
            </div>
            <ArrowRight className={`h-5 w-5 transition ${active ? "text-[#003E74]" : "text-slate-300 group-hover:text-[#003E74]"}`} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Rating value={item.rating} />
            <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-black text-slate-900 shadow-sm">
              <Clock className="h-4 w-4 text-[#003E74]" /> {item.wait} min
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function MenuItem({ item, addToCart }) {
  return (
    <motion.div layout className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-black leading-tight text-slate-950">{item.name}</h4>
            <p className="mt-1 text-sm text-slate-500">{item.calories}</p>
          </div>
          <p className="text-lg font-black text-slate-950">£{item.price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Pill><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.prep} min</span></Pill>
          <button onClick={() => addToCart(item)} className="flex h-10 items-center gap-2 rounded-full bg-[#003E74] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#002B52] active:scale-95">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImperialFoodWebpage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("wait");
  const [selected, setSelected] = useState(restaurants[0]);
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let data = restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.tags.join(" ").toLowerCase().includes(q));
    if (sort === "wait") data = [...data].sort((a, b) => a.wait - b.wait);
    if (sort === "rating") data = [...data].sort((a, b) => b.rating - a.rating);
    return data;
  }, [query, sort]);

  const selectedMenu = selected.menu.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || query === "");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const maxPrep = cart.length ? Math.max(...cart.map((item) => item.prep)) : 0;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(item) {
    setOrdered(false);
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) return prev.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, restaurant: selected.name, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setOrdered(false);
    setCart((prev) => prev.map((x) => x.id === id ? { ...x, qty: x.qty + delta } : x).filter((x) => x.qty > 0));
  }

  function placeOrder() {
    if (!cart.length) return;
    setOrdered(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-baseline gap-1">
            <h1 className="tracking-[0.28em] text-2xl font-black text-[#003E74]">IMPERIAL</h1>
            <span className="text-xs font-black text-[#009FE3]">Food</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-[#F1F6FA] px-4 py-2 text-sm font-bold text-[#003E74] md:block">Fast campus ordering</div>
            <button className="rounded-full border border-slate-200 bg-white p-2"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 p-5 md:p-8 lg:grid-cols-[1fr_390px]">
        <section className="space-y-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#003E74] to-[#001E3A] p-6 text-white shadow-lg md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_260px] md:items-end">
              <div>
                <Pill active>Student dining system</Pill>
                <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">Order ahead. Know the wait. Collect on time.</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100">A cleaner Imperial-style food ordering interface where users can compare waiting time, view dishes, add items to cart and place an order.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-blue-100">Selected shop</p>
                <h3 className="mt-1 text-3xl font-black">{selected.name}</h3>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-4 text-slate-950">
                  <span className="text-sm font-bold text-slate-500">Queue time</span>
                  <span className="text-2xl font-black text-[#003E74]">{selected.wait} min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[310px_1fr]">
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between px-2 py-2">
                <h3 className="text-xl font-black">Shops</h3>
                <button onClick={() => setSort(sort === "wait" ? "rating" : "wait")} className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">
                  <SlidersHorizontal className="h-4 w-4" /> {sort === "wait" ? "Time" : "Rating"}
                </button>
              </div>
              <div className="mt-3 space-y-3">
                {filtered.map((item) => <RestaurantCard key={item.id} item={item} selected={selected} onSelect={setSelected} />)}
              </div>
            </aside>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-black">Menu</h3>
                  <p className="text-sm text-slate-500">Choose dishes from {selected.name}</p>
                </div>
                <div className="relative md:w-80">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes or shops..." className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#003E74] focus:bg-white" />
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {selectedMenu.map((item) => <MenuItem key={item.id} item={item} addToCart={addToCart} />)}
              </div>
            </section>
          </div>
        </section>

        <aside className="sticky top-24 h-fit rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#003E74]">Your basket</p>
              <h2 className="text-3xl font-black">Cart</h2>
            </div>
            <div className="rounded-full bg-[#003E74] px-4 py-2 text-sm font-black text-white">{itemCount} items</div>
          </div>

          <div className="mt-5 max-h-[420px] overflow-auto pr-1">
            {cart.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-500">
                <ShoppingBag className="mx-auto h-10 w-10 text-[#003E74]" />
                <p className="mt-3 font-black text-slate-700">No items yet</p>
                <p className="text-sm">Add a dish from the menu.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <motion.div layout key={item.id} className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="truncate font-black">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.restaurant} · {item.prep} min</p>
                          </div>
                          <p className="font-black">£{(item.price * item.qty).toFixed(2)}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
                            <button onClick={() => changeQty(item.id, -1)} className="rounded-full bg-white p-1 shadow-sm"><Minus className="h-4 w-4" /></button>
                            <span className="w-6 text-center text-sm font-black">{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)} className="rounded-full bg-white p-1 shadow-sm"><Plus className="h-4 w-4" /></button>
                          </div>
                          <button onClick={() => changeQty(item.id, -item.qty)} className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 rounded-3xl bg-[#F1F6FA] p-4">
            <div className="flex justify-between text-sm text-slate-600"><span>Estimated collection</span><span className="font-black text-slate-950">{maxPrep || "--"} min</span></div>
            <div className="mt-2 flex justify-between text-sm text-slate-600"><span>Subtotal</span><span className="font-black text-slate-950">£{total.toFixed(2)}</span></div>
            <div className="my-4 h-px bg-slate-200" />
            <div className="flex justify-between text-2xl font-black"><span>Total</span><span>£{total.toFixed(2)}</span></div>
            <button onClick={placeOrder} disabled={!cart.length} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#003E74] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#002B52] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
              Place order <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <AnimatePresence>
            {ordered && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800">
                <div className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" /> Order placed</div>
                <p className="mt-1 text-sm">Collect in about {maxPrep} minutes. Order number: <b>A{Math.floor(100 + Math.random() * 800)}</b></p>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>
    </div>
  );
}
