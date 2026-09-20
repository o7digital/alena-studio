"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  formatPrice,
  products,
  siteContent,
  type Product,
} from "@/data/site-content";
import { translations, type Language, type ProductTranslation } from "@/data/translations";

type CartLine = { product: Product; quantity: number };
type Panel = "cart" | "search" | "legal" | "contact" | null;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbgldowb";

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
  copy,
  locale,
  addLabel,
  priceLabel,
}: {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
  copy: ProductTranslation;
  locale: string;
  addLabel: string;
  priceLabel: string;
}) {
  return (
    <article className="product-card">
      <div
        className={`product-image ${product.cropClass}`}
        role="img"
        aria-label={copy.imageAlt}
      >
        <span className="product-index">0{index + 1}</span>
        <button onClick={() => onAdd(product)}>
          {addLabel}
          <span className="sr-only">: {copy.name}</span>
        </button>
      </div>
      <div className="product-meta">
        <div>
          <h3>{copy.name}</h3>
          <p>{copy.materials}</p>
        </div>
        <span>
          {formatPrice(product, locale)}
          <small>{priceLabel}</small>
        </span>
      </div>
    </article>
  );
}

export function SachettoPage({ language = "en" }: { language?: Language }) {
  const c = translations[language];
  const detailsToConfirm = language === "es" ? "Detalles por confirmar" : language === "it" ? "Dettagli da confermare" : "Details to be confirmed";
  const contactCopy = language === "es"
    ? { title: "Escribe al estudio", intro: "Cuéntanos qué tienes en mente. Te responderemos lo antes posible.", name: "Nombre", namePlaceholder: "Tu nombre", message: "Mensaje", messagePlaceholder: "¿Cómo podemos ayudarte?", submit: "Enviar mensaje", success: "Gracias — tu mensaje ha sido enviado.", error: "Algo salió mal. Inténtalo de nuevo." }
    : language === "it"
      ? { title: "Scrivi allo studio", intro: "Raccontaci cosa hai in mente. Ti risponderemo il prima possibile.", name: "Nome", namePlaceholder: "Il tuo nome", message: "Messaggio", messagePlaceholder: "Come possiamo aiutarti?", submit: "Invia messaggio", success: "Grazie — il tuo messaggio è stato inviato.", error: "Qualcosa è andato storto. Riprova." }
      : { title: "Write to the studio", intro: "Tell us what is on your mind. We will get back to you as soon as possible.", name: "Name", namePlaceholder: "Your name", message: "Message", messagePlaceholder: "How can we help?", submit: "Send message", success: "Thank you — your message has been sent.", error: "Something went wrong. Please try again." };
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce(
    (total, line) => total + line.product.priceCents * line.quantity,
    0,
  );
  const filteredProducts = products.filter((product) =>
    `${c.products[product.id].name} ${c.products[product.id].materials}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
    setToast(`${c.products[product.id].name} ${c.addedToEdit}`);
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
    setToast(`${label} · ${detailsToConfirm}`);
  };

  const legalNotice = (
    <div className="legal-panel">
      <p className="legal-updated">{c.legal.updated}</p>
      {c.legal.sections.map((section) => (
        <section key={section.heading}>
          <h3>{section.heading}</h3>
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
    </div>
  );

  const submitNewsletter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", `Sachetto ${language.toUpperCase()} newsletter signup`);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Newsletter submission failed");
      form.reset();
      setToast(contactCopy.success);
    } catch {
      setToast(contactCopy.error);
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSending(true);
    setContactStatus("idle");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", `Sachetto ${language.toUpperCase()} contact message`);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Contact submission failed");
      form.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    } finally {
      setContactSending(false);
    }
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

  const languagePaths: Record<Language, string> = { en: "/", es: "/es", it: "/it" };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">{c.announcement}</div>
      <header className="site-header">
        <div className="header-left">
        <button
          className={menuOpen ? "menu-button active" : "menu-button"}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? c.closeMenu : c.menu}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className="language-switcher">
          <button className="language-current" aria-label={c.languageLabel} aria-expanded="false">
            {c.code}<span aria-hidden="true">⌄</span>
          </button>
          <div className="language-menu" role="menu">
            {(["en", "es", "it"] as Language[]).map((code) => (
              <a key={code} href={languagePaths[code]} className={code === language ? "active" : ""} lang={code} role="menuitem">{code.toUpperCase()}</a>
            ))}
          </div>
        </div>
        <nav
          id="main-navigation"
          className={menuOpen ? "nav-left open" : "nav-left"}
          aria-label="Main navigation"
        >
          <a href="#collection" onClick={() => setMenuOpen(false)}>{c.shop}</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>{c.story}</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>{c.craft}</a>
          <button
            className="mobile-search"
            onClick={() => {
              setMenuOpen(false);
              setPanel("search");
            }}
          >
            {c.search}
          </button>
        </nav>
        </div>
        <a className="brand" href="#top" aria-label={c.home}>
          <span>SACHETTO</span>
        </a>
        <nav className="nav-right" aria-label={c.bag}>
          <button onClick={() => setPanel("search")}>{c.search}</button>
          <button onClick={() => setPanel("cart")}>{c.bag} ({cartCount})</button>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" role="img" aria-label={c.products["demo-cielo-bag"].imageAlt} />
          <div className="hero-copy">
            <p className="eyebrow">{c.heroEyebrow}</p>
            <h1 id="hero-title">{c.heroTitle[0]}<br /><em>{c.heroTitle[1]}</em></h1>
            <p className="hero-text">{c.heroText}</p>
            <a className="text-link" href="#collection">{c.discoverCollection} <Arrow /></a>
          </div>
          <div className="hero-number" aria-hidden="true">01 <span>/</span> 04</div>
          <div className="hero-caption">{c.collectionTitle}<br />{language === "es" ? "Previsualización · 2026" : language === "it" ? "Anteprima · 2026" : "Preview · 2026"}</div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="eyebrow">{language === "es" ? "La mirada de Sachetto" : language === "it" ? "La visione di Sachetto" : "The Sachetto point of view"}</p>
          <h2 id="manifesto-title">{language === "es" ? <>Objetos de <em>confianza serena,</em><br />hechos para una vida en movimiento.</> : language === "it" ? <>Oggetti di <em>sicurezza discreta,</em><br />creati per una vita in movimento.</> : <>Objects of <em>quiet confidence,</em><br />made for a life in motion.</>}</h2>
          <p>{language === "es" ? "Proporciones cuidadas. Materiales honestos. Cada pieza se diseña en nuestro estudio de San Diego y se termina a mano en series limitadas y conscientes." : language === "it" ? "Proporzioni pensate. Materiali autentici. Ogni pezzo è progettato nel nostro studio di San Diego e rifinito a mano in serie limitate e curate." : "Thoughtful proportions. Honest materials. Every piece is designed in our San Diego studio and finished by hand in considered, limited runs."}</p>
        </section>

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-heading">
            <div><p className="eyebrow">{c.collectionEyebrow}</p><h2 id="collection-title">{c.collectionTitle}</h2></div>
            <a href="#collection-grid">{c.viewAll} <Arrow dark /></a>
          </div>
          <div className="product-grid" id="collection-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} copy={c.products[product.id]} locale={c.locale} addLabel={c.addToEdit} priceLabel={c.demoPrice} />
            ))}
          </div>
        </section>

        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-photo" role="img" aria-label={c.products["demo-sol-tote"].imageAlt} />
          <div className="story-copy">
            <p className="eyebrow">{c.storyEyebrow}</p>
            <h2 id="story-title">{c.storyTitle[0]}<br />{c.storyTitle[1]}</h2>
            <blockquote>{c.quote}</blockquote>
            <p>{c.storyBody}</p>
            <a className="outline-button" href="#craft">{c.discoverCraft} <Arrow dark /></a>
          </div>
        </section>

        <section className="craft" id="craft" aria-labelledby="craft-title">
          <div className="craft-title"><p className="eyebrow">{c.craftEyebrow}</p><h2 id="craft-title">{c.craftTitle[0]}<br /><em>{c.craftTitle[1]}</em></h2></div>
          <div className="craft-copy">
            <p>{c.craftBody}</p>
            <div className="craft-stats">
              <div><strong>12+</strong><span>{c.craftStats[0][0]}<br />{c.craftStats[0][1]}</span></div>
              <div><strong>01</strong><span>{c.craftStats[1][0]}<br />{c.craftStats[1][1]}</span></div>
            </div>
          </div>
        </section>

        <section className="journal" aria-labelledby="journal-title">
          <div className="journal-image" role="img" aria-label={c.products["demo-cielo-bag"].imageAlt} />
          <div className="journal-note"><span>{c.journalEyebrow}</span><p id="journal-title">{c.journalTitle[0]}<br />{c.journalTitle[1]}</p><a href="#collection">{c.shopMood} <Arrow /></a></div>
        </section>

        <section className="newsletter" aria-labelledby="newsletter-title">
          <p className="eyebrow">{c.newsletterEyebrow}</p>
          <h2 id="newsletter-title">{c.newsletterTitle[0]}<br />{c.newsletterTitle[1]}</h2>
          <form onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="email">{c.emailLabel}</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={c.emailPlaceholder} required />
            <button type="submit">{c.join} <Arrow dark /></button>
          </form>
          <small>{language === "es" ? "Tu correo se enviará de forma segura mediante Formspree." : language === "it" ? "La tua email sarà inviata in modo sicuro tramite Formspree." : "Your email will be sent securely via Formspree."}</small>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span>SACHETTO</span></div>
        <div className="footer-links">
          <div><h3>{c.explore}</h3><a href="#collection">{c.shopAll}</a><a href="#story">{c.story}</a><a href="#craft">{c.craft}</a></div>
          <div><h3>{c.clientCare}</h3><button onClick={() => showPendingContent(c.shipping)}>{c.shipping}</button><button onClick={() => showPendingContent(c.careGuide)}>{c.careGuide}</button><button onClick={() => { setContactStatus("idle"); setPanel("contact"); }}>{c.contact}</button></div>
          <div><h3>{c.follow}</h3><button onClick={() => showPendingContent("Instagram")}>Instagram</button><button onClick={() => showPendingContent("Pinterest")}>Pinterest</button></div>
        </div>
        <div className="footer-bottom"><span>{c.previewCopyright}</span><span>{c.designedIn}</span><button onClick={() => setPanel("legal")}>{c.privacyNotice}</button></div>
      </footer>

      {panel && (
        <div className="panel-layer">
          <button className="panel-backdrop" onClick={() => setPanel(null)} aria-label="Close panel" tabIndex={-1} />
          <aside className="side-panel" role="dialog" aria-modal="true" aria-labelledby="panel-title">
            <div className="panel-header">
              <div><p className="eyebrow">{panel === "legal" ? c.legal.eyebrow : panel === "contact" ? c.contact : c.preview}</p><h2 id="panel-title">{panel === "cart" ? c.yourEdit : panel === "legal" ? c.privacyNotice : panel === "contact" ? contactCopy.title : c.searchEdit}</h2></div>
              <button ref={closeButtonRef} className="panel-close" onClick={() => setPanel(null)} aria-label={c.close}>×</button>
            </div>

            {panel === "contact" ? (
              <form className="contact-panel" onSubmit={submitContact}>
                <p>{contactCopy.intro}</p>
                <label htmlFor="contact-name">{contactCopy.name}</label>
                <input id="contact-name" name="name" type="text" placeholder={contactCopy.namePlaceholder} required />
                <label htmlFor="contact-email">{c.emailLabel}</label>
                <input id="contact-email" name="email" type="email" placeholder={c.emailPlaceholder} required />
                <label htmlFor="contact-message">{contactCopy.message}</label>
                <textarea id="contact-message" name="message" placeholder={contactCopy.messagePlaceholder} rows={6} required />
                <button type="submit" disabled={contactSending}>{contactSending ? "…" : contactCopy.submit}</button>
                {contactStatus === "success" && <p className="form-status success">{contactCopy.success}</p>}
                {contactStatus === "error" && <p className="form-status error">{contactCopy.error}</p>}
              </form>
            ) : panel === "legal" ? legalNotice : panel === "search" ? (
              <div className="search-panel">
                <label htmlFor="search-products">{c.searchProducts}</label>
                <input id="search-products" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.searchPlaceholder} autoFocus />
                <p className="result-count" aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? c.piece : c.pieces}</p>
                <div className="search-results">
                  {filteredProducts.map((product) => (
                    <div className="search-result" key={product.id}>
                      <div><h3>{c.products[product.id].name}</h3><p>{c.products[product.id].materials}</p></div>
                      <button onClick={() => addToCart(product)}>{c.add}</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cart-panel">
                {cart.length === 0 ? <p className="empty-state">{c.emptyEdit}</p> : (
                  <div className="cart-lines">
                    {cart.map((line) => (
                      <div className="cart-line" key={line.product.id}>
                        <div><h3>{c.products[line.product.id].name}</h3><p>{formatPrice(line.product, c.locale)} · {c.demoPrice}</p></div>
                        <div className="quantity" aria-label={`${c.quantityFor} ${c.products[line.product.id].name}`}>
                          <button onClick={() => updateQuantity(line.product.id, -1)} aria-label={`− ${c.products[line.product.id].name}`}>−</button>
                          <span>{line.quantity}</span>
                          <button onClick={() => updateQuantity(line.product.id, 1)} aria-label={`+ ${c.products[line.product.id].name}`}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cart-summary">
                  <div><span>{c.demoSubtotal}</span><strong>{new Intl.NumberFormat(c.locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cartTotal / 100)}</strong></div>
                  <button type="button" disabled>{c.checkout}</button>
                  <small>{c.noPayment}</small>
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

export default function Home() {
  return <SachettoPage language="en" />;
}
