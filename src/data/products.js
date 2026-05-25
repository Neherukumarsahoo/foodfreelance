const DEFAULT_PRODUCTS = [
  // Specials
  {
    id: "rustic-pepperoni",
    title: "Rustic Pepperoni",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwk2O8V0kNHz0ixFsEu97Y3M2FR8bDBf3Ldy96JxyiP5SfFlrpBQXgSv_n5LvEY5rlY8W3uvkMQ9CBN79TeIUJleoiy69iONe4cTj2NC2TxvP_NwJZkF1GsCGwtDzjOLt-GiRrVss8iN1GvDhqXqiHzSf8eDsoxO1sJxEG8DZfsdHmYnS5fyi1g-ZYQ_wcIRuqOPNEzV-bi6dumMjyNbj1RYjcxJfKcXu7zrpAHEBZR3rDF8pcjCx3s4Pe_mv_wr6hrnBoOxxp7c",
    badge: "20% OFF",
    badgeColor: "bg-secondary-container",
    rating: "4.8",
    price: "₹1,249",
    delivery: "15-20 Mins Delivery",
    category: "Specials",
    trending: true
  },
  {
    id: "green-glow-bowl",
    title: "Green Glow Bowl",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr9RAdpf7ye5SVsKbab_NtGE3gMmnbZUNyqC9ayqT8Y3Tf2vEUCwtUY4-i8AVLO3zWvHDQcZJT6pqDMMQkA_aGyD-F_7F77IxUsH9SlrG30hLTmP8t1AkKQPM49OXRh4aJL903xkL8ESbZgsM09M7tMu4Wby0jSn4hQNmK_ttvJmgbQc9FlLtj8Ol-GjT89Hza3tXEusB1Va53Q6Lz6s3Wsem6-iYshDOImTPD0mHb4A07W2IZWMK6g3Xom44dAR2m-SdudHe77Sk",
    badge: "Chef's Choice",
    badgeColor: "bg-primary-container",
    rating: "4.9",
    price: "₹1,038",
    delivery: "10-15 Mins Delivery",
    category: "Specials"
  },
  {
    id: "the-curator-burger",
    title: "The Curator Burger",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQOPMQpYERlhhcYbV3_YEDDLwuGGkGDrnsySWaQKEpezMkwCnZBfYKIKUj5VDtfobG-KbKwzkjhBI_CmJ6wHT-YPH1AKe5fSMx9SoTbaUDoT25SSIccx02LEZNIl6iCpfJKse8lFR_k_ESEN_4ZawSqrq6tLC5CZtLRRa6UxsQ1PFbW_yyyESugmjgEVCGn0lKGlL1co7gF3s0ITFbjqqS1ZFAR9Aujes0ykEh-u6eOlLX6BXEDyWo2OFMWdu1oYxaoyLCJGRexI",
    rating: "4.7",
    price: "₹1,328",
    delivery: "20-25 Mins Delivery",
    category: "Specials"
  },
  {
    id: "gold-flake-treat",
    title: "Gold Flake Treat",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrA1dg0XfEjalJWsSOIVXnNO4gfDiNJ4eshrGBdXb7l7zM_Ab1s5VMy0pl15RN7IPoVN2TvHMFWT0Owo8Gm0ixvCFrpG2XEY1d0fnvlnkVfPvIGKZq2iObYN174TJxrLHZ0iEjSft7f4fBkRnQrhBC3v1G3ekCTeUIFsBrDmWfvR6kLh05c6geDwDe1BbcRW2Fxr4FO6rV7nzCcGqSQdiufFWaG1009kpjOMgAnzgdjrVkBNyMojmphfan7fjkmvI6VggUceMBx3Q",
    badge: "Popular",
    badgeColor: "bg-tertiary",
    rating: "5.0",
    price: "₹747",
    delivery: "30-40 Mins Delivery",
    category: "Specials"
  },
  // Price Drop
  {
    id: "midnight-sushi",
    title: "Midnight Sushi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrA1dg0XfEjalJWsSOIVXnNO4gfDiNJ4eshrGBdXb7l7zM_Ab1s5VMy0pl15RN7IPoVN2TvHMFWT0Owo8Gm0ixvCFrpG2XEY1d0fnvlnkVfPvIGKZq2iObYN174TJxrLHZ0iEjSft7f4fBkRnQrhBC3v1G3ekCTeUIFsBrDmWfvR6kLh05c6geDwDe1BbcRW2Fxr4FO6rV7nzCcGqSQdiufFWaG1009kpjOMgAnzgdjrVkBNyMojmphfan7fjkmvI6VggUceMBx3Q",
    badge: "50% OFF",
    badgeColor: "bg-error",
    rating: "4.9",
    price: "₹1,576",
    delivery: "25-30 Mins Delivery",
    category: "Price Drop",
    trending: true
  },
  {
    id: "pesto-paradiso",
    title: "Pesto Paradiso",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr9RAdpf7ye5SVsKbab_NtGE3gMmnbZUNyqC9ayqT8Y3Tf2vEUCwtUY4-i8AVLO3zWvHDQcZJT6pqDMMQkA_aGyD-F_7F77IxUsH9SlrG30hLTmP8t1AkKQPM49OXRh4aJL903xkL8ESbZgsM09M7tMu4Wby0jSn4hQNmK_ttvJmgbQc9FlLtj8Ol-GjT89Hza3tXEusB1Va53Q6Lz6s3Wsem6-iYshDOImTPD0mHb4A07W2IZWMK6g3Xom44dAR2m-SdudHe77Sk",
    badge: "30% OFF",
    badgeColor: "bg-error",
    rating: "4.6",
    price: "₹930",
    delivery: "15-20 Mins Delivery",
    category: "Price Drop"
  },
  {
    id: "charred-paneer-tikka",
    title: "Charred Paneer Tikka",
    img: "https://images.unsplash.com/photo-1604908177525-402d43b6c42c?auto=format&fit=crop&w=1200&q=80",
    badge: "40% OFF",
    badgeColor: "bg-error",
    rating: "4.8",
    price: "₹1,120",
    delivery: "18-24 Mins Delivery",
    category: "Price Drop"
  },
  {
    id: "smoked-brisket-bowl",
    title: "Smoked Brisket Bowl",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    badge: "Limited Deal",
    badgeColor: "bg-error",
    rating: "4.7",
    price: "₹1,340",
    delivery: "28-35 Mins Delivery",
    category: "Price Drop"
  },
  // New Arrivals
  {
    id: "truffle-roast",
    title: "Truffle Roast",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ147mmlGCOX9SiGkO6JDTFkH1O6R2iib3T9VeQJMKZpfbX85IDtMOUNwx_KxfTVF_xtP_ztGa_Cw_oTBK2lFu_A3JQ0eLG_p_YW7JmHNB5hEYgdWyApATKyZn7YbfMfrXsvOAyM9kqBY17VuT5fPLSN853H3vjlRgF6qwl2--IvPAAKhUNofRvR9VcC5wYq9O9E0t7hrIhT2nYZC75Q01ututE9sHJCOIrm4rek6Dtv3PoA-opv-Rx2LoBeQXmBmRaflPaNTs-4k",
    badge: "New",
    badgeColor: "bg-primary",
    rating: "5.0",
    price: "₹1,992",
    delivery: "35-45 Mins Delivery",
    category: "New Arrivals"
  },
  {
    id: "burrata-panzanella",
    title: "Burrata Panzanella",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    badge: "Chef's Pick",
    badgeColor: "bg-tertiary",
    rating: "4.8",
    price: "₹1,080",
    delivery: "14-20 Mins Delivery",
    category: "New Arrivals"
  },
  // Popular
  {
    id: "truffle-margherita",
    title: "Truffle Margherita",
    img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-tertiary",
    rating: "4.9",
    price: "₹980",
    delivery: "15-20 Mins Delivery",
    category: "Popular"
  },
  {
    id: "smoky-bbq-ribs",
    title: "Smoky BBQ Ribs",
    img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80",
    badge: "Chef's Choice",
    badgeColor: "bg-primary-container",
    rating: "4.8",
    price: "₹1,420",
    delivery: "25-30 Mins Delivery",
    category: "Popular"
  },
  {
    id: "veggie-power-bowl",
    title: "Veggie Power Bowl",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    badge: "Light",
    badgeColor: "bg-secondary-container",
    rating: "4.7",
    price: "₹860",
    delivery: "12-18 Mins Delivery",
    category: "Popular"
  },
  {
    id: "lobster-roll-deluxe",
    title: "Lobster Roll Deluxe",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7b?auto=format&fit=crop&w=1200&q=80",
    badge: "Premium",
    badgeColor: "bg-primary",
    rating: "5.0",
    price: "₹1,990",
    delivery: "20-25 Mins Delivery",
    category: "Popular"
  },
  // Trending
  {
    id: "spicy-glaze-wings",
    title: "Spicy Glaze Wings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwk2O8V0kNHz0ixFsEu97Y3M2FR8bDBf3Ldy96JxyiP5SfFlrpBQXgSv_n5LvEY5rlY8W3uvkMQ9CBN79TeIUJleoiy69iONe4cTj2NC2TxvP_NwJZkF1GsCGwtDzjOLt-GiRrVss8iN1GvDhqXqiHzSf8eDsoxO1sJxEG8DZfsdHmYnS5fyi1g-ZYQ_wcIRuqOPNEzV-bi6dumMjyNbj1RYjcxJfKcXu7zrpAHEBZR3rDF8pcjCx3s4Pe_mv_wr6hrnBoOxxp7c",
    badge: "Trending Now",
    badgeColor: "bg-secondary",
    rating: "4.7",
    price: "₹1,161",
    delivery: "15-20 Mins Delivery",
    category: "Trending",
    trending: true
  },
  {
    id: "korean-fire-noodles",
    title: "Korean Fire Noodles",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    badge: "Spicy",
    badgeColor: "bg-secondary-container",
    rating: "4.9",
    price: "₹770",
    delivery: "10-15 Mins Delivery",
    category: "Trending",
    trending: true
  }
];

const getStoredProducts = () => {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  const stored = localStorage.getItem("curator_products");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing stored products", e);
    }
  }
  localStorage.setItem("curator_products", JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
};

export const PRODUCTS = getStoredProducts();

export const saveProducts = (newProducts) => {
  localStorage.setItem("curator_products", JSON.stringify(newProducts));
  PRODUCTS.length = 0;
  PRODUCTS.push(...newProducts);
};

export const getTrendingProducts = () => PRODUCTS.filter(p => p.trending);

export const searchProducts = (query) => {
  if (!query) return [];
  const lowQuery = query.toLowerCase();
  return PRODUCTS.filter(p => 
    (p.title || "").toLowerCase().includes(lowQuery) || 
    (p.category || "").toLowerCase().includes(lowQuery)
  );
};
