"use client";

import React, { useEffect } from "react";
import Link from "next/link";

type CandereMinimalProduct = {
  id: string;
  name: string;
  currentPrice: string;
  images: { src: string; alt: string }[];
  description?: string;
  productSummary?: {
    styleNo?: string;
    width?: string;
    height?: string;
    metalWeight?: string;
    grossWeight?: string;
  };
  metalDetails?: string;
  youMayAlsoLike?: Array<{
    id: string;
    name: string;
    currentPrice: string;
    originalPrice?: string;
    badge?: string;
    rating?: number;
    reviews?: number;
    image?: string;
  }>;
  priceBreakup?: Array<{
    label: string;
    value: string;
    originalValue?: string;
    isGrandTotal?: boolean;
  }>;
};

type CandereProductDetailsProps = {
  product: CandereMinimalProduct;
};

export default function CandereProductDetails({ product }: CandereProductDetailsProps) {
  useEffect(() => {
    // Inject required icon font and Google fonts once
    const links: HTMLLinkElement[] = [];
    const addLink = (attrs: Partial<HTMLLinkElement>) => {
      const l = document.createElement("link");
      Object.assign(l, attrs);
      document.head.appendChild(l);
      links.push(l);
    };
    addLink({ rel: "preconnect", href: "https://fonts.googleapis.com" });
    addLink({ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" });
    addLink({
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap",
    });
    addLink({
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
    });

    const byId = (id: string) => document.getElementById(id);

    const attachSideScroll = (
      containerId: string,
      leftButtonSelector: string,
      rightButtonSelector: string
    ) => {
      const container = byId(containerId);
      if (!container) return { cleanup: () => {} };
      const leftBtn = document.querySelector(leftButtonSelector);
      const rightBtn = document.querySelector(rightButtonSelector);
      const delta = () => Math.min(360, Math.max(240, Math.floor(container.clientWidth * 0.8)));

      const onLeft = () => container.scrollBy({ left: -delta(), behavior: "smooth" });
      const onRight = () => container.scrollBy({ left: delta(), behavior: "smooth" });
      leftBtn && leftBtn.addEventListener("click", onLeft);
      rightBtn && rightBtn.addEventListener("click", onRight);
      return {
        cleanup: () => {
          leftBtn && leftBtn.removeEventListener("click", onLeft);
          rightBtn && rightBtn.removeEventListener("click", onRight);
        },
      };
    };

    const attachAutoScroll = (
      containerId: string,
      pauseSelectors: string[] = [],
      intervalMs = 3000
    ) => {
      const container = byId(containerId);
      if (!container) return { cleanup: () => {} };

      let timerId: number | null = null;
      const step = () => Math.min(360, Math.max(240, Math.floor(container.clientWidth * 0.8)));
      const atEnd = () => Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 1;

      const tick = () => {
        if (atEnd()) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: step(), behavior: "smooth" });
        }
      };

      const start = () => {
        stop();
        timerId = window.setInterval(tick, intervalMs);
      };
      const stop = () => {
        if (timerId !== null) {
          clearInterval(timerId);
          timerId = null;
        }
      };

      const pauseEls = [
        container,
        ...pauseSelectors
          .map((s) => document.querySelector<HTMLElement>(s))
          .filter((el): el is HTMLElement => Boolean(el)),
      ];

      const onEnter = () => stop();
      const onLeave = () => start();
      pauseEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("focusin", onEnter);
        el.addEventListener("focusout", onLeave);
      });
      start();

      return {
        cleanup: () => {
          pauseEls.forEach((el) => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            el.removeEventListener("focusin", onEnter);
            el.removeEventListener("focusout", onLeave);
          });
          stop();
        },
      };
    };

    // Store locator
    const locateBtn = byId("locateMe");
    const messageEl = byId("locatorMessage");
    const pincodeInput = byId("pincode") as HTMLInputElement | null;
    const showMessage = (text: string) => {
      if (messageEl) messageEl.textContent = text;
    };
    const isValidPincode = (val: string) => /^[0-9]{6}$/.test(val);

    const onPincodeInput = () => {
      if (!pincodeInput) return;
      const value = pincodeInput.value.trim();
      if (value.length === 0) {
        showMessage("");
      } else if (!/^[0-9]+$/.test(value)) {
        showMessage("Enter numbers only.");
      } else if (value.length < 6) {
        showMessage("Enter a 6‑digit pincode.");
      } else if (isValidPincode(value)) {
        showMessage(`Showing near pincode ${value} – No Nearby Stores Found`);
      }
    };

    const onLocate = () => {
      if (!("geolocation" in navigator)) {
        showMessage("Geolocation is not supported on this device.");
        return;
      }
      showMessage("Locating…");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          showMessage(
            `Showing near (${latitude.toFixed(3)}, ${longitude.toFixed(3)}) – No Nearby Stores Found`
          );
        },
        () => {
          showMessage("Unable to fetch your location. Please enter pincode.");
        },
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
      );
    };

    pincodeInput && pincodeInput.addEventListener("input", onPincodeInput);
    locateBtn && locateBtn.addEventListener("click", onLocate);

    // Scroll to top
    const scrollTopBtn = byId("scrollTop");
    const onScroll = () => {
      if (!scrollTopBtn) return;
      (scrollTopBtn as HTMLElement).style.display = window.scrollY > 400 ? "grid" : "none";
    };
    const onScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    onScroll();
    scrollTopBtn && scrollTopBtn.addEventListener("click", onScrollTop);

    // Wire up scrollers and autoplay
    const side1 = attachSideScroll("advantagesTrack", ".pill-nav--left", ".pill-nav--right");
    const side2 = attachSideScroll("recoTrack", ".carousel-nav--left", ".carousel-nav--right");
    const auto1 = attachAutoScroll("advantagesTrack", [".pill-nav--left", ".pill-nav--right"], 3500);
    const auto2 = attachAutoScroll("recoTrack", [".carousel-nav--left", ".carousel-nav--right"], 4000);

    return () => {
      // Cleanup listeners/intervals and injected links
      pincodeInput && pincodeInput.removeEventListener("input", onPincodeInput);
      locateBtn && locateBtn.removeEventListener("click", onLocate);
      window.removeEventListener("scroll", onScroll as EventListener);
      scrollTopBtn && scrollTopBtn.removeEventListener("click", onScrollTop);
      side1.cleanup();
      side2.cleanup();
      auto1.cleanup();
      auto2.cleanup();
      links.forEach((l) => l.parentNode && l.parentNode.removeChild(l));
    };
  }, []);

  const title = product.name;
  const price = `₹${product.currentPrice}`;
  const thumbSrc = product.images?.[0]?.src || "/assets/KC04348RG_1.webp";
  const summary = product.productSummary || {};
  const metalDetails = product.metalDetails ||
    "14K Rose Gold. Metal purity and weight may vary slightly due to the handcrafted nature of the product.";
  const description = product.description ||
    "Inspired by blooming petals, the Floral Spell Solitaire Hoop Earrings combine feminine grace and radiant sparkle.";
  const recos = product.youMayAlsoLike && product.youMayAlsoLike.length > 0 ? product.youMayAlsoLike : undefined;
  const priceBreakup = product.priceBreakup && product.priceBreakup.length > 0 ? product.priceBreakup : undefined;

  return (
    <main>
      {/* Sticky mini header */}
      <header className="mini-header" aria-label="Product quick header">
        <div className="mini-header__left">
          <div className="brand-mark" aria-hidden="true">
            c
          </div>
          <img className="mini-header__thumb" src={thumbSrc} alt="Product thumbnail" />
          <div className="mini-header__title">{title}</div>
        </div>
        <div className="mini-header__right">
          <div className="price-label">Offer Price:</div>
          <div className="price-value" aria-live="polite">
            {price}
          </div>
          <button className="btn btn-gradient">Add To Cart</button>
        </div>
      </header>

      <section className="hero-spacer" aria-hidden="true"></section>

      <section className="product-info" aria-label="Product Information">
        <div className="product-info__header">
          <h2 className="section-title playfair">Product Information</h2>
          <span className="section-underline" aria-hidden="true"></span>
        </div>
        <div className="product-info__intro">
          <img className="intro-thumb" src={thumbSrc} alt="Product" />
          <div className="intro-text">
            <p>
              <strong>✨ Where solitaires bloom like flowers!</strong>
            </p>
            <p>{description}</p>
          </div>
        </div>

        <div className="product-info__grid">
          <aside className="summary-card" aria-label="Product Summary">
            <h3 className="summary-title">Product Summary</h3>
            <dl className="summary-list">
              <div className="row"><dt>Style No.</dt><dd>{summary.styleNo || "—"}</dd></div>
              <div className="row"><dt>Width</dt><dd>{summary.width || "—"}</dd></div>
              <div className="row"><dt>Height</dt><dd>{summary.height || "—"}</dd></div>
              <div className="row"><dt>Metal Weight</dt><dd>{summary.metalWeight || "—"}</dd></div>
              <div className="row"><dt>Gross Weight</dt><dd>{summary.grossWeight || "—"}</dd></div>
            </dl>
            <p className="summary-note">*Difference in gold weight may occur &amp; will apply on final price.</p>
            <div className="assist-card">
              <p className="assist-title">Need help to find the best jewellery for you?</p>
              <p className="assist-text">We are available for your assistance</p>
              <div className="assist-actions">
                <button className="btn btn-outline">Speak with Experts</button>
                <button className="btn btn-outline">Chat with Experts</button>
              </div>
            </div>
          </aside>

          <div className="accordion-wrap">
            <details className="accordion" open>
              <summary>Price Breakup</summary>
              <ul className="price-list">
                {priceBreakup ? (
                  priceBreakup.map((row, idx) => (
                    <li key={idx} className={row.isGrandTotal ? "grand-total" : undefined}>
                      <span>{row.label}</span>
                      <span>
                        {row.originalValue ? (
                          <>
                            <s>{row.originalValue}</s> {row.value}
                          </>
                        ) : (
                          row.value
                        )}
                      </span>
                    </li>
                  ))
                ) : (
                  <>
                    <li><span>Metal</span><span>₹24,137</span></li>
                    <li><span>Diamond</span><span><s>₹37,950</s> ₹29,640</span></li>
                    <li><span>Making Charges</span><span>₹10,200</span></li>
                    <li><span>GST (3%)</span><span><s>₹2,142</s> ₹1,919</span></li>
                    <li className="grand-total"><span>Grand Total</span><span>₹65,896</span></li>
                  </>
                )}
              </ul>
            </details>

            <details className="accordion">
              <summary>Metal Details</summary>
              <div className="accordion-content"><p>{metalDetails}</p></div>
            </details>

            <details className="accordion">
              <summary>Diamond Details</summary>
              <div className="accordion-content">
                <p>SI IJ quality diamonds. All diamonds are conflict‑free and certified.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* You may also like */}
      <section className="recommendations" aria-label="You may also like">
        <h2 className="section-title">You may also like</h2>
        <p className="section-sub">
          <a href="#" className="link">
            Discover More Favourites
          </a>
        </p>
        <div className="card-carousel">
          <button className="carousel-nav carousel-nav--left" data-target="recoTrack" aria-label="Scroll left">
            ◀
          </button>
          <ul className="card-track" id="recoTrack">
            {recos ? (
              recos.map((r) => (
                <li className="card" key={r.id}>
                  <Link href={`/product/${r.id}`} className="block">
                    {r.badge && (
                      <div className={`card-badge ${r.badge === "TRENDING" ? "card-badge--trend" : "card-badge--pick"}`}>
                        {r.badge}
                      </div>
                    )}
                    <div className="card-media" aria-hidden="true">
                      <img src={r.image || "/assets/KC04348RG_1.webp"} alt={r.name} />
                    </div>
                    {r.badge && (
                      <div className="card-offer">{r.badge === "TRENDING" ? "Trending Now" : "Special Pick"}</div>
                    )}
                    <div className="card-prices">
                      <span className="price">₹{r.currentPrice}</span>
                      {r.originalPrice && <span className="mrp">₹{r.originalPrice}</span>}
                    </div>
                    <div className="card-title">{r.name}</div>
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li className="card">
                  <div className="card-badge card-badge--pick">Our Pick</div>
                  <div className="card-media" aria-hidden="true"><img src="/assets/LCE0663_1.webp" alt="" /></div>
                  <div className="card-offer">20% OFF ON STONES</div>
                  <div className="card-prices"><span className="price">₹43,598</span><span className="mrp">₹50,937</span></div>
                  <div className="card-title">Amarli Solitaire Earrings</div>
                </li>
                <li className="card">
                  <div className="card-badge card-badge--trend">Trending</div>
                  <div className="card-media"><img src="/assets/C013511__1.webp" alt="" /></div>
                  <div className="card-offer">20% OFF ON STONES</div>
                  <div className="card-prices"><span className="price">₹50,511</span><span className="mrp">₹58,195</span></div>
                  <div className="card-title">Erica Solitaire Diamond Earrings</div>
                </li>
              </>
            )}
          </ul>
          <button className="carousel-nav carousel-nav--right" data-target="recoTrack" aria-label="Scroll right">
            ▶
          </button>
        </div>
      </section>

      <img src="lib\assets\Purchase_Benefits_Desktop_201224.webp" alt="What's included with the purchase" />

      {/* Store locator */}
      <section className="store-locator" aria-label="Beyond the Screen">
        <div className="store-locator__inner">
          <div className="shop-icon" aria-hidden="true">
            <i className="ri-store-2-line"></i>
          </div>
          <h2 className="section-title title-on-teal">Beyond the Screen: Immerse Yourself in Our Jewellery World</h2>
          <p className="section-sub sub-on-teal">
            Locate our Experience Centres near you or find out where your favourite design is available or book an
            appointment
          </p>
          <form className="locator-form" onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="near-msg">
              <i className="ri-map-pin-2-line" aria-hidden="true"></i>
              <span>Showing near</span>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="pincode">
                Pincode
              </label>
              <div className="pincode-wrap">
                <input id="pincode" name="pincode" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="Pincode" aria-describedby="locatorMessage" />
              </div>
            </div>
            <span className="or">OR</span>
            <button className="btn btn-teal" id="locateMe" type="button">
              <i className="ri-map-pin-2-line" aria-hidden="true"></i>
              LOCATE ME
            </button>
          </form>
          <div id="locatorMessage" className="locator-message" role="status" aria-live="polite"></div>
        </div>
      </section>

      {/* Advantages */}
      <section className="advantages" aria-label="Candere Advantages">
        <h2 className="section-title">Candere Advantages</h2>
        <p className="section-sub">8 reasons to shop with us!</p>
        <div className="pill-scroller">
          <button className="pill-nav pill-nav--left" aria-label="Scroll advantages left">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <ul className="pill-track" id="advantagesTrack">
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-earth-line"></i>
              </span>
              <span>International Shipping</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-hand-heart-line"></i>
              </span>
              <span>Trust of Kalyan Jewellers</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-calendar-check-line"></i>
              </span>
              <span>DGRP</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-history-line"></i>
              </span>
              <span>15 Day Return</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-infinite-line"></i>
              </span>
              <span>Lifetime Exchange</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-cash-line"></i>
              </span>
              <span>100% Refund*</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-shield-check-line"></i>
              </span>
              <span>Certified Jewellery</span>
            </li>
            <li className="pill-item">
              <span className="icon" aria-hidden="true">
                <i className="ri-bank-card-line"></i>
              </span>
              <span>Easy EMI</span>
            </li>
          </ul>
          <button className="pill-nav pill-nav--right" aria-label="Scroll advantages right">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </section>

      {/* Scroll to top */}
      <button className="scroll-top" id="scrollTop" aria-label="Scroll to top">
        ▲
      </button>

      {/* Scoped styles */}
      <style jsx global>{`
:root{
  --bg:#ffffff;
  --ink:#1b1f23;
  --muted:#6b7280;
  --teal-50:#e6f4f4;
  --teal-100:#cfeeee;
  --teal-300:#67d3d3;
  --teal-500:#14b8a6;
  --teal-600:#0ea5a3;
  --brand-grad:linear-gradient(90deg,#25c1b2 0%, #1aa0d2 100%);
  --radius:14px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.06);
  --shadow-md:0 6px 20px rgba(0,0,0,.12);
}

*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;}
img{max-width:100%;display:block}
a{color:var(--teal-600);text-decoration:none}

/* Mini sticky header */
.mini-header{position:sticky;top:0;z-index:50;background:#fff;border-bottom:3px solid #c7edf0;display:flex;justify-content:space-between;align-items:center;padding:10px 18px;box-shadow:var(--shadow-sm)}
.mini-header__left{display:flex;align-items:center;gap:12px}
.brand-mark{width:26px;height:26px;display:grid;place-items:center;border:1px solid #d1d5db;border-radius:50%;color:var(--teal-600);font-weight:700}
.mini-header__thumb{width:40px;height:40px;border-radius:8px;object-fit:cover}
.mini-header__title{font-weight:600}
.mini-header__right{display:flex;align-items:center;gap:12px}
.price-label{font-size:14px;color:var(--muted)}
.price-value{font-weight:700}
.btn{appearance:none;border:1px solid transparent;background:#fff;border-color:#d1d5db;padding:10px 14px;border-radius:10px;cursor:pointer;transition:.2s}
.btn:hover{border-color:var(--teal-500);color:var(--teal-600)}
.btn-gradient{background:var(--brand-grad);color:#fff;border:none;padding:10px 16px;border-radius:12px;box-shadow:var(--shadow-md)}
.btn-outline{background:#fff;border:1px solid #d1d5db}

.hero-spacer{height:56px}

/* Sections */
main{display:block}
section{padding:48px 20px}
.section-title{font-weight:700;letter-spacing:.2px;margin:0 0 10px;font-size:28px;text-align:center}
.playfair{font-family:"Playfair Display",serif}
.section-sub{margin:0 0 24px;text-align:center;color:var(--muted)}
.title-on-teal{color:#fff}
.sub-on-teal{color:#e7f6f7}
.section-underline{display:block;width:36px;height:3px;background:var(--teal-500);margin:8px auto 0;border-radius:3px}

/* Advantages */
.advantages{background:linear-gradient(180deg,#f6fbfd,transparent)}
.pill-scroller{position:relative;max-width:1100px;margin:16px auto 0}
.pill-track{list-style:none;margin:0;padding:0;display:flex;gap:16px;overflow:auto;scroll-behavior:smooth}
.pill-item{flex:0 0 auto;display:flex;align-items:center;gap:10px;background:#fff;border-radius:40px;padding:14px 18px;box-shadow:var(--shadow-sm);border:1px solid #eef2f3;min-width:220px}
.pill-item .icon{color:var(--teal-600);font-size:22px}
.pill-nav{position:absolute;top:50%;transform:translateY(-50%);border:none;background:#fff;border-radius:50%;width:34px;height:34px;box-shadow:var(--shadow-md);cursor:pointer}
.pill-nav--left{left:-8px}
.pill-nav--right{right:-8px}

/* Recommendations */
.card-carousel{position:relative;max-width:1200px;margin:0 auto}
.card-track{list-style:none;margin:0;padding:0;display:flex;gap:18px;overflow:auto;scroll-behavior:smooth}
.card{flex:0 0 280px;background:#fff;border:1px solid #eef2f3;border-radius:16px;box-shadow:var(--shadow-sm);padding:12px}
.card-media{height:180px;border-radius:12px;background:linear-gradient(135deg,#f7efe9,#fff0)}
.card-media img{width:100%;height:100%;object-fit:cover;border-radius:12px}
.card-badge{position:absolute;margin:-8px 0 0 -8px;font-size:12px;background:#eaf7ff;border:1px solid #b9e8ff;border-radius:6px;padding:4px 8px;text-transform:uppercase;letter-spacing:.5px;font-weight:700;color:#2b86b8}
.card-badge--trend{background:#ffece7;border-color:#ffd2c6;color:#de6d4f}
.card-offer{margin:10px 0 6px;text-align:center;color:#0a9ba3;font-weight:700;font-size:12px;letter-spacing:.4px}
.card-prices{display:flex;gap:10px;align-items:center;justify-content:flex-start;font-weight:700}
.card-prices .mrp{color:#9ca3af;text-decoration:line-through;font-weight:500}
.card-title{margin-top:6px;color:#374151;font-size:14px}
.carousel-nav{position:absolute;top:50%;transform:translateY(-50%);border:none;background:#fff;border-radius:50%;width:36px;height:36px;box-shadow:var(--shadow-md);cursor:pointer}
.carousel-nav--left{left:-12px}
.carousel-nav--right{right:-12px}

/* Purchase includes */
.purchase-includes{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;align-items:center;max-width:1200px;margin:0 auto}
.purchase-includes .section-title{margin-bottom:14px}
.purchase-includes__media{height:260px;border-radius:18px;background:linear-gradient(135deg,#e8f8f6,#ffffff 40%), url('https://images.unsplash.com/photo-1520975922324-8f58cdb8504b?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat;box-shadow:var(--shadow-md)}
.include-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;color:#374151}
.include-list .icon{margin-right:6px}

/* Store locator */
.store-locator{background:#a8dbe0;padding:72px 20px;margin-top:16px}
.store-locator__inner{max-width:980px;margin:0 auto;text-align:center}
.shop-icon{font-size:30px;margin-bottom:12px;color:#ffffff}
.locator-form{display:flex;align-items:center;justify-content:center;gap:14px;margin:18px auto 0;background:#fff;border-radius:14px;box-shadow:var(--shadow-md);padding:12px}
.near-msg{display:flex;align-items:center;gap:8px;color:#4b5563;background:#f6fbfc;border:1px dashed #cfe4e7;border-radius:10px;padding:10px 12px}
.field{display:flex;flex-direction:column;align-items:flex-start}
.field-label{font-size:12px;color:#6b7280;margin:0 0 4px 6px}
.pincode-wrap{display:flex;align-items:center;gap:6px;background:#fff;border-radius:12px;border:1px solid #cfe4e7;padding:10px 12px;min-width:260px}
.pincode-wrap input{border:none;outline:none;font-size:16px;width:160px}
.btn-teal{background:var(--brand-grad);color:#fff;border:none;display:inline-flex;align-items:center;gap:8px}
.btn-teal:hover{filter:brightness(.98)}
.or{color:#6b7280}
.locator-message{color:#e7f6f7;margin-top:14px;min-height:22px}

/* Product info */
.product-info{max-width:1200px;margin:0 auto}
.product-info__intro{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start;margin-bottom:20px}
.intro-thumb{width:80px;height:80px;border-radius:12px;object-fit:cover}
.product-info__grid{display:grid;grid-template-columns:320px 1fr;gap:24px}
.summary-card{border:1px solid #eef2f3;border-radius:16px;padding:16px;background:#fff}
.summary-title{margin:0 0 10px;font-size:18px}
.summary-list{margin:0;padding:0}
.summary-list .row{display:flex;justify-content:space-between;border-bottom:1px dashed #e5e7eb;padding:8px 0}
.summary-list dt{color:#6b7280}
.summary-note{color:#6b7280;font-size:12px}
.assist-card{margin-top:14px;padding:12px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa}
.assist-title{margin:0 0 6px;font-weight:600}
.assist-actions{display:flex;gap:10px;flex-wrap:wrap}

.accordion-wrap{display:grid;gap:12px}
.accordion{border:1px solid #e5e7eb;border-radius:12px;background:#fff;overflow:hidden}
.accordion>summary{list-style:none;padding:14px 16px;cursor:pointer;font-weight:600}
.accordion[open]>summary{border-bottom:1px solid #eef2f3}
.accordion-content{padding:14px 16px;color:#374151}
.price-list{list-style:none;margin:0;padding:6px 0}
.price-list li{display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px dashed #eef2f3}
.price-list li:last-child{border-bottom:none}
.grand-total{font-weight:800}

/* Scroll to top */
.scroll-top{position:fixed;right:18px;bottom:18px;width:42px;height:42px;border-radius:50%;border:none;background:var(--brand-grad);color:#fff;box-shadow:var(--shadow-md);cursor:pointer;display:none}

/* Utilities */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* Responsive */
@media (max-width: 960px){
  .purchase-includes{grid-template-columns:1fr}
  .product-info__grid{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .mini-header{flex-wrap:wrap;gap:8px}
  .hero-spacer{height:24px}
  .include-list{grid-template-columns:repeat(2,1fr)}
  .product-info__intro{grid-template-columns:1fr}
  .locator-form{flex-direction:column;align-items:stretch;gap:10px}
  .near-msg{justify-content:center}
}

/* Typography overrides per Candere guidelines */
.mini-header__title{font-weight:700;font-family:"Playfair Display",serif}
.btn{font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:1.25px}
.section-title{font-family:"Playfair Display",serif}
.summary-title{font-family:"Playfair Display",serif;font-weight:700}
.card-title{font-family:"Playfair Display",serif;font-weight:700}
/* News / Ticker text */
.news-ticker, .news li{font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:700;text-align:center}
      `}</style>
    </main>
  );
}


