const AppDownload = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 md:gap-20 items-center">
      <div className="relative order-2 md:order-1">
        <div className="w-full max-w-sm mx-auto bg-stone-900 rounded-[3rem] p-4 border-[8px] border-stone-800 shadow-2xl relative z-10">
          <div className="bg-surface w-full h-[600px] rounded-[2.5rem] overflow-hidden">
            <img
              alt="smartphone app screen"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfnQiFADfKhP8VohbGeJCKCRe-RZBkkvwZIpxJM0jZspgBGVHwuhE1VAAPuq-X6g9jcBu_j7HbXbEznEzbcRxyx0sMVqAFFi_wctv26feIWBiZzTapnsUfTOedMEMzt0946cgWbAH81UpLjvlAa9RPt2WcSLrT7g853biUrGYx4lQD7HVoUTiVCO_lY_q342mbL5Km8lTIG3MFgeEydyMYLDNuV4rBoHsu42MuFZs7Hz-4e84oe4E5zdj0KJ41gEhQ6iokcce88GI"
            />
          </div>
        </div>
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-fixed-dim rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-tertiary-fixed rounded-full blur-3xl opacity-30 -z-10" />
      </div>

      <div className="order-1 md:order-2 space-y-8">
        <h2 className="font-headline text-5xl font-extrabold text-on-surface leading-tight">
          Your Maître D’ <br />
          In Your Pocket.
        </h2>
        <p className="text-lg text-on-surface-variant">
          Get the full Culinary Curator experience. Track your gourmet orders in real-time, get exclusive app-only drops,
          and manage your palate preferences.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            className="flex items-center gap-3 bg-stone-950 text-white px-6 py-3 rounded-2xl hover:bg-stone-800 transition-colors"
            href="#"
          >
            <img
              alt="App Store"
              className="w-8 h-8 invert"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZo1DZurFYfttMqtvhLMwsdrF8vwO_LT6amT6x9TzKu6XSkrUONduXVJGBWxAEILE-QN-VqSdI8MOOmKZN4DPkZYXlWUZPBFLLBjS3qWuFyiiSBW5vcZm2PZmTZfuVoGO7R0PWPktj4uFm0qpy7oASVx0dX3wLoXq9ybD38Q6pN8wt2fHghXWHOSkRAsisWXp2xjqy-09nVO3n508w8tKlOqmhCtCgmhKf8RRv4TCUQg9-h5KHS3RmgjlEXP713DMkgPD7Z8UfjgM"
            />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-70">Download on the</p>
              <p className="text-lg font-bold leading-none">App Store</p>
            </div>
          </a>
          <a
            className="flex items-center gap-3 bg-stone-950 text-white px-6 py-3 rounded-2xl hover:bg-stone-800 transition-colors"
            href="#"
          >
            <img
              alt="Play Store"
              className="w-8 h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXL67imqm3g8TcSwrFJ4il6fL0WYpnX6X-FN11fZYUEjAyiC28fAvqI6mN-hxs3ibj1TSZkSnF6wWU8r1FhgSosE1XajIyU6HYRIunxYcPMq90rHZccQlHV3_0eogNeV1xRwLeOL4YzAt2TVckq6jl1eg3qwhmUY5Gd-NJTLBX3xkpAok23ob3_cIR8mhMLnmbscFO2v7BPwDCasuQ8nZg6KjeXvQGBBqAp8KSqCriWBgYEXwCPwbJ2GRV5fQ3PMwKSttTt0P7SwY"
            />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-70">Get it on</p>
              <p className="text-lg font-bold leading-none">Google Play</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AppDownload;
