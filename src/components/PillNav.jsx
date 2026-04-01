import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useCart } from "../context/CartContext";
import "./PillNav.css";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#a04100",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const navigate = useNavigate();
  const { cartItems, heartedItems } = useCart();
  const cartCount = cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  const heartCount = heartedItems?.length || 0;

  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);

  const actionCircleRefs = useRef([]);
  const actionTlRefs = useRef([]);
  const actionActiveTweens = useRef([]);

  const logoImgRef = useRef(null);
  const logoRef = useRef(null);
  const logoTweenRef = useRef(null);
  const navItemsRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const actions = [
    { label: "Hearted", icon: "favorite", href: "/profile/hearted" },
    { label: "Cart", icon: "shopping_cart", href: "/cart" },
    { label: "Profile", icon: "person", href: "/profile/overview" },
  ];

  const buildTimelines = useCallback((list, tlStore) => {
    list.forEach((circle) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector(".pill-label");
      const white = pill.querySelector(".pill-label-hover");

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      const index = list.indexOf(circle);
      if (index === -1) return;

      tlStore.current[index]?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

      if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
      }

      tlStore.current[index] = tl;
    });
  }, [ease]);

  useEffect(() => {
    const layout = () => {
      buildTimelines(circleRefs.current, tlRefs);
      buildTimelines(actionCircleRefs.current, actionTlRefs);
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;
      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation, buildTimelines]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastY + 8 && current > 80) setHidden(true);
      else if (current < lastY - 8) setHidden(false);
      lastY = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleEnterAction = (i) => {
    const tl = actionTlRefs.current[i];
    if (!tl) return;
    actionActiveTweens.current[i]?.kill();
    actionActiveTweens.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeaveAction = (i) => {
    const tl = actionTlRefs.current[i];
    if (!tl) return;
    actionActiveTweens.current[i]?.kill();
    actionActiveTweens.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.2, ease, overwrite: "auto" });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
        const lines = hamburger.querySelectorAll(".hamburger-line");
        if (newState) {
          gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
        } else {
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
        }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: "top center" });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href) =>
    href?.startsWith("http://") ||
    href?.startsWith("https://") ||
    href?.startsWith("//") ||
    href?.startsWith("mailto:") ||
    href?.startsWith("tel:") ||
    href?.startsWith("#");

  const isRouterLink = (href) => href && !isExternalLink(href);

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  };

  return (
    <div className={`pill-nav-container ${hidden ? "nav-hidden" : ""}`}>
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <button
          className="pill-logo"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={(el) => {
            logoRef.current = el;
          }}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </button>

        <button 
          onClick={() => navigate("/search")}
          className="pill pill-icon search-trigger-pill border-none bg-transparent"
          aria-label="Search"
          style={{ marginRight: 'auto', marginLeft: '0.5rem' }}
        >
          <span className="material-symbols-outlined text-2xl text-[var(--base)] hover:scale-110 transition-transform">search</span>
        </button>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                {isRouterLink(item.href) ? (
                  <Link
                    role="menuitem"
                    to={item.href}
                    className={`pill${activeHref === item.href ? " is-active" : ""}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${activeHref === item.href ? " is-active" : ""}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="pill-actions desktop-only">
          {actions.map((action, idx) => {
            const count = action.icon === "shopping_cart" ? cartCount : (action.icon === "favorite" ? heartCount : 0);
            return (
              <Link
                key={action.label}
                to={action.href}
                className="pill pill-icon"
                onMouseEnter={() => handleEnterAction(idx)}
                onMouseLeave={() => handleLeaveAction(idx)}
              >
                <span
                  className="hover-circle"
                  aria-hidden="true"
                  ref={(el) => {
                    actionCircleRefs.current[idx] = el;
                  }}
                />
                <span className="label-stack">
                  <span className={`pill-label material-symbols-outlined ${action.icon === 'favorite' && count > 0 ? 'filled' : ''}`}>{action.icon}</span>
                  <span className={`pill-label-hover material-symbols-outlined ${action.icon === 'favorite' && count > 0 ? 'filled' : ''}`} aria-hidden="true">
                    {action.icon}
                  </span>
                </span>
                {count > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 w-5 h-5 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xl animate-in zoom-in duration-300 z-[100]"
                    style={{ background: action.icon === 'favorite' ? '#ec4899' : '#10b981' }}
                  >
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mobile-only">
          <button 
            onClick={() => navigate("/search")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--base)] active:scale-95 transition-all"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            ref={hamburgerRef}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              {isRouterLink(item.href) ? (
                <Link
                  to={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li className="mobile-menu-actions">
            {actions.map((action) => {
              const count = action.icon === "shopping_cart" ? cartCount : (action.icon === "favorite" ? heartCount : 0);
              return (
                <Link 
                  key={`mobile-${action.label}`} 
                  to={action.href} 
                  className="mobile-action-pill relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={`material-symbols-outlined ${action.icon === 'favorite' && count > 0 ? 'filled' : ''}`}>{action.icon}</span>
                  {count > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md z-[100]"
                      style={{ background: action.icon === 'favorite' ? '#ec4899' : '#10b981' }}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
