import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AnimatedPlusButton.css";

const AnimatedPlusButton = ({
  children,
  onClick,
  className = "",
  baseColor = "#a04100",
  pillColor = "#ffffff",
  hoveredTextColor = "#ffffff",
  textColor,
  ease = "power3.easeOut",
}) => {
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const buttonRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  const resolvedTextColor = textColor ?? baseColor;

  useEffect(() => {
    const circle = circleRef.current;
    const button = buttonRef.current;
    if (!circle || !button) return;

    const rect = button.getBoundingClientRect();
    const { width: w, height: h } = rect;
    // Calculation from PillNav for a circle to fill the shape
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

    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;

    if (label) gsap.set(label, { y: 0 });
    if (hoverLabel) {
       gsap.set(hoverLabel, { y: h + 10, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.8, ease, overwrite: "auto" }, 0);
    if (label) tl.to(label, { y: -(h + 8), duration: 0.8, ease, overwrite: "auto" }, 0);
    if (hoverLabel) {
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.8, ease, overwrite: "auto" }, 0);
    }

    tlRef.current = tl;
  }, [ease]);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredTextColor,
    "--pill-text": resolvedTextColor,
  };

  return (
    <button
      ref={buttonRef}
      className={`animated-plus-button ${className}`}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={cssVars}
    >
      <span ref={circleRef} className="hover-circle" />
      <span className="label-stack">
        <span ref={labelRef} className="pill-label">
          {children}
        </span>
        <span ref={hoverLabelRef} className="pill-label-hover">
          {children}
        </span>
      </span>
    </button>
  );
};

export default AnimatedPlusButton;
