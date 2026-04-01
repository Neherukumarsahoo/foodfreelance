const testimonials = [
  {
    quote:
      "The curation is unmatched. I no longer scroll for an hour; The Culinary Curator knows exactly what my Friday night needs.",
    name: "Sarah J.",
    title: "Food Critic & Blogger",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP8Vt-rqLZ2wJwrHyxcrE_kqILj7XUZDyye7NWkvTGyHxhzAWz-TSnSRC2JaHWYDmtEIPe3W4VJ3KE2D-L_zjnA1afSdpZSFTombEE_QMOCRsQFIRlMgrgz73PGZsL_9WiG0citULNqf9HAQDY-rZKyc1JqvbcbQLtYSZKHnkdtKiHBTheLRCi2sd5lq1ds9f1zdWn9mYcMSAg5djdP5fsn4K0dZ6qbGHC04OmQcCtcBFsjHvyjKroaWIzwVX0_aWvGe0NEvvaTDc",
    highlight: false,
  },
  {
    quote:
      "I've used every delivery app in the city, but this is the first one that feels like a premium service. The packaging and timing are perfect every single time.",
    name: "Marcus T.",
    title: "Home Gourmet",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmtoCelInnVp8G7Sj40lRenBg5r7IAsvW48kDWNjWYYAyzNmWLzhKTYbyOs-m0BCBWrl7Y-B5pdeV4EuJya7W1BsGgrKNHhY5OKj2zaL8wj2-vdQXNBMTUJ9dxzRCKt8d157mIZU373UBXqheZizUc-W-zgA-VatbgOBWbv5GpLvznqryqLWWVlpCmcaRixG3wlRyN3L76f1peYIY3jzK-ZUAOVwyiESGiUm-tFTF3itu6HK0oxlkbFS3OR3A77ttbhKdZLaDGTY",
    highlight: true,
  },
  {
    quote:
      "The UI is beautiful. It makes ordering food feel like browsing a high-end magazine. Best UX in the food game right now.",
    name: "Elena R.",
    title: "Product Designer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1gtlWNUZu06AcNDkdY3JJBZr3xqg2PYnDRocyRtDYpZsF2L6Ze6YaanHZkjxk7Y4eZEid87Oxuid5LNW7iOO6c_nO_8SUy1HDgHf5i18ij0Q4v68tX7Oyf5o6NkqqdYC7c1cAUa02Xesv4OU9N4IOrDKxHvZlt2yA9aYU9mfHZZjLpbFRpypyUW1o-3nMQkbVpvYVHbg2Rj_KU5G3StP75-8qpdB0FDPNbD2HK8vc6sUCND14PSaF3-CM7XsDkHmOzYDY-4J6EJU",
    highlight: false,
  },
];

const Testimonials = () => (
  <section className="py-24 bg-surface-container">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-headline text-4xl font-extrabold text-on-surface">What Foodies Say</h2>
        <p className="text-on-surface-variant mt-4">Real stories from the people who keep our digital kitchens buzzing.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className={`glass-card p-10 rounded-3xl shadow-sm ${item.highlight ? "scale-105 border-primary/20" : ""}`}
          >
            <div className="flex items-center gap-1 text-yellow-500 mb-6">
              <span className="material-symbols-outlined filled">star</span>
              <span className="material-symbols-outlined filled">star</span>
              <span className="material-symbols-outlined filled">star</span>
              <span className="material-symbols-outlined filled">star</span>
              <span className="material-symbols-outlined filled">{item.highlight ? "star" : "star_half"}</span>
            </div>
            <p className="text-on-surface italic leading-relaxed mb-8">"{item.quote}"</p>
            <div className="flex items-center gap-4">
              <img alt={item.name} className="w-12 h-12 rounded-full object-cover" src={item.img} />
              <div>
                <p className="font-bold text-on-surface">{item.name}</p>
                <p className="text-xs text-on-surface-variant">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
