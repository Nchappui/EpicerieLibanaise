import "./App.css";

const menuData = {
  starters: [
    {
      name: "Hommos Traditionnel",
      desc: "Purée de pois chiches, tahini, citron, huile d'olive",
      price: "9",
    },
    {
      name: "Moutabal",
      desc: "Aubergine fumée, tahini, mélasse de grenade",
      price: "10",
    },
    {
      name: "Taboulé",
      desc: "Persil frais, boulgour fin, tomate, citron",
      price: "11",
    },
  ],
  mains: [
    {
      name: "Chawarma de Poulet",
      desc: "Mariné 24h, sauce aïl, cornichons maison",
      price: "24",
    },
    {
      name: "Kafta Grillée",
      desc: "Bœuf & agneau épicés, herbes fraîches, sumac",
      price: "26",
    },
    {
      name: "Saumon Za'atar",
      desc: "Croûte d'épices, citron confit, huile d'argan",
      price: "29",
    },
  ],
  desserts: [
    {
      name: "Baklava Pistache",
      desc: "Feuilletage fin, pistaches, sirop de fleur d'oranger",
      price: "9",
    },
    {
      name: "Mouhallabié",
      desc: "Flan lait & fleur d'oranger, sirop rose, pistache",
      price: "8",
    },
    {
      name: "Halva Chocolat",
      desc: "Sésame, cacao, éclats de noisette",
      price: "9",
    },
  ],
  drinks: [
    {
      name: "Thé à la Menthe Fraîche",
      desc: "Infusion légère & parfumée",
      price: "5",
    },
    {
      name: "Jus Grenade Pressé",
      desc: "Pur, acidulé & antioxydant",
      price: "8",
    },
    {
      name: "Cocktail Maison",
      desc: "Création signature selon la saison",
      price: "14",
    },
  ],
};

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
  return (
    <>
      <nav className="site-nav" aria-label="Main Navigation">
        <div className="nav-inner">
          <a href="#reservation" className="brand">
            Épicerie Libanaise
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
              <a href="#location" className="nav-cta">
                Localisation
              </a>
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
            "linear-gradient(120deg,rgba(20,20,18,.75),rgba(25,27,25,.6)),url(https://images.unsplash.com/photo-1600891963920-bb3a8d0f4d9e?auto=format&fit=crop&w=1600&q=60) center/cover",
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
              href="https://example.com/book"
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
              href="https://example.com/order"
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
            Cuisine de partage, élégance méditerranéenne, ingrédients
            d'exception & épices chaleureuses. Une expérience culinaire raffinée
            au cœur de la ville.
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
          <div className="menu-grid">
            <MenuCategory title="Entrées" items={menuData.starters} />
            <MenuCategory title="Plats" items={menuData.mains} />
            <MenuCategory title="Desserts" items={menuData.desserts} />
            <MenuCategory title="Boissons" items={menuData.drinks} />
          </div>
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
              <p style={{ fontWeight: 600 }}>+33 1 23 45 67 89</p>
              <p style={{ marginTop: "1rem" }} className="muted">
                Email
              </p>
              <p style={{ fontWeight: 600 }}>contact@epicerielibanaise.fr</p>
              <p style={{ marginTop: "1rem" }} className="muted">
                Adresse
              </p>
              <p style={{ fontWeight: 600 }}>12 Rue des Saveurs, 75000 Paris</p>
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
                style={inputStyle}
              />
              <textarea
                required
                placeholder="Message"
                aria-label="Message"
                rows={5}
                style={inputStyle}
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
                    <span>11:30 - 22:00</span>
                  </li>
                  <li>
                    <span>Mar</span>
                    <span>11:30 - 22:00</span>
                  </li>
                  <li>
                    <span>Mer</span>
                    <span>11:30 - 22:00</span>
                  </li>
                  <li>
                    <span>Jeu</span>
                    <span>11:30 - 23:00</span>
                  </li>
                  <li>
                    <span>Ven</span>
                    <span>11:30 - 23:30</span>
                  </li>
                  <li>
                    <span>Sam</span>
                    <span>10:30 - 23:30</span>
                  </li>
                  <li>
                    <span>Dim</span>
                    <span>10:30 - 21:30</span>
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
                    href="https://instagram.com"
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
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.42-3.68 3.58-3.68 1.04 0 2.12.19 2.12.19v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.9h-2.22V22c4.78-.8 8.44-4.94 8.44-9.93Z" />
                    </svg>
                  </a>
                  <a
                    aria-label="TikTok"
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.5 3c.3 2.1 1.6 3.9 3.6 4v3.1c-1.3.1-2.5-.3-3.6-.9v4.7a5.4 5.4 0 1 1-5.4-5.4c.2 0 .5 0 .7.1v3.2a2.1 2.1 0 1 0 1.5 2V3h3.2Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="fade-in map-wrapper">
              <iframe
                title="Localisation du restaurant"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999709321095!2d2.292292615674671!3d48.858373079287204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDjCsDUxJzMwLjIiTiAywrAxNSczNi4yIkU!5e0!3m2!1sfr!2sfr!4v1616161616161"
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

export default App;
