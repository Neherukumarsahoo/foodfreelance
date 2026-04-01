const Banner = () => (
  <section className="px-6 md:px-8 mb-24">
    <div className="max-w-7xl mx-auto signature-gradient rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center justify-between p-12 md:p-20 relative shadow-2xl shadow-primary/30">
      <div className="relative z-10 max-w-xl text-center md:text-left">
        <span className="bg-white/20 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 inline-block">
          Flash Sale
        </span>
        <h2 className="font-headline text-5xl md:text-6xl font-black text-white leading-tight mb-8">Midnight Munchies Drop.</h2>
        <p className="text-primary-fixed text-lg mb-10">
          Get up to 50% off on all dessert and late-night orders between 10 PM and 2 AM. Treat yourself tonight.
        </p>
        <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary-fixed transition-colors shadow-xl">
          Claim 50% Off
        </button>
      </div>
      <div className="mt-12 md:mt-0 relative">
        <img
          alt="glowing neon donuts"
          className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white/10"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7HKmo3UhIXtDbz0mEGizCohZgKjcRplQdIIdqZbW2dIVp5LtkPM6HO0rbl3ojYxJ2ZuqahoarH1cagIPbw2HdAX-YpydFjO6e_r0A6eCmrZNC2E8_OhZmOyiSH5V6EDQ310yn3Bj0NR-LWlITr7X2B8K6z8oFDSOyzmqVk0hXYYqKd783U_-PetT7LiOZPdKybrXwIiRETyAETjus1dyFEdDOUzTAe7TAc42izxkM76ay16tE3lIHGlnnaXFXjyBIiBT0pDWtJM4"
        />
      </div>
    </div>
  </section>
);

export default Banner;
