import { useState, useEffect } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);

  // Mes projets
  const projects = [
    {
      id: 1,
      title: "Journée Porte Ouverte",
      image: "/images/portfolio/jpo.png",
      descriptionMinimal:
        "Application web pour la Journée Portes Ouvertes du Lycée René Cassin Strasbourg qui à pour objectif de permettre aux personnes intéressées par les formations proposées par le lycée de donner leur avis et de fournir des statistiques pour chaque formation.",
      descriptionSupplementaire:
        "Projet développée dans le cadre de ma formation de BTS SIO de 2 manières. La première en PHP Native pour comprendre les fondamentaux du PHP puis la seconde à l'aide d'un framework CodeIgniter (MVC).",
      technologies: ["PHP", "CodeIgniter", "MySQL", "Xampp"],
      github: "https://github.com/Aboubakr67/JPO",
      website: null,
    },
    {
      id: 2,
      title: "CRIÉE",
      image: "/images/portfolio/criee.png",
      descriptionMinimal:
        "Application web, appelée CRIÉE, permet la vente aux enchères de produits de la mer, notamment des poissons, crustacés, fruits de mer, et plus encore. Son objectif principal est de faciliter la vente de ces produits, en permettant aux vendeurs de les proposer aux acheteurs, qu'ils soient des particuliers, des professionnels, des restaurateurs ou des acteurs de la grande distribution.",
      descriptionSupplementaire:
        "Projet réalisé en collaboration dans le cadre de ma formation en BTS SIO.",
      technologies: ["PHP", "CodeIgniter", "MySQL", "Xampp"],
      github: "https://github.com/Aboubakr67/CONTEXTE_CRIEE",
      website: null,
    },
    {
      id: 3,
      title: "Crédit Celeste",
      image: "/images/portfolio/credit-celeste.png",
      descriptionMinimal:
        "Le logiciel Crédit Celeste, conçu dans le cadre de mon BTS SIO, est une application Windows qui vise à simplifier le processus de demande de crédit pour l'achat de voitures neuves ou d'occasion. Les utilisateurs peuvent soumettre leur demande de crédit directement en concession ou garage partenaires.",
      descriptionSupplementaire: "",
      technologies: ["C#", "SQL Server"],
      github: "https://github.com/Aboubakr67/CreditCeleste",
      website: null,
    },
    {
      id: 4,
      title: "AKEAD TECH",
      image: "/images/portfolio/akead-tech.png",
      descriptionMinimal:
        "Akead Tech est une application web conçue pour une gestion plus efficace des tâches hebdomadaires grâce à un système de catégorisation par couleur (vert pour 'faites', orange pour 'en cours', rouge pour 'urgent' et bleu pour 'non faites'). Les tâches sont affichées sur le calendrier pour une meilleure visibilité, et l'application se démarque de Google Agenda en étant parfaitement adaptée aux exigences particulières de l'entreprise, en synergie avec son cadre professionnel. Différentes options de calendriers sont proposées : quotidien, hebdomadaire, mensuel.",
      descriptionSupplementaire:
        "Le projet se compose de plusieurs pages, dont l'accueil, les tâches, la location et un mode admin. Il a été développé en collaboration avec un autre stagiaire lors de mon stage de première année de BTS SIO. Pour ce faire, nous avons utilisé le framework Symfony 5.4.18, et les données sont stockées dans une base de données MySQL, qui fonctionne sur le serveur XAMPP avec PHP version 8. L'accès au site web est réservé exclusivement à l'entreprise.",
      technologies: ["Symfony", "MySQL"],
      github: null,
      website: null,
    },
    {
      id: 5,
      title: "Akead Tech Mobile",
      image: "/images/portfolio/akead-tech-mobile.png",
      descriptionMinimal:
        "Akead Tech Mobile est une application mobile disponible sur les plateformes iOS et Android, partageant la même approche que l'application web Akead Tech. Elle vise à faciliter la gestion des tâches hebdomadaires en utilisant un système de codage couleur (vert pour 'faites', orange pour 'en cours', rouge pour 'urgent' et bleu pour 'non faites'). Cette version mobile complète le site web.",
      descriptionSupplementaire:
        "L'accès à l'application mobile est strictement réservé à l'entreprise.",
      technologies: ["Flutter", "Dart", "Symfony"],
      github: null,
      website: null,
    },
    {
      id: 6,
      title: "Click & Eat",
      image: "/images/portfolio/click_and_eat.png",
      descriptionMinimal:
        "Borne de fast food interactive permettant aux clients de passer leurs commandes de manière autonome. L'objectif principal de cette borne est de réduire le temps d'attente des clients en leur offrant une expérience de commande rapide et efficace, tout en minimisant les interactions humaines.",
      descriptionSupplementaire:
        "Le projet a été développé en collaboration avec une personne durant mon Bachelor CDA. Temps de réalisation : 4 jours",
      technologies: ["PHP", "MySQL", "Docker", "Figma"],
      github: null,
      website: null,
    },
    {
      id: 7,
      title: "Snack Game",
      image: "/images/portfolio/snake_game.png",
      descriptionMinimal:
        "Snake Game est un jeu classique où le joueur contrôle un serpent qui grandit en mangeant des objets tout en évitant de se heurter aux murs ou à lui-même. L'objectif est de réaliser le meilleur score possible en collectant des objets et en survivant le plus longtemps possible.",
      descriptionSupplementaire:
        "Le projet a été développé durant mon Bachelor CDA lors de la semaine evoquant la POO.",
      technologies: ["JS"],
      github: "https://github.com/Aboubakr67/snake_game_js",
      website: "https://aboubakr67.github.io/snake_game_js/game.html",
    },
    {
      id: 8,
      title: "Chatty App",
      image: "/images/portfolio/chat_app.png",
      descriptionMinimal:
        "Chatty est une application de messagerie en temps réel qui permet aux utilisateurs de communiquer instantanément via des messages texte. L'application offre une interface conviviale où les utilisateurs peuvent envoyer et recevoir des messages, créer des groupes de discussion, et partager des fichiers multimédias.",
      descriptionSupplementaire: "",
      technologies: ["React JS", "NodeJS", "Express", "Socket.io"],
      github: null,
      website: null,
    },
  ];

  // Mes compétences
  const skills = {
    Frontend: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
    ],
    Backend: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      {
        name: "Spring Boot",
        icon: "https://cdn.simpleicons.org/springboot/6DB33F",
      },
      { name: "Express", icon: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Symfony", icon: "https://cdn.simpleicons.org/symfony/FFFFFF" },
    ],
    Database: [
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
    ],
    Outils: [
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      {
        name: "Kubernetes",
        icon: "https://cdn.simpleicons.org/kubernetes/blue",
      },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
    ],
  };

  // Mes expérience professionnelle
  const experiences = [
    {
      title: "Développeur Full Stack",
      company: "Trybatec",
      period: "2024 - Présent",
      description:
        "Développement du portail web (React js / Spring boot) et application mobile (React Native Expo).",
      logo: "/images/trybatec.jpg",
      color: "from-green-500 to-emerald-500",
      typeEmploi: "Alternance",
    },
    {
      title: "Développeur Full Stack",
      company: "Sevilog",
      period: "01/2023 - 03/2023",
      description:
        "Conception d'une application mobile avec Flutter pour la gestion des tâches hebdomadaires des employés, utilisant Symfony comme backend pour les API et la base de données.",
      logo: "/images/sevilog.jpeg",
      color: "from-purple-500 to-pink-500",
      typeEmploi: "Stage",
    },
    {
      title: "Développeur Full Stack",
      company: "Sevilog",
      period: "05/2022 - 07/2022",
      description:
        "Développement d'un site web de gestion des tâches hebdomadaires pour les employés de l'entreprise, en utilisant le framework Symfony.",
      logo: "/images/sevilog.jpeg",
      color: "from-cyan-500 to-blue-500",
      typeEmploi: "Stage",
    },
  ];

  // Gestion du scroll pour la navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "skills",
        "portfolio",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Désactive le bouton pendant l'envoi
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = "<span>Envoi en cours...</span>";

    try {
      const response = await fetch("https://email-serveur.akrzen.cloud/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Succès
        setNotification({
          type: "success",
          message: "Message envoyé avec succès !",
        });
        setTimeout(() => setNotification(null), 5000);

        // Reset du formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        // Erreur du serveur
        setNotification({
          type: "error",
          message: data.error || "Une erreur est survenue",
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      // Erreur réseau
      console.error("Erreur:", error);
      setNotification({
        type: "error",
        message:
          data.error ||
          "❌ Impossible de contacter le serveur. Vérifiez que le backend est lancé.",
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      // Réactive le bouton
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Navigation Moderne */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo avec effet */}
            <div
              className="relative group cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent px-4 py-2">
                <img
                  src={"../images/developer.png"}
                  alt="Developer"
                  className="w-8 h-8"
                />
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {[
                "home",
                "about",
                "experience",
                "skills",
                "portfolio",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 rounded-lg transition-all ${
                    activeSection === section
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {activeSection === section && (
                    <span className="absolute inset-0 bg-cyan-500/10 rounded-lg"></span>
                  )}
                  <span className="relative capitalize">
                    {section === "home"
                      ? "Accueil"
                      : section === "about"
                      ? "À propos"
                      : section === "experience"
                      ? "Expérience"
                      : section === "skills"
                      ? "Compétences"
                      : section}
                  </span>
                </button>
              ))}
            </div>

            {/* Menu Hamburger Mobile */}
            <button
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Menu Mobile Overlay */}
        <div
          className={`md:hidden fixed top-64 left-0 right-0 bottom-0 bg-black backdrop-blur-xl transition-all ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {[
              "home",
              "about",
              "experience",
              "skills",
              "portfolio",
              "contact",
            ].map((section, idx) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-3xl font-bold text-slate-400 hover:text-cyan-400 transition-all"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {section === "home"
                  ? "Accueil"
                  : section === "about"
                  ? "À propos"
                  : section === "experience"
                  ? "Expérience"
                  : section === "skills"
                  ? "Compétences"
                  : section === "portfolio"
                  ? "Portfolio"
                  : section === "contact"
                  ? "Contact"
                  : section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Section Accueil */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[120px]"
      >
        {/* Background animé */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Grille en arrière-plan */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  5 + Math.random() * 10
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Titre principal avec effet typographie */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 animate-fade-in">
            {/* <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Salut, je suis
            </span> */}
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              Aboubakr ZENNIR
            </span>
          </h1>

          {/* Sous-titre avec effet machine à écrire */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="text-2xl md:text-4xl text-slate-300 font-light">
              Développeur
            </span>
            <span className="w-2 h-8 bg-cyan-400 animate-pulse"></span>
            <span className="text-2xl md:text-4xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
              Full Stack
            </span>
          </div>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Je crée des{" "}
            <span className="text-cyan-400 font-semibold">expériences web</span>{" "}
            modernes, performantes et{" "}
            <span className="text-blue-400 font-semibold">mémorables</span>.
            Passionné par l'innovation et le code clean.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("portfolio")}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Découvrir mes projets
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-4 border-2 border-cyan-500/50 rounded-full font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all backdrop-blur-sm flex items-center gap-2"
            >
              Me contacter
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-10 ">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                3+
              </div>
              <div className="text-slate-400 text-sm">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-slate-400 text-sm">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-slate-400 text-sm">Client satisfaits</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              À propos de moi
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-slate-300 leading-relaxed">
                Développeur Full Stack passionné avec{" "}
                <span className="text-cyan-400 font-semibold">
                  3+ années d'expérience
                </span>{" "}
                dans la création d'applications web robustes et performantes.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Je me spécialise dans le développement{" "}
                <span className="text-cyan-400 font-medium">Full Stack</span>{" "}
                avec <span className="text-blue-400 font-medium">React</span>{" "}
                côté frontend et{" "}
                <span className="text-green-400 font-medium">
                  Java Spring Boot
                </span>{" "}
                côté backend. Ma polyvalence me permet également de travailler
                efficacement avec <span className="font-medium">Node.js</span>,{" "}
                <span className="font-medium">Express</span>,{" "}
                <span className="font-medium">Symfony</span> et d'autres
                technologies modernes.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                J'aime concevoir des architectures scalables et transformer des
                besoins complexes en solutions élégantes. Toujours en quête de
                nouveaux défis techniques pour élargir mes compétences et rester
                à la pointe des technologies web.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400">
                      Mission
                    </h3>
                    <p className="text-slate-400">
                      Créer des expériences web exceptionnelles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">
                    💡
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">
                      Passion
                    </h3>
                    <p className="text-slate-400">
                      Innovation et apprentissage continu
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">
                      Objectif
                    </h3>
                    <p className="text-slate-400">
                      Excellence dans chaque projet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Expérience */}
      <section
        id="experience"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Mon Parcours
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg">
            Une évolution constante dans le développement web
          </p>

          <div className="relative">
            {/* Ligne verticale centrale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8`}
                >
                  {/* Contenu */}
                  <div className="w-full md:w-5/12">
                    <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 transform hover:scale-105">
                      {/* Indicateur de gradient */}
                      <div
                        className={`absolute top-0 ${
                          index % 2 === 0 ? "right-0" : "left-0"
                        } w-1 h-full bg-gradient-to-b ${
                          exp.color
                        } rounded-r-2xl`}
                      ></div>

                      {/* Badge période et type d'emploi */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800 rounded-full text-sm text-slate-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {exp.period}
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                            exp.typeEmploi === "CDI"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : exp.typeEmploi === "CDD"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : exp.typeEmploi === "Alternance"
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                              : exp.typeEmploi === "Stage"
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {exp.typeEmploi}
                        </div>
                      </div>

                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          {/* Container du logo avec effet gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${exp.color} rounded-2xl blur-md opacity-50`}
                          ></div>
                          <div className="relative w-20 h-20 bg-white rounded-2xl p-2 shadow-lg">
                            <img
                              src={exp.logo}
                              alt={`Logo ${exp.company}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Fallback si l'image ne charge pas
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                  '<div class="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-800">🏢</div>';
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-cyan-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-400 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Hover effect arrow */}
                      <div
                        className={`absolute top-1/2 ${
                          index % 2 === 0 ? "-right-3" : "-left-3"
                        } transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <div
                          className={`w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center ${
                            index % 2 === 0 ? "rotate-0" : "rotate-180"
                          }`}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Point central */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center border-4 border-slate-950`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Espace vide pour l'alignement */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Compétences avec Icônes */}
      <section
        id="skills"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Compétences Techniques
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg">
            Les technologies que je maîtrise pour donner vie à vos projets
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={index}
                className="group bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Header de catégorie */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                    {index === 0
                      ? "🎨"
                      : index === 1
                      ? "⚙️"
                      : index === 2
                      ? "💾"
                      : "🛠️"}
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {category}
                  </h3>
                </div>

                {/* Grille de compétences */}
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill, idx) => (
                    <div
                      key={idx}
                      className="group/skill relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30 transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icône SVG */}
                        <div className="w-10 h-10 flex-shrink-0 group-hover/skill:scale-110 transition-transform">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // Fallback si l'icône ne charge pas
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-300 font-medium group-hover/skill:text-cyan-400 transition-colors truncate">
                            {skill.name}
                          </p>
                        </div>
                      </div>

                      {/* Barre de progression au hover */}
                      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden opacity-0 group-hover/skill:opacity-100 transition-opacity">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-progress"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section bonus - Apprentissage continu */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full">
              <span className="text-2xl">📚</span>
              <span className="text-slate-300">
                Toujours en apprentissage de nouvelles technologies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Portfolio */}
      <section
        id="portfolio"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projets Réalisés
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg">
            Une sélection de mes meilleurs travaux
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="group cursor-pointer relative bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-[1.02]"
              >
                {/* Image avec overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  {/* Badge numéro */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Bouton "Voir le projet" au hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                      Voir le projet
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                    {project.descriptionMinimal}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Indicateurs liens */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-slate-800">
                    {project.github && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Code
                      </div>
                    )}
                    {project.website && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Demo
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact avec Formulaire */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-20 px-6"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Contactez-moi
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-12 text-lg">
            Un projet en tête ? Discutons-en !
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Restons connectés
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Email</p>
                      <a
                        href="mailto:aboubakr.zennir@gmail.com"
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        aboubakr.zennir@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Localisation
                      </p>
                      <p className="text-white">Strasbourg, France</p>
                    </div>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <p className="text-slate-400 text-sm mb-4">Suivez-moi</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/aboubakr-zennir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-cyan-500 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/Aboubakr67"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-cyan-500 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Envoyez un message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prénom et Nom */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-400 mb-2"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="Prénom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-400 mb-2"
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="Nom"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Objet */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Objet du message *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Demande de projet"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="Bonjour, j'aimerais discuter d'un projet..."
                  ></textarea>
                </div>

                {/* Bouton Submit */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Envoyer le message</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {/* Notification Toast */}
                {notification && (
                  <div
                    className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl animate-fade-in ${
                      notification.type === "success"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {notification.type === "success" ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span className="font-semibold">
                        {notification.message}
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-400">
              © 2025 Aboubakr ZENNIR. Tous droits réservés.
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/aboubakr-zennir/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/Aboubakr67"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="mailto:aboubakr.zennir@gmail.com"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-3xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-800 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {selectedProject.title}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {selectedProject.descriptionMinimal}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {selectedProject.descriptionSupplementaire}
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">
                  Technologies utilisées
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-slate-800 rounded-full text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Voir sur GitHub
                  </a>
                )}
                {selectedProject.website && (
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visiter le site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
