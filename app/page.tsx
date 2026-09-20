"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  formatPrice,
  products,
  siteContent,
  type Product,
} from "@/data/site-content";

type CartLine = { product: Product; quantity: number };
type Panel = "cart" | "search" | "legal" | null;

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span className={dark ? "arrow dark" : "arrow"} aria-hidden="true">
      ↗
    </span>
  );
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <div
        className={`product-image ${product.cropClass}`}
        role="img"
        aria-label={product.imageAlt}
      >
        <span className="product-index">0{index + 1}</span>
        <button onClick={() => onAdd(product)}>
          Add to edit
          <span className="sr-only">: {product.name}</span>
        </button>
      </div>
      <div className="product-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.materials}</p>
        </div>
        <span>
          {formatPrice(product)}
          <small>Demo price</small>
        </span>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce(
    (total, line) => total + line.product.priceCents * line.quantity,
    0,
  );
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.materials}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!panel) return;
    closeButtonRef.current?.focus();
    document.body.classList.add("panel-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("panel-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [panel]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setToast(`${product.name} added to your edit`);
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.product.id === productId
            ? { ...line, quantity: line.quantity + change }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const showPendingContent = (label: string) => {
    setToast(`${label} · Details to be confirmed`);
  };

  const legalNotice = (
    <div className="legal-panel">
      <p className="legal-updated">Last updated: September 19, 2026</p>
      <section>
        <h3>1. Identity of the controller</h3>
        <p>Sachetto, operator of this website, is based in San Diego, California, United States. The legal entity, registered address and privacy contact details are to be confirmed before launch.</p>
      </section>
      <section>
        <h3>2. Data we collect</h3>
        <p>When you contact us, we may collect your name, email address, telephone number, message contents and any information you choose to provide. We do not request sensitive personal data; please do not include it in free-text messages.</p>
        <p>When you visit the site, technical providers may process limited data such as IP address, date and time, requested URL, browser, device, operating system, referring page and security logs.</p>
      </section>
      <section>
        <h3>3. Purposes and legal bases</h3>
        <ul>
          <li>Answer enquiries and communicate with you.</li>
          <li>Prepare requested quotations or other pre-contractual steps.</li>
          <li>Manage the professional relationship and provide services.</li>
          <li>Protect the site, prevent abuse or fraud and comply with legal obligations.</li>
        </ul>
        <p>Where applicable, processing is based on requested pre-contractual steps, performance of a contract, legal obligations, legitimate interests or your consent.</p>
      </section>
      <section>
        <h3>4. Processors, disclosures and transfers</h3>
        <p>The site is hosted by <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel</a>. Service providers may process data in the United States and other countries. We may disclose data where legally required, to protect rights or safety, or to professional advisers bound by confidentiality. We do not sell or rent personal data.</p>
      </section>
      <section>
        <h3>5. Retention and security</h3>
        <p>Enquiries that do not result in a contractual relationship are retained only as long as needed for their purpose and applicable legal obligations. Client records may be retained during the relationship and afterwards where required for legal, tax, contractual or claims obligations. We use reasonable administrative and technical safeguards, although no system is completely infallible.</p>
      </section>
      <section>
        <h3>6. Rights in Mexico</h3>
        <p>Under Mexico&apos;s Federal Law on Protection of Personal Data Held by Private Parties, you may exercise access, rectification, cancellation and objection rights (ARCO), withdraw consent or limit the use and disclosure of your data. The request process and contact details will be published once Sachetto&apos;s legal information is confirmed.</p>
      </section>
      <section>
        <h3>7. European rights</h3>
        <p>Where the General Data Protection Regulation applies, you may request access, correction, erasure, restriction, portability or objection; withdraw consent without affecting earlier processing; and complain to the supervisory authority where you live, work or where the alleged infringement occurred.</p>
      </section>
      <section>
        <h3>8. California residents&apos; rights</h3>
        <p>To the extent the CCPA, as amended by the CPRA, applies, California residents may request to know, access, correct or delete personal information and receive information about its sources, purposes and recipients. We do not sell or share personal information for cross-context behavioural advertising.</p>
      </section>
      <section>
        <h3>9. Cookies and analytics</h3>
        <p>This preview does not currently submit newsletter data or run analytics. If analytics or non-essential cookies are introduced, they will load only after consent where required, and you will be able to change or withdraw that choice.</p>
      </section>
      <section>
        <h3>10. Children and changes</h3>
        <p>The site and services are not directed to children, and we do not knowingly collect their data. We may update this notice to reflect legal or processing changes; the current version and date will be published here.</p>
      </section>
    </div>
  );

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setToast("Preview only · No email was submitted");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteContent.name,
        description: siteContent.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Diego",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      ...products.map((product) => ({
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        brand: { "@type": "Brand", name: siteContent.name },
      })),
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">{siteContent.announcement}</div>
      <header className="site-header">
        <button
          className={menuOpen ? "menu-button active" : "menu-button"}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          id="main-navigation"
          className={menuOpen ? "nav-left open" : "nav-left"}
          aria-label="Main navigation"
        >
          <a href="#collection" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>The craft</a>
          <button
            className="mobile-search"
            onClick={() => {
              setMenuOpen(false);
              setPanel("search");
            }}
          >
            Search
          </button>
        </nav>
        <a className="brand" href="#top" aria-label="Sachetto home">
          <span>SACHETTO</span>
        </a>
        <nav className="nav-right" aria-label="Shopping navigation">
          <button onClick={() => setPanel("search")}>Search</button>
          <button onClick={() => setPanel("cart")}>Bag ({cartCount})</button>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" role="img" aria-label="Woven and cognac leather handbag in warm California light" />
          <div className="hero-copy">
            <p className="eyebrow">Handmade in San Diego</p>
            <h1 id="hero-title">Made slowly.<br /><em>Carried everywhere.</em></h1>
            <p className="hero-text">Modern heirlooms shaped by hand, where natural fibers meet supple leather and California light.</p>
            <a className="text-link" href="#collection">Discover the collection <Arrow /></a>
          </div>
          <div className="hero-number" aria-hidden="true">01 <span>/</span> 04</div>
          <div className="hero-caption">The Studio Collection<br />Preview · 2026</div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="eyebrow">The Sachetto point of view</p>
          <h2 id="manifesto-title">Objects of <em>quiet confidence,</em><br />made for a life in motion.</h2>
          <p>Thoughtful proportions. Honest materials. Every piece is designed in our San Diego studio and finished by hand in considered, limited runs.</p>
        </section>

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-heading">
            <div><p className="eyebrow">Demo catalogue · 01</p><h2 id="collection-title">The Studio Edit</h2></div>
            <a href="#collection-grid">View all pieces <Arrow dark /></a>
          </div>
          <div className="product-grid" id="collection-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-photo" role="img" aria-label="Handcrafted woven bag styled with an ivory linen outfit" />
          <div className="story-copy">
            <p className="eyebrow">From the maker&apos;s hands · 02</p>
            <h2 id="story-title">A personal study<br />in form and feeling.</h2>
            <blockquote>“I wanted to create the kind of bag you reach for without thinking — then keep for years.”</blockquote>
            <p>Sachetto began with one silhouette, a few meters of leather and a belief that everyday pieces can still feel deeply special. Each design balances strength with softness, tradition with a distinctly modern ease.</p>
            <a className="outline-button" href="#craft">Discover the craft <Arrow dark /></a>
          </div>
        </section>

        <section className="craft" id="craft" aria-labelledby="craft-title">
          <div className="craft-title"><p className="eyebrow">The craft · 03</p><h2 id="craft-title">Beauty is<br /><em>in the details.</em></h2></div>
          <div className="craft-copy">
            <p>We select tactile materials that age with character: full-grain leathers, natural woven fibers and hardware chosen to last.</p>
            <div className="craft-stats">
              <div><strong>12+</strong><span>demo hours of handwork<br />to be confirmed</span></div>
              <div><strong>01</strong><span>demo maker detail<br />to be confirmed</span></div>
            </div>
          </div>
        </section>

        <section className="journal" aria-labelledby="journal-title">
          <div className="journal-image" role="img" aria-label="Three handbags in ivory, woven espresso and cognac leather" />
          <div className="journal-note"><span>Postcard from California</span><p id="journal-title">Soft structure,<br />sun-warmed tones.</p><a href="#collection">Shop the mood <Arrow /></a></div>
        </section>

        <section className="newsletter" aria-labelledby="newsletter-title">
          <p className="eyebrow">The studio letter</p>
          <h2 id="newsletter-title">New pieces, private previews<br />and notes from San Diego.</h2>
          <form onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Your email address" required />
            <button type="submit">Join <Arrow dark /></button>
          </form>
          <small>Preview form only — no data is sent or stored. Subscription terms to be confirmed.</small>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span>SACHETTO</span></div>
        <div className="footer-links">
          <div><h3>Explore</h3><a href="#collection">Shop all</a><a href="#story">Our story</a><a href="#craft">The craft</a></div>
          <div><h3>Client care</h3><button onClick={() => showPendingContent("Shipping & returns")}>Shipping & returns</button><button onClick={() => showPendingContent("Care guide")}>Care guide</button><button onClick={() => showPendingContent("Contact")}>Contact</button></div>
          <div><h3>Follow</h3><button onClick={() => showPendingContent("Instagram")}>Instagram</button><button onClick={() => showPendingContent("Pinterest")}>Pinterest</button></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Sachetto · Preview</span><span>Designed in San Diego, California</span><button onClick={() => setPanel("legal")}>Privacy notice</button></div>
      </footer>

      {panel && (
        <div className="panel-layer">
          <button className="panel-backdrop" onClick={() => setPanel(null)} aria-label="Close panel" tabIndex={-1} />
          <aside className="side-panel" role="dialog" aria-modal="true" aria-labelledby="panel-title">
            <div className="panel-header">
              <div><p className="eyebrow">{panel === "legal" ? "Sachetto legal" : "Sachetto preview"}</p><h2 id="panel-title">{panel === "cart" ? "Your edit" : panel === "legal" ? "Privacy notice" : "Search the edit"}</h2></div>
              <button ref={closeButtonRef} className="panel-close" onClick={() => setPanel(null)} aria-label="Close panel">×</button>
            </div>

            {panel === "legal" ? legalNotice : panel === "search" ? (
              <div className="search-panel">
                <label htmlFor="search-products">Search products</label>
                <input id="search-products" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Bag name or material" autoFocus />
                <p className="result-count" aria-live="polite">{filteredProducts.length} demo {filteredProducts.length === 1 ? "piece" : "pieces"}</p>
                <div className="search-results">
                  {filteredProducts.map((product) => (
                    <div className="search-result" key={product.id}>
                      <div><h3>{product.name}</h3><p>{product.materials}</p></div>
                      <button onClick={() => addToCart(product)}>Add</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cart-panel">
                {cart.length === 0 ? <p className="empty-state">Your edit is empty.</p> : (
                  <div className="cart-lines">
                    {cart.map((line) => (
                      <div className="cart-line" key={line.product.id}>
                        <div><h3>{line.product.name}</h3><p>{formatPrice(line.product)} · Demo price</p></div>
                        <div className="quantity" aria-label={`Quantity for ${line.product.name}`}>
                          <button onClick={() => updateQuantity(line.product.id, -1)} aria-label={`Remove one ${line.product.name}`}>−</button>
                          <span>{line.quantity}</span>
                          <button onClick={() => updateQuantity(line.product.id, 1)} aria-label={`Add one ${line.product.name}`}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cart-summary">
                  <div><span>Demo subtotal</span><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cartTotal / 100)}</strong></div>
                  <button type="button" disabled>Checkout available after commerce setup</button>
                  <small>No payment or order processing is connected.</small>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      <div className={toast ? "toast show" : "toast"} role="status" aria-live="polite">{toast}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
