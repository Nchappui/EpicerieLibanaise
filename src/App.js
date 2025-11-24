import "./App.css";
import { useState, useEffect } from "react";

// URL du CSV Google Sheets
const MENU_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcpiBOpqNX1vCjeP68L48phxjsKJX3TpU5dW28_3gPdjZdops-bZdkcjhGcp7hTxpylk2_xPrpX6Xz/pub?gid=0&single=true&output=csv";

// Fonction pour parser le CSV et organiser les données
function parseMenuCSV(csvText) {
  const lines = csvText.trim().split("\n");

  const menuData = {
    starters: [],
    mains: [],
    desserts: [],
    drinks: [],
  };

  // Commencer à la ligne 2 pour sauter l'en-tête et la première ligne vide
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Parser CSV en gérant les guillemets
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    // Le CSV a ce format: Nom, Description, Prix (CHF), Catégorie
    if (values.length < 4) continue;

    const name = values[0] || "";
    const desc = values[1] || "";
    const priceStr = values[2] || "";
    const category = values[3].toLowerCase();

    // Nettoyer le prix (enlever "CHF" et garder juste le nombre)
    const price = priceStr.replace(/[^\d.,]/g, "").replace(",", ".");

    const item = {
      name: name,
      desc: desc,
      price: price,
    };

    if (category.includes("entrée") || category.includes("entree")) {
      menuData.starters.push(item);
    } else if (category.includes("plat")) {
      menuData.mains.push(item);
    } else if (category.includes("dessert")) {
      menuData.desserts.push(item);
    } else if (category.includes("boisson")) {
      menuData.drinks.push(item);
    }
  }

  return menuData;
}

function SectionHeading({ overline, title, subtitle }) {
  return (
    <div className="center fade-in" style={{ marginBottom: "2.5rem" }}>
      {overline && (
        <div className="badge" style={{ marginBottom: "1rem" }}>
          {overline}
        </div>
      )}
      <h2
        className="display"
        style={{ fontSize: "clamp(2rem,4.2vw,3rem)", margin: "0 0 .85rem" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="lead"
          style={{ maxWidth: 620, margin: "0 auto", color: "var(--clr-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function MenuCategory({ title, items }) {
  return (
    <div className="menu-category fade-in">
      <h3>{title}</h3>
      {items.map((item, i) => (
        <div className="menu-item" key={i}>
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
          </div>
          <div className="price">€{item.price}</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [menuData, setMenuData] = useState({
    starters: [],
    mains: [],
    desserts: [],
    drinks: [],
  });
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState(false);

  // Charger le menu depuis le CSV
  useEffect(() => {
    fetch(MENU_CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedMenu = parseMenuCSV(csvText);
        setMenuData(parsedMenu);
        setIsLoadingMenu(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du menu:", error);
        setMenuError(true);
        setIsLoadingMenu(false);
      });
  }, []);

  /*
  const handleOrderClick = (e) => {
    e.preventDefault();
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth <= 768;

    if (isMobile) {
      // Redirection mobile
      window.location.href =
        "https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=305663e7-9d6a-4b7c-969d-4ecc1a8be626&client_is_mobile=true";
    } else {
      // Popup desktop
      setShowOrderPopup(true);
    }
  };
  */

  const closePopup = () => {
    setShowOrderPopup(false);
    setShowBookingPopup(false);
  };

  /*
  const handleBookingClick = (e) => {
    e.preventDefault();
    setShowBookingPopup(true);
  };
  */

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && (showOrderPopup || showBookingPopup)) {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showOrderPopup, showBookingPopup]);

  // Écouter les messages du widget FoodBooking pour fermer le popup
  useEffect(() => {
    const handleMessage = (event) => {
      // FoodBooking envoie des messages quand l'utilisateur ferme le widget
      if (
        event.data &&
        (event.data.type === "close" ||
          event.data === "close" ||
          event.data.action === "close")
      ) {
        closePopup();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <nav className="site-nav" aria-label="Main Navigation">
        <div className="nav-inner">
          <a href="#reservation" className="brand">
            <img
              src="/images/logo-mark.jpg"
              alt="Épicerie Libanaise Logo"
              className="brand-logo"
            />
          </a>
          <ul className="nav-links">
            <li>
              <a href="#reservation">Réserver</a>
            </li>
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#location">Localisation</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Reservation Hero (First Section) */}
      <header
        id="reservation"
        className="hero"
        style={{
          position: "relative",
          background:
            "linear-gradient(135deg,rgba(18,72,75,.75),rgba(162,34,43,.65)),url(/imageFond.png) center/cover",
        }}
      >
        <div className="hero-inner fade-in" style={{ maxWidth: 880 }}>
          <h1 className="display" style={{ marginBottom: "1rem" }}>
            Réservez ou Commandez
          </h1>
          <p className="lead" style={{ maxWidth: 620 }}>
            Vivez l’instant sur place ou savourez l’expérience chez vous.
          </p>

          <div className="reservation-grid" style={{ marginTop: "2.25rem" }}>
            <a
              className="card-link"
              href="https://book.easytable.com/book/?id=6f9fd&lang=fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="card fade-in"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <div className="badge">Sur place</div>
                <h3>Réserver une Table</h3>
                <p>
                  Atmosphère élégante, service attentif, cuisine généreuse &
                  raffinée.
                </p>
                <span className="btn">Réserver</span>
              </div>
            </a>
            <a
              className="card-link"
              href="https://mylightspeed.app/OKPZUCUF/C-ordering/menu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="card fade-in"
                style={{ animationDelay: ".1s", backdropFilter: "blur(4px)" }}
              >
                <div className="badge">À emporter</div>
                <h3>Commander en Ligne</h3>
                <p>
                  Vos favoris préparés avec soin, prêts rapidement à emporter.
                </p>
                <span className="btn">Commander</span>
              </div>
            </a>
          </div>
          <div className="hero-actions" style={{ marginTop: "2.5rem" }}>
            <a href="#about" className="btn btn-outline">
              Découvrir la Maison
            </a>
            <a href="#menu" className="btn">
              Voir le Menu
            </a>
          </div>
        </div>
      </header>

      {/* About (former Welcome) */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="section-narrow fade-in" style={{ textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: "1rem" }}>
            À propos
          </div>
          <h2
            className="display"
            id="about-heading"
            style={{ margin: "0 0 1rem" }}
          >
            Une Ode aux Saveurs Libanaises
          </h2>
          <p className="lead" style={{ maxWidth: 760, margin: "0 auto" }}>
            Épicerie Libanaise, c’est l’élégance à la libanaise : une cuisine
            qui allie tradition et modernité dans une ambiance conviviale et
            raffinée. Nos recettes ancestrales, transmises de génération en
            génération, sont revisitées avec justesse pour offrir des plats
            authentiques, généreux et pleins de saveurs.
            <br />
            <br />
            Ici, tout est pensé pour le plaisir du goût et le partage : des
            produits frais soigneusement sélectionnés, une carte équilibrée
            entre classiques et créations, et une attention particulière portée
            à chaque détail.
            <br />
            <br />
            Notre équipe jeune et dynamique vous accueille avec le sourire et la
            bonne humeur, fidèle à l’esprit libanais : chaleureux, accueillant
            et festif. Que ce soit pour un déjeuner entre amis, un dîner en
            famille ou un moment à emporter, L’Épicerie Libanaise vous promet
            une expérience simple, savoureuse et sincère.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="section menu-section"
        aria-labelledby="menu-heading"
      >
        <div className="section-narrow">
          <SectionHeading
            overline="Notre Sélection"
            title="Le Menu"
            subtitle="Une carte évolutive célébrant la saison et la tradition Levantine."
          />
          {isLoadingMenu ? (
            <div className="center" style={{ padding: "3rem 0" }}>
              <p className="lead">Chargement du menu...</p>
            </div>
          ) : menuError ? (
            <div className="center" style={{ padding: "3rem 0" }}>
              <p className="lead" style={{ color: "var(--clr-muted)" }}>
                Le menu n'est pas disponible pour le moment.
                <br />
                Veuillez nous contacter pour plus d'informations.
              </p>
            </div>
          ) : (
            <div className="menu-grid">
              <MenuCategory title="Entrées" items={menuData.starters} />
              <MenuCategory title="Plats" items={menuData.mains} />
              <MenuCategory title="Desserts" items={menuData.desserts} />
              <MenuCategory title="Boissons" items={menuData.drinks} />
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section"
        aria-labelledby="contact-heading"
      >
        <div className="section-narrow">
          <SectionHeading
            overline="Nous écrire"
            title="Contact"
            subtitle="Une question, un évènement privé ou un traiteur ? Parlons-en."
          />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            }}
          >
            <div className="fade-in">
              <h3 className="serif" style={{ marginTop: 0 }}>
                Coordonnées
              </h3>
              <p style={{ marginTop: 0 }} className="muted">
                Téléphone & Réservations
              </p>
              <p style={{ fontWeight: 600 }}>04 74 06 30 83</p>
              <p style={{ marginTop: "1rem" }} className="muted">
                Email
              </p>
              <p style={{ fontWeight: 600 }}>
                contact@lepicerielibanaiseresto.com
              </p>
              <p style={{ marginTop: "1rem" }} className="muted">
                Adresse
              </p>
              <p style={{ fontWeight: 600 }}>
                55 Rue de Thizy
                <br />
                69400 Villefranche-sur-Saône
              </p>
            </div>
            <form
              className="fade-in"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Formulaire de contact"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".85rem",
              }}
            >
              <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
                <input
                  required
                  placeholder="Nom"
                  aria-label="Nom"
                  style={inputStyle}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  style={inputStyle}
                />
              </div>
              <input
                required
                placeholder="Sujet"
                aria-label="Sujet"
                style={subjectInputStyle}
              />
              <textarea
                required
                placeholder="Message"
                aria-label="Message"
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
              ></textarea>
              <button className="btn" style={{ alignSelf: "flex-start" }}>
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Footer */}
      <section
        id="location"
        className="section location"
        aria-labelledby="location-heading"
      >
        <div className="section-narrow">
          <SectionHeading
            overline="Nous trouver"
            title="Localisation"
            subtitle="Au cœur du quartier – un refuge gourmand méditerranéen."
          />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            }}
          >
            <div
              className="fade-in"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3 className="serif" style={{ marginTop: 0 }}>
                  Horaires
                </h3>
                <ul className="hours">
                  <li>
                    <span>Lun</span>
                    <span>Fermé</span>
                  </li>
                  <li>
                    <span>Mar</span>
                    <span>11:30 - 15:00 | 19h30 - 22h30</span>
                  </li>
                  <li>
                    <span>Mer</span>
                    <span>11:30 - 15:00 | 19h30 - 22h30</span>
                  </li>
                  <li>
                    <span>Jeu</span>
                    <span>11:30 - 15:00 | 19h30 - 22h30</span>
                  </li>
                  <li>
                    <span>Ven</span>
                    <span>11:30 - 15:00 | 19h30 - 22h30</span>
                  </li>
                  <li>
                    <span>Sam</span>
                    <span>11:30 - 15:00 | 19h30 - 22h30</span>
                  </li>
                  <li>
                    <span>Dim</span>
                    <span>Fermé</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="serif" style={{ marginTop: 0 }}>
                  Réseaux
                </h3>
                <div className="social">
                  <a
                    aria-label="Instagram"
                    href="https://www.instagram.com/lepicerielibanaiseresto/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    aria-label="Facebook"
                    href="https://www.facebook.com/p/L%C3%A9picerie-Libanaise-restaurant-61574539592749/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "0.6rem" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
                      <path d="M15 8h-1.5c-1.2 0-1.5.6-1.5 1.5V11h3l-.4 2H12v6H9v-6H7.5V11H9V9.5c0-1.7.9-3.5 3.5-3.5H15v2z" />
                    </svg>
                  </a>
                  <a
                    aria-label="Google My Business"
                    href="https://www.google.com/search?client=firefox-b-d&sca_esv=45c8bf4228d081b3&kgmid=%2Fg%2F11xf32sw9j&q=L'%C3%A9picerie%20Libanaise%20Restaurant&shndl=30&shem=lcuae%2Cuaasie&source=sh%2Fx%2Floc%2Funi%2Fm1%2F1&kgs=952028c8dacc72d7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "0.6rem" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-in map-wrapper">
              <iframe
                title="Localisation du restaurant"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.6474445358486!2d4.718019976540982!3d45.98925817108614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ebfc93c6f23b%3A0x6a61c7db4c4f5d4e!2s55%20Rue%20de%20Thizy%2C%2069400%20Villefranche-sur-Sa%C3%B4ne!5e0!3m2!1sfr!2sfr!4v1709141234567!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="footer">
            <span>
              © {new Date().getFullYear()} Épicerie Libanaise. Tous droits
              réservés.
            </span>
            <span>Design & Développement</span>
          </div>
        </div>
      </section>

      {/* Popup de commande (desktop uniquement) */}
      {showOrderPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup-close-btn"
              onClick={closePopup}
              aria-label="Fermer la commande"
            >
              FERMER
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <iframe
              src="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=305663e7-9d6a-4b7c-969d-4ecc1a8be626"
              title="Commander en ligne"
              className="popup-iframe"
            ></iframe>
          </div>
        </div>
      )}

      {/* Popup de réservation (désactivée) - code précédent conservé ci-dessous
      {showBookingPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content booking-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="popup-close-btn"
              onClick={closePopup}
              aria-label="Fermer la réservation"
            >
              FERMER
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="booking-widget-container">
              <noscript>Votre navigateur ne supporte pas JavaScript!</noscript>
              <div className="BookingBox" data-place="ac3d9" data-lang="fr">
                <span>
                  En coopération avec{" "}
                  <a
                    href="http://easytable.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Système de réservation de restaurant et de réservation"
                  >
                    easyTable.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      */}
    </>
  );
}

const inputStyle = {
  flex: 1,
  minWidth: "160px",
  padding: "0.85rem 1rem",
  border: "1px solid #cfd4d3",
  borderRadius: "8px",
  font: "400 .85rem/1.2 Inter, sans-serif",
  background: "#fff",
  outline: "none",
};

const subjectInputStyle = {
  width: "100%",
  padding: "0.85rem 1rem",
  border: "1px solid #cfd4d3",
  borderRadius: "8px",
  font: "400 .85rem/1.2 Inter, sans-serif",
  background: "#fff",
  outline: "none",
};

export default App;
