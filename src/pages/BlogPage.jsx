import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const BlogPage = () => {
  const [filter, setFilter] = useState("All");
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const posts = [
    {
      id: 1,
      title: "The Art of Slow Curation",
      category: "Artisanal",
      excerpt: "In a world of fast food, we choose the deliberate path of artisanal excellence...",
      img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
      date: "Mar 28, 2024",
      readTime: "6 min read"
    },
    {
      id: 2,
      title: "Behind the Scenes: Meet Chef Arlo",
      category: "Stories",
      excerpt: "Traveling from the hills of Tuscany to the heart of our kitchen, Arlo brings a legacy...",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
      date: "Mar 25, 2024",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "5 Gourmet Trends to Watch in 2024",
      category: "Trends",
      excerpt: "From molecular gastronomy tweaks to the resurgence of open-fire cooking...",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      date: "Mar 22, 2024",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Sourcing Integrity: Our Farm Partners",
      category: "Artisanal",
      excerpt: "We visit every farm. We know every soil type. Because quality starts in the earth...",
      img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      date: "Mar 20, 2024",
      readTime: "5 min read"
    }
  ];

  const categories = ["All", "Artisanal", "Stories", "Trends"];

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
  }, []);

  const filteredPosts = filter === "All" ? posts : posts.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-stone-950 text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Blog Header */}
        <header ref={headerRef} className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
             <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Culinary Journal</span>
             <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none">ARTISANAL <br />STORIES.</h1>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
             {categories.map((cat) => (
               <button 
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`h-10 px-6 rounded-full text-xs font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-stone-500 hover:bg-white/10 hover:text-white'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </header>

        {/* Blog Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           {filteredPosts.map((post, idx) => (
             <article key={post.id} className={`group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700`} style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                   <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-stone-950/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.1em] text-white">
                      {post.category}
                   </div>
                </div>
                <div className="px-2">
                   <div className="flex items-center gap-4 text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      <span>{post.readTime}</span>
                   </div>
                   <h2 className="font-headline text-3xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                   <p className="text-stone-400 font-medium leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                   <div className="flex items-center gap-2 text-primary font-black text-xs group-hover:gap-4 transition-all uppercase tracking-widest">
                      Read Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </div>
                </div>
             </article>
           ))}
        </div>

        {/* Journal Newsletter Hook */}
        <section className="mt-32 p-12 md:p-24 rounded-[64px] bg-stone-900/50 border border-white/5 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="relative z-10">
              <h3 className="font-headline text-4xl md:text-5xl font-black mb-6">Stay Curated.</h3>
              <p className="text-stone-500 max-w-md mx-auto mb-10 font-medium">Join 22,000+ connoisseurs receiving our weekly harvest reports and secret recipes.</p>
              <form className="max-w-md mx-auto flex gap-3 p-2 bg-stone-950 rounded-full border border-white/10 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                 <input type="email" placeholder="curator@journal.com" className="flex-1 bg-transparent border-none outline-none pl-6 text-sm font-bold text-white placeholder:text-stone-700" />
                 <button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-full font-black text-xs uppercase tracking-widest transition-all">Join</button>
              </form>
           </div>
        </section>

      </div>
    </main>
  );
};

export default BlogPage;
