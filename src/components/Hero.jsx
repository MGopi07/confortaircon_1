"use client";

import React, { useState, useEffect, useRef } from "react";
import { useModal } from "@/context/ModalContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_STAGES = [
  {
    id: 1,
    shortLabel: "Overview",
    badge: "Authorized Carrier, Toshiba & Midea AC Dealership",
    titlePre: "Complete Air",
    titleGrad: "Conditioning Solutions",
    subtitle:
      "Get professional AC installation, repair, and maintenance from our experienced team in Puducherry. We partner with leading global AC brands to deliver ultra-quiet performance and maximum cooling peace of mind.",
    features: [
      { top: "100% Genuine", bottom: "Carrier Units" },
      { top: "Certified Expert", bottom: "Technicians" },
      { top: "Same-Day Service", bottom: "Response" },
    ],
    secondaryCta: {
      text: "Explore Our Services",
      href: "#services",
      icon: "fa-solid fa-arrow-down-long",
    },
  },
  {
    id: 2,
    shortLabel: "Architecture",
    badge: "100% Grooved Copper & Blue Fin Architecture",
    titlePre: "Precision Inverter",
    titleGrad: "Cooling Engineering",
    subtitle:
      "Engineered for coastal Puducherry with heavy-duty copper heat exchangers, hydrophilic blue fins, and tropicalized anti-corrosion protection that lasts in demanding humid weather.",
    features: [
      { top: "Anti-Corrosion", bottom: "Blue Fin Shield" },
      { top: "100% Grooved", bottom: "Copper Coils" },
      { top: "52°C Ambient", bottom: "Extreme Cooling" },
    ],
    secondaryCta: {
      text: "View Inverter Models",
      href: "/products",
      icon: "fa-solid fa-arrow-right-long",
    },
  },
  {
    id: 3,
    shortLabel: "Efficiency",
    badge: "5-Star Energy Rating & PM2.5 Micro-Filtration",
    titlePre: "Whisper Quiet &",
    titleGrad: "Maximum Energy Savings",
    subtitle:
      "Advanced twin-rotary inverter compressors slash electricity consumption by up to 50% while multi-stage micro-filters actively purify indoor air of harmful pollutants.",
    features: [
      { top: "Up to 50%", bottom: "Power Savings" },
      { top: "PM 2.5 Active", bottom: "Micro-Filtration" },
      { top: "19 dB(A) Silent", bottom: "Night Operation" },
    ],
    secondaryCta: {
      text: "Browse 5-Star ACs",
      href: "/products",
      icon: "fa-solid fa-arrow-right-long",
    },
  },
];

export default function Hero() {
  const { openAppointment } = useModal();
  const [activeStage, setActiveStage] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  // Preload video & pause for scroll scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    const container = containerRef.current;
    const progressBar = progressBarRef.current;

    if (!track || !video || !container) return;

    const ctx = gsap.context(() => {
      const totalDuration =
        video.duration && !isNaN(video.duration) ? video.duration : 10.05;
      const mm = gsap.matchMedia();

      // Desktop: Pure CSS sticky track scrubs video smoothly without black borders
      mm.add("(min-width: 992px)", () => {
        ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBar) {
              progressBar.style.width = `${(p * 100).toFixed(1)}%`;
            }
            if (video && video.readyState >= 2) {
              video.currentTime = p * totalDuration;
            }
            const nextStage = p < 0.36 ? 0 : p < 0.72 ? 1 : 2;
            setActiveStage((prev) => (prev !== nextStage ? nextStage : prev));
          },
        });
      });

      // Mobile / Tablet: scrub as the video card scrolls through the viewport
      mm.add("(max-width: 991.98px)", () => {
        ScrollTrigger.create({
          trigger: container,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBar) {
              progressBar.style.width = `${(p * 100).toFixed(1)}%`;
            }
            if (video && video.readyState >= 2) {
              video.currentTime = p * totalDuration;
            }
            const nextStage = p < 0.36 ? 0 : p < 0.72 ? 1 : 2;
            setActiveStage((prev) => (prev !== nextStage ? nextStage : prev));
          },
        });
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      className="hero-scroll-track position-relative"
      id="home"
    >
      <section ref={sectionRef} className="hero-section overflow-hidden">
        {/* Full-Bleed 3D Scrubbing Video Background */}
        <div className="hero-bg-video-wrapper" ref={containerRef}>
          <div className="hero-video-stage">
            <video
              ref={videoRef}
              src="/video/hero_2.mp4"
              className="hero-bg-video"
              playsInline
              muted
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              aria-label="Carrier High-Efficiency Inverter AC 3D Demonstration"
            />
          </div>
          {/* Seamless gradient overlay: guarantees crystal-clear text readability on left while showcasing 3D AC on right */}
          <div className="hero-bg-overlay"></div>
        </div>

        {/* Live Ambient Animated Waves & Atmospheric Glows */}
        <div className="hero-animated-bg">
          <div className="air-wave air-wave-1"></div>
          <div className="air-wave air-wave-2"></div>
        </div>

        <div className="container-xxl position-relative z-2">
          {/* Content Column: Clear, High-Converting Brand Introduction */}
          <div className="hero-content">
            {/* Apple-Style Stacked Cross-Fade Content Body */}
            <div className="hero-stages-stack">
              {HERO_STAGES.map((stage, idx) => {
                const status =
                  idx === activeStage
                    ? "is-active"
                    : idx < activeStage
                      ? "is-past"
                      : "is-future";
                return (
                  <div key={stage.id} className={`hero-stage-panel ${status}`}>
                    {/* Dealership / Tech Status Badge */}
                    <div className="hero-status-badge">
                      <span className="pulse-dot"></span>
                      <span>{stage.badge}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="hero-title fw-extrabold text-navy lh-sm mb-0">
                      {stage.titlePre} <br />
                      <span className="animated-gradient-text">
                        {stage.titleGrad}
                      </span>
                    </h1>

                    {/* Subtitle / Company Value Proposition */}
                    <p className="hero-subtitle text-secondary mb-0">
                      {stage.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Persistent Action Buttons with Synchronized Stage Reaction */}
            <div className="hero-cta-group d-flex flex-wrap align-items-center gap-2 gap-sm-3">
              <button
                key={`primary-cta-${activeStage}`}
                type="button"
                className="btn btn-hero-book rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm btn-pulse-glow"
                onClick={() => openAppointment()}
              >
                <i className="fa-regular fa-calendar-check fs-6"></i>
                <span>Book a Service</span>
              </button>

              {/* Morphing Secondary Action Stack */}
              <div className="hero-secondary-btn-stack">
                {HERO_STAGES.map((stage, idx) => {
                  const status =
                    idx === activeStage
                      ? "is-active"
                      : idx < activeStage
                        ? "is-past"
                        : "is-future";
                  return (
                    <a
                      key={`btn-${stage.id}`}
                      href={stage.secondaryCta.href}
                      className={`btn btn-hero-explore rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 ${status}`}
                    >
                      <span>{stage.secondaryCta.text}</span>
                      <i className={`${stage.secondaryCta.icon} fs-6`}></i>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Trust Points Divider */}
            <hr className="hero-trust-divider" />

            {/* Stacked Cross-Fade Trust Points synced to Stage */}
            <div className="hero-trust-stack">
              {HERO_STAGES.map((stage, idx) => {
                const status =
                  idx === activeStage
                    ? "is-active"
                    : idx < activeStage
                      ? "is-past"
                      : "is-future";
                return (
                  <div
                    key={`trust-${stage.id}`}
                    className={`hero-trust-row hero-trust-panel d-flex flex-wrap align-items-center gap-2 gap-md-3 ${status}`}
                  >
                    {stage.features.map((feat, i) => (
                      <div
                        key={i}
                        className="hero-trust-item d-flex align-items-center gap-2"
                      >
                        <span className="hero-trust-check-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <span className="hero-trust-text">
                          <span className="d-block tabular-nums">
                            {feat.top}
                          </span>
                          <span>{feat.bottom}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
