export type Language = "en" | "es" | "it";

export type ProductTranslation = {
  name: string;
  materials: string;
  imageAlt: string;
};

export type Translation = {
  locale: string;
  code: string;
  languageLabel: string;
  announcement: string;
  menu: string;
  closeMenu: string;
  home: string;
  shop: string;
  story: string;
  craft: string;
  search: string;
  bag: string;
  heroEyebrow: string;
  heroTitle: [string, string];
  heroText: string;
  discoverCollection: string;
  collectionEyebrow: string;
  collectionTitle: string;
  viewAll: string;
  addToEdit: string;
  demoPrice: string;
  storyEyebrow: string;
  storyTitle: [string, string];
  quote: string;
  storyBody: string;
  discoverCraft: string;
  craftEyebrow: string;
  craftTitle: [string, string];
  craftBody: string;
  craftStats: [[string, string], [string, string]];
  journalEyebrow: string;
  journalTitle: [string, string];
  shopMood: string;
  newsletterEyebrow: string;
  newsletterTitle: [string, string];
  emailLabel: string;
  emailPlaceholder: string;
  join: string;
  newsletterNote: string;
  contactTitle?: string;
  contactIntro?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  sendMessage?: string;
  contactSuccess?: string;
  contactError?: string;
  explore: string;
  clientCare: string;
  follow: string;
  shopAll: string;
  shipping: string;
  careGuide: string;
  contact: string;
  previewCopyright: string;
  designedIn: string;
  privacyNotice: string;
  preview: string;
  close: string;
  yourEdit: string;
  searchEdit: string;
  searchProducts: string;
  searchPlaceholder: string;
  pieces: string;
  piece: string;
  add: string;
  emptyEdit: string;
  demoSubtotal: string;
  checkout: string;
  noPayment: string;
  quantityFor: string;
  addedToEdit: string;
  previewOnly: string;
  legal: {
    eyebrow: string;
    updated: string;
    sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  };
  products: Record<string, ProductTranslation>;
};

const sharedProducts = {
  en: {
    "demo-sol-tote": { name: "The Sol Tote", materials: "Handwoven palm · Italian leather", imageAlt: "Woven tote with dark leather trim on an ivory stone plinth" },
    "demo-mar-clutch": { name: "The Mar Clutch", materials: "Soft ivory leather", imageAlt: "Ivory leather shoulder bag photographed in warm natural light" },
    "demo-cielo-bag": { name: "The Cielo Bag", materials: "Cognac leather · Braided handle", imageAlt: "Cognac leather bag with braided handle on an ivory stone plinth" },
  },
  es: {
    "demo-sol-tote": { name: "El tote Sol", materials: "Palma tejida · Piel italiana", imageAlt: "Bolso tote tejido con ribete de piel oscura sobre un pedestal de piedra marfil" },
    "demo-mar-clutch": { name: "El clutch Mar", materials: "Piel marfil suave", imageAlt: "Bolso de hombro de piel marfil fotografiado con luz natural cálida" },
    "demo-cielo-bag": { name: "El bolso Cielo", materials: "Piel coñac · Asa trenzada", imageAlt: "Bolso de piel coñac con asa trenzada sobre un pedestal de piedra marfil" },
  },
  it: {
    "demo-sol-tote": { name: "La tote Sol", materials: "Palma intrecciata · Pelle italiana", imageAlt: "Borsa tote intrecciata con profili in pelle scura su un piedistallo in pietra avorio" },
    "demo-mar-clutch": { name: "La clutch Mar", materials: "Morbida pelle avorio", imageAlt: "Borsa a spalla in pelle avorio fotografata nella calda luce naturale" },
    "demo-cielo-bag": { name: "La borsa Cielo", materials: "Pelle cognac · Manico intrecciato", imageAlt: "Borsa in pelle cognac con manico intrecciato su un piedistallo in pietra avorio" },
  },
} satisfies Record<Language, Record<string, ProductTranslation>>;

export const translations: Record<Language, Translation> = {
  en: {
    locale: "en-US", code: "EN", languageLabel: "Language", announcement: "Preview · Shipping policy to be confirmed", menu: "Open navigation", closeMenu: "Close navigation", home: "Sachetto home", shop: "Shop", story: "Our story", craft: "The craft", search: "Search", bag: "Bag", heroEyebrow: "Handmade in San Diego", heroTitle: ["Made slowly.", "Carried everywhere."], heroText: "Modern heirlooms shaped by hand, where natural fibers meet supple leather and California light.", discoverCollection: "Discover the collection", collectionEyebrow: "Demo catalogue · 01", collectionTitle: "The Studio Edit", viewAll: "View all pieces", addToEdit: "Add to edit", demoPrice: "Demo price", storyEyebrow: "From the maker's hands · 02", storyTitle: ["A personal study", "in form and feeling."], quote: "“I wanted to create the kind of bag you reach for without thinking — then keep for years.”", storyBody: "Sachetto began with one silhouette, a few meters of leather and a belief that everyday pieces can still feel deeply special. Each design balances strength with softness, tradition with a distinctly modern ease.", discoverCraft: "Discover the craft", craftEyebrow: "The craft · 03", craftTitle: ["Beauty is", "in the details."], craftBody: "We select tactile materials that age with character: full-grain leathers, natural woven fibers and hardware chosen to last.", craftStats: [["demo hours of handwork", "to be confirmed"], ["demo maker detail", "to be confirmed"]], journalEyebrow: "Postcard from California", journalTitle: ["Soft structure,", "sun-warmed tones."], shopMood: "Shop the mood", newsletterEyebrow: "The studio letter", newsletterTitle: ["New pieces, private previews", "and notes from San Diego."], emailLabel: "Email address", emailPlaceholder: "Your email address", join: "Join", newsletterNote: "Preview form only — no data is sent or stored. Subscription terms to be confirmed.", explore: "Explore", clientCare: "Client care", follow: "Follow", shopAll: "Shop all", shipping: "Shipping & returns", careGuide: "Care guide", contact: "Contact", previewCopyright: "© 2026 Sachetto · Preview", designedIn: "Designed in San Diego, California", privacyNotice: "Privacy notice", preview: "Sachetto preview", close: "Close panel", yourEdit: "Your edit", searchEdit: "Search the edit", searchProducts: "Search products", searchPlaceholder: "Bag name or material", pieces: "demo pieces", piece: "demo piece", add: "Add", emptyEdit: "Your edit is empty.", demoSubtotal: "Demo subtotal", checkout: "Checkout available after commerce setup", noPayment: "No payment or order processing is connected.", quantityFor: "Quantity for", addedToEdit: "added to your edit", previewOnly: "Preview only · No email was submitted", legal: { eyebrow: "Sachetto legal", updated: "Last updated: September 19, 2026", sections: [
      { heading: "1. Identity of the controller", paragraphs: ["Sachetto, operator of this website, is based in San Diego, California, United States. The legal entity, registered address and privacy contact details are to be confirmed before launch."] },
      { heading: "2. Data we collect", paragraphs: ["When you contact us, we may collect your name, email address, telephone number, message contents and any information you choose to provide. We do not request sensitive personal data; please do not include it in free-text messages.", "When you visit the site, technical providers may process limited data such as IP address, date and time, requested URL, browser, device, operating system, referring page and security logs."] },
      { heading: "3. Purposes and legal bases", paragraphs: ["Where applicable, processing is based on requested pre-contractual steps, performance of a contract, legal obligations, legitimate interests or your consent."], bullets: ["Answer enquiries and communicate with you.", "Prepare requested quotations or other pre-contractual steps.", "Manage the professional relationship and provide services.", "Protect the site, prevent abuse or fraud and comply with legal obligations."] },
      { heading: "4. Processors, disclosures and transfers", paragraphs: ["The site is hosted by Vercel. Service providers may process data in the United States and other countries. We may disclose data where legally required, to protect rights or safety, or to professional advisers bound by confidentiality. We do not sell or rent personal data."] },
      { heading: "5. Retention and security", paragraphs: ["Enquiries that do not result in a contractual relationship are retained only as long as needed for their purpose and applicable legal obligations. Client records may be retained during the relationship and afterwards where required for legal, tax, contractual or claims obligations. We use reasonable administrative and technical safeguards, although no system is completely infallible."] },
      { heading: "6. Rights in Mexico", paragraphs: ["Under Mexico's Federal Law on Protection of Personal Data Held by Private Parties, you may exercise access, rectification, cancellation and objection rights (ARCO), withdraw consent or limit the use and disclosure of your data. The request process and contact details will be published once Sachetto's legal information is confirmed."] },
      { heading: "7. European rights", paragraphs: ["Where the General Data Protection Regulation applies, you may request access, correction, erasure, restriction, portability or objection; withdraw consent without affecting earlier processing; and complain to the supervisory authority where you live, work or where the alleged infringement occurred."] },
      { heading: "8. California residents' rights", paragraphs: ["To the extent the CCPA, as amended by the CPRA, applies, California residents may request to know, access, correct or delete personal information and receive information about its sources, purposes and recipients. We do not sell or share personal information for cross-context behavioural advertising."] },
      { heading: "9. Cookies and analytics", paragraphs: ["This preview does not currently submit newsletter data or run analytics. If analytics or non-essential cookies are introduced, they will load only after consent where required, and you will be able to change or withdraw that choice."] },
      { heading: "10. Children and changes", paragraphs: ["The site and services are not directed to children, and we do not knowingly collect their data. We may update this notice to reflect legal or processing changes; the current version and date will be published here."] },
    ] }, products: sharedProducts.en,
  },
  es: {
    locale: "es-MX", code: "ES", languageLabel: "Idioma", announcement: "Previsualización · Política de envíos por confirmar", menu: "Abrir navegación", closeMenu: "Cerrar navegación", home: "Inicio de Sachetto", shop: "Tienda", story: "Nuestra historia", craft: "La artesanía", search: "Buscar", bag: "Bolsa", heroEyebrow: "Hecho a mano en San Diego", heroTitle: ["Hecho despacio.", "Para llevarlo siempre."], heroText: "Piezas de hoy para el futuro, creadas a mano donde las fibras naturales se encuentran con la piel flexible y la luz de California.", discoverCollection: "Descubrir la colección", collectionEyebrow: "Catálogo demo · 01", collectionTitle: "La selección del estudio", viewAll: "Ver todas las piezas", addToEdit: "Añadir a la selección", demoPrice: "Precio demo", storyEyebrow: "De las manos de la creadora · 02", storyTitle: ["Un estudio personal", "de forma y emoción."], quote: "“Quería crear el bolso al que recurres sin pensarlo y que conservas durante años.”", storyBody: "Sachetto nació con una silueta, unos metros de piel y la convicción de que las piezas cotidianas pueden sentirse realmente especiales. Cada diseño equilibra fuerza y suavidad, tradición y una comodidad decididamente moderna.", discoverCraft: "Descubrir la artesanía", craftEyebrow: "La artesanía · 03", craftTitle: ["La belleza está", "en los detalles."], craftBody: "Elegimos materiales táctiles que envejecen con carácter: pieles de grano completo, fibras tejidas naturales y herrajes pensados para durar.", craftStats: [["horas demo de trabajo manual", "por confirmar"], ["detalle demo de la creadora", "por confirmar"]], journalEyebrow: "Postal desde California", journalTitle: ["Estructura suave,", "tonos bañados por el sol."], shopMood: "Comprar el estilo", newsletterEyebrow: "La carta del estudio", newsletterTitle: ["Nuevas piezas, adelantos privados", "y notas desde San Diego."], emailLabel: "Correo electrónico", emailPlaceholder: "Tu correo electrónico", join: "Unirse", newsletterNote: "Formulario de previsualización — no se envían ni almacenan datos. Condiciones de suscripción por confirmar.", explore: "Explorar", clientCare: "Atención al cliente", follow: "Síguenos", shopAll: "Ver todo", shipping: "Envíos y devoluciones", careGuide: "Guía de cuidado", contact: "Contacto", previewCopyright: "© 2026 Sachetto · Previsualización", designedIn: "Diseñado en San Diego, California", privacyNotice: "Aviso de privacidad", preview: "Previsualización de Sachetto", close: "Cerrar panel", yourEdit: "Tu selección", searchEdit: "Buscar en la selección", searchProducts: "Buscar productos", searchPlaceholder: "Nombre o material del bolso", pieces: "piezas demo", piece: "pieza demo", add: "Añadir", emptyEdit: "Tu selección está vacía.", demoSubtotal: "Subtotal demo", checkout: "Compra disponible después de configurar el comercio", noPayment: "No hay pagos ni procesamiento de pedidos conectado.", quantityFor: "Cantidad de", addedToEdit: "añadido a tu selección", previewOnly: "Solo previsualización · No se envió ningún correo", legal: { eyebrow: "Aviso legal de Sachetto", updated: "Última actualización: 19 de septiembre de 2026", sections: [
      { heading: "1. Identidad del responsable", paragraphs: ["Sachetto, operador de este sitio web, tiene su sede en San Diego, California, Estados Unidos. La entidad legal, el domicilio registrado y los datos de contacto de privacidad se confirmarán antes del lanzamiento."] },
      { heading: "2. Datos que recopilamos", paragraphs: ["Cuando nos contactas, podemos recopilar tu nombre, correo electrónico, teléfono, contenido del mensaje y cualquier información que decidas proporcionar. No solicitamos datos personales sensibles; no los incluyas en mensajes de texto libre.", "Al visitar el sitio, los proveedores técnicos pueden procesar datos limitados como dirección IP, fecha y hora, URL solicitada, navegador, dispositivo, sistema operativo y registros de seguridad."] },
      { heading: "3. Finalidades y bases legales", paragraphs: ["Cuando corresponde, el tratamiento se basa en pasos precontractuales solicitados, la ejecución de un contrato, obligaciones legales, intereses legítimos o tu consentimiento."], bullets: ["Responder consultas y comunicarnos contigo.", "Preparar presupuestos u otros pasos precontractuales solicitados.", "Gestionar la relación profesional y prestar servicios.", "Proteger el sitio, prevenir abusos o fraudes y cumplir obligaciones legales."] },
      { heading: "4. Encargados, divulgaciones y transferencias", paragraphs: ["El sitio está alojado por Vercel. Los proveedores de servicios pueden tratar datos en Estados Unidos y otros países. Podemos divulgar datos cuando lo exija la ley, para proteger derechos o seguridad, o a asesores profesionales sujetos a confidencialidad. No vendemos ni alquilamos datos personales."] },
      { heading: "5. Conservación y seguridad", paragraphs: ["Las consultas que no deriven en una relación contractual se conservan solo durante el tiempo necesario para su finalidad y las obligaciones legales aplicables. Los registros de clientes pueden conservarse durante la relación y después cuando sea necesario por motivos legales, fiscales, contractuales o de reclamaciones. Aplicamos medidas razonables de seguridad, aunque ningún sistema es infalible."] },
      { heading: "6. Derechos en México", paragraphs: ["Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, puedes ejercer los derechos de acceso, rectificación, cancelación y oposición (ARCO), retirar tu consentimiento o limitar el uso y divulgación de tus datos. El proceso y los datos de contacto se publicarán cuando se confirme la información legal de Sachetto."] },
      { heading: "7. Derechos europeos", paragraphs: ["Cuando aplique el Reglamento General de Protección de Datos, puedes solicitar acceso, corrección, supresión, limitación, portabilidad u oposición; retirar tu consentimiento sin afectar tratamientos anteriores y reclamar ante la autoridad de control correspondiente."] },
      { heading: "8. Derechos de residentes de California", paragraphs: ["En la medida en que aplique la CCPA, modificada por la CPRA, los residentes de California pueden solicitar conocer, acceder, corregir o eliminar información personal y recibir información sobre sus fuentes, finalidades y destinatarios. No vendemos ni compartimos información personal para publicidad conductual entre contextos."] },
      { heading: "9. Cookies y analítica", paragraphs: ["Esta previsualización no envía datos del boletín ni utiliza analítica actualmente. Si se introducen analíticas o cookies no esenciales, se activarán solo después del consentimiento cuando sea necesario, y podrás cambiar o retirar tu elección."] },
      { heading: "10. Menores y cambios", paragraphs: ["El sitio y los servicios no están dirigidos a menores y no recopilamos deliberadamente sus datos. Podemos actualizar este aviso para reflejar cambios legales o de tratamiento; la versión y fecha actuales se publicarán aquí."] },
    ] }, products: sharedProducts.es,
  },
  it: {
    locale: "it-IT", code: "IT", languageLabel: "Lingua", announcement: "Anteprima · Politica di spedizione da confermare", menu: "Apri navigazione", closeMenu: "Chiudi navigazione", home: "Home Sachetto", shop: "Shop", story: "La nostra storia", craft: "La lavorazione", search: "Cerca", bag: "Borsa", heroEyebrow: "Fatto a mano a San Diego", heroTitle: ["Creato lentamente.", "Da portare ovunque."], heroText: "Eredità contemporanee modellate a mano, dove le fibre naturali incontrano la pelle morbida e la luce della California.", discoverCollection: "Scopri la collezione", collectionEyebrow: "Catalogo demo · 01", collectionTitle: "La selezione dello studio", viewAll: "Vedi tutti i modelli", addToEdit: "Aggiungi alla selezione", demoPrice: "Prezzo demo", storyEyebrow: "Dalle mani della creatrice · 02", storyTitle: ["Uno studio personale", "di forma e sentimento."], quote: "“Volevo creare la borsa che scegli senza pensarci e che conservi per anni.”", storyBody: "Sachetto è nata da una silhouette, pochi metri di pelle e la convinzione che gli oggetti di ogni giorno possano sentirsi davvero speciali. Ogni design equilibra forza e morbidezza, tradizione e una disinvoltura decisamente moderna.", discoverCraft: "Scopri la lavorazione", craftEyebrow: "La lavorazione · 03", craftTitle: ["La bellezza è", "nei dettagli."], craftBody: "Selezioniamo materiali tattili che invecchiano con carattere: pelli pieno fiore, fibre naturali intrecciate e ferramenta scelta per durare.", craftStats: [["ore demo di lavoro manuale", "da confermare"], ["dettaglio demo della creatrice", "da confermare"]], journalEyebrow: "Cartolina dalla California", journalTitle: ["Struttura morbida,", "toni scaldati dal sole."], shopMood: "Scopri lo stile", newsletterEyebrow: "La lettera dello studio", newsletterTitle: ["Nuovi modelli, anteprime private", "e note da San Diego."], emailLabel: "Indirizzo email", emailPlaceholder: "Il tuo indirizzo email", join: "Iscriviti", newsletterNote: "Solo anteprima — nessun dato viene inviato o memorizzato. Termini di iscrizione da confermare.", explore: "Esplora", clientCare: "Assistenza clienti", follow: "Seguici", shopAll: "Tutti i modelli", shipping: "Spedizioni e resi", careGuide: "Guida alla cura", contact: "Contatti", previewCopyright: "© 2026 Sachetto · Anteprima", designedIn: "Progettato a San Diego, California", privacyNotice: "Informativa sulla privacy", preview: "Anteprima Sachetto", close: "Chiudi pannello", yourEdit: "La tua selezione", searchEdit: "Cerca nella selezione", searchProducts: "Cerca prodotti", searchPlaceholder: "Nome o materiale della borsa", pieces: "modelli demo", piece: "modello demo", add: "Aggiungi", emptyEdit: "La tua selezione è vuota.", demoSubtotal: "Subtotale demo", checkout: "Acquisto disponibile dopo la configurazione e-commerce", noPayment: "Nessun pagamento o ordine è collegato.", quantityFor: "Quantità di", addedToEdit: "aggiunto alla tua selezione", previewOnly: "Solo anteprima · Nessuna email è stata inviata", legal: { eyebrow: "Informativa Sachetto", updated: "Ultimo aggiornamento: 19 settembre 2026", sections: [
      { heading: "1. Identità del titolare", paragraphs: ["Sachetto, gestore di questo sito web, ha sede a San Diego, California, Stati Uniti. L'entità legale, l'indirizzo registrato e i dati di contatto per la privacy saranno confermati prima del lancio."] },
      { heading: "2. Dati raccolti", paragraphs: ["Quando ci contatti, possiamo raccogliere nome, indirizzo email, numero di telefono, contenuto del messaggio e qualsiasi informazione tu scelga di fornire. Non richiediamo dati personali sensibili; non inserirli nei messaggi a testo libero.", "Quando visiti il sito, i fornitori tecnici possono trattare dati limitati come indirizzo IP, data e ora, URL richiesto, browser, dispositivo, sistema operativo e registri di sicurezza."] },
      { heading: "3. Finalità e basi giuridiche", paragraphs: ["Ove applicabile, il trattamento si basa su attività precontrattuali richieste, esecuzione di un contratto, obblighi di legge, legittimi interessi o consenso."], bullets: ["Rispondere alle richieste e comunicare con te.", "Preparare preventivi o altre attività precontrattuali richieste.", "Gestire il rapporto professionale e fornire servizi.", "Proteggere il sito, prevenire abusi o frodi e rispettare gli obblighi di legge."] },
      { heading: "4. Responsabili, comunicazioni e trasferimenti", paragraphs: ["Il sito è ospitato da Vercel. I fornitori di servizi possono trattare dati negli Stati Uniti e in altri Paesi. Possiamo comunicare dati quando richiesto dalla legge, per proteggere diritti o sicurezza, o a consulenti professionali vincolati alla riservatezza. Non vendiamo né affittiamo dati personali."] },
      { heading: "5. Conservazione e sicurezza", paragraphs: ["Le richieste che non portano a un rapporto contrattuale vengono conservate solo per il tempo necessario alla loro finalità e agli obblighi di legge applicabili. I dati dei clienti possono essere conservati durante il rapporto e successivamente quando necessario per obblighi legali, fiscali, contrattuali o relativi a controversie. Adottiamo misure ragionevoli di sicurezza, sebbene nessun sistema sia completamente infallibile."] },
      { heading: "6. Diritti in Messico", paragraphs: ["Ai sensi della legge federale messicana sulla protezione dei dati personali detenuti da privati, puoi esercitare i diritti di accesso, rettifica, cancellazione e opposizione (ARCO), revocare il consenso o limitare l'uso e la comunicazione dei tuoi dati. La procedura e i contatti saranno pubblicati quando le informazioni legali di Sachetto saranno confermate."] },
      { heading: "7. Diritti europei", paragraphs: ["Quando si applica il Regolamento generale sulla protezione dei dati, puoi richiedere accesso, rettifica, cancellazione, limitazione, portabilità od opposizione; revocare il consenso senza pregiudicare i trattamenti precedenti e presentare reclamo all'autorità di controllo competente."] },
      { heading: "8. Diritti dei residenti in California", paragraphs: ["Nella misura in cui si applica il CCPA, come modificato dal CPRA, i residenti in California possono richiedere di conoscere, accedere, correggere o eliminare le informazioni personali e ricevere informazioni sulle loro fonti, finalità e destinatari. Non vendiamo né condividiamo informazioni personali per pubblicità comportamentale tra contesti."] },
      { heading: "9. Cookie e analisi", paragraphs: ["Questa anteprima non invia dati della newsletter e attualmente non utilizza strumenti di analisi. Se verranno introdotti strumenti di analisi o cookie non essenziali, saranno attivati solo dopo il consenso quando richiesto e potrai modificare o revocare la tua scelta."] },
      { heading: "10. Minori e modifiche", paragraphs: ["Il sito e i servizi non sono rivolti ai minori e non raccogliamo consapevolmente i loro dati. Potremmo aggiornare questa informativa per riflettere modifiche legali o del trattamento; la versione e la data correnti saranno pubblicate qui."] },
    ] }, products: sharedProducts.it,
  },
};
