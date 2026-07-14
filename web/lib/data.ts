import {
  Gamepad2,
  LayoutDashboard,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react"

export type Offering = {
  title: string
  description: string
}

export type Faq = {
  question: string
  answer: string
}

export type Pole = {
  slug: string
  number: string
  name: string
  shortName: string
  role: string
  icon: LucideIcon
  tagline: string
  lead: string
  description: string
  items: string[]
  offerings: Offering[]
  stats: { value: string; label: string }[]
  faq: Faq[]
}

export const POLES: Pole[] = [
  {
    slug: "agence-digitale",
    number: "01",
    name: "Agence Digitale",
    shortName: "Agence",
    role: "Pôle 01 · Transformation numérique",
    icon: MonitorSmartphone,
    tagline: "Votre présence en ligne, pensée pour convertir.",
    lead: "Nous accompagnons les PME et les entrepreneurs dans leur transformation numérique : sites web sur-mesure, identité visuelle, design produit et automatisation des process métier. Notre approche est proche de vous, rapide et rentable.",
    description:
      "L'Agence Digitale est le pôle historique du groupe. Nous concevons des sites et des identités de marque qui servent un objectif business clair : être trouvé, inspirer confiance et convertir. Chaque projet démarre par une phase d'écoute pour comprendre votre métier et vos contraintes, puis avance par livraisons courtes et mesurables — sans jargon, sans mois perdus.",
    items: [
      "Sites vitrines & e-commerce",
      "Identité de marque & UI/UX",
      "Automatisations & outils internes",
      "Stratégie de contenu & SEO local",
      "Maintenance & hébergement",
    ],
    offerings: [
      {
        title: "Sites vitrines & e-commerce",
        description:
          "Des sites rapides, élégants et pensés pour la conversion — de la vitrine simple à la boutique en ligne complète, avec paiement intégré.",
      },
      {
        title: "Identité de marque & UI/UX",
        description:
          "Logo, charte graphique, design d'interface : une identité cohérente qui inspire confiance sur tous vos supports.",
      },
      {
        title: "Automatisations & outils internes",
        description:
          "Devis, facturation, relances, tableaux de bord : nous automatisons les tâches répétitives pour vous faire gagner des heures chaque semaine.",
      },
      {
        title: "Stratégie de contenu & SEO local",
        description:
          "Être visible là où vos clients cherchent : référencement local, contenu utile et présence sociale structurée.",
      },
      {
        title: "Maintenance & hébergement",
        description:
          "Hébergement fiable, sauvegardes automatiques, mises à jour et support continu — votre site reste en ligne et performant.",
      },
    ],
    stats: [
      { value: "48 h", label: "Réponse garantie à toute demande" },
      { value: "2–6 sem.", label: "Délai type d'un projet site web" },
      { value: "100 %", label: "Projets livrés avec accompagnement" },
    ],
    faq: [
      {
        question: "Combien coûte un site web ?",
        answer:
          "Cela dépend du périmètre : une vitrine simple, un e-commerce et un outil métier n'ont pas le même budget. Après un premier échange (gratuit), vous recevez un devis détaillé et ferme sous 48 heures.",
      },
      {
        question: "Combien de temps dure un projet ?",
        answer:
          "Un site vitrine se livre généralement en 2 à 3 semaines, un e-commerce ou un outil sur-mesure en 4 à 6 semaines. Vous voyez des maquettes avant toute ligne de code, et des démos chaque semaine pendant le développement.",
      },
      {
        question: "Gérez-vous l'hébergement et la maintenance ?",
        answer:
          "Oui. Nous proposons des forfaits de maintenance mensuels incluant hébergement, sauvegardes, mises à jour de sécurité et petites évolutions.",
      },
    ],
  },
  {
    slug: "gaming-location",
    number: "02",
    name: "Gaming & Location",
    shortName: "Gaming",
    role: "Pôle 02 · Divertissement & événementiel",
    icon: Gamepad2,
    tagline: "Des expériences de jeu modernes, chez nous ou chez vous.",
    lead: "Des espaces de divertissement modernes et un service de location de consoles pour particuliers, anniversaires et événements d'entreprise. Une infrastructure stable, un staff formé, un cadre sécurisé.",
    description:
      "Le pôle Gaming & Location exploite des salles de jeu équipées des dernières consoles et propose un service de location clé en main pour vos événements. Anniversaires, tournois, team-building d'entreprise ou soirée entre amis : nous fournissons le matériel, l'installation et l'encadrement, pour que vous n'ayez qu'à jouer.",
    items: [
      "Salles de jeux PS5 / Xbox",
      "Tournois & soirées gaming",
      "Location courte durée (24 h+)",
      "Événementiel & activations",
      "Coin streaming & merchandising",
    ],
    offerings: [
      {
        title: "Salles de jeux PS5 / Xbox",
        description:
          "Des espaces confortables et climatisés, équipés en consoles dernière génération, écrans haute fréquence et manettes entretenues.",
      },
      {
        title: "Tournois & soirées gaming",
        description:
          "FIFA, Call of Duty, Street Fighter… Nous organisons des tournois avec lots, arbitrage et diffusion en direct.",
      },
      {
        title: "Location de consoles (24 h+)",
        description:
          "PS5 ou Xbox livrée et installée chez vous, avec manettes et sélection de jeux. Formules 24 h, week-end ou semaine.",
      },
      {
        title: "Événementiel & activations",
        description:
          "Animations gaming pour anniversaires, mariages, lancements de produit et événements d'entreprise — matériel et staff inclus.",
      },
      {
        title: "Streaming & merchandising",
        description:
          "Un coin streaming équipé pour créateurs de contenu, et une boutique d'accessoires et de produits dérivés.",
      },
    ],
    stats: [
      { value: "24 h+", label: "Durée minimale de location" },
      { value: "7 j/7", label: "Salles ouvertes toute la semaine" },
      { value: "Clé en main", label: "Livraison, installation, encadrement" },
    ],
    faq: [
      {
        question: "Comment réserver une console pour un événement ?",
        answer:
          "Contactez-nous par téléphone ou WhatsApp avec la date, la durée et le nombre d'invités. Nous confirmons la disponibilité et le tarif sous 24 heures, livraison et installation incluses.",
      },
      {
        question: "Que comprend la location ?",
        answer:
          "La console, deux manettes minimum, une sélection de jeux récents, les câbles, et si besoin un écran. L'installation sur place et une assistance téléphonique sont incluses.",
      },
      {
        question: "Organisez-vous des tournois privés ?",
        answer:
          "Oui — pour entreprises, écoles ou groupes d'amis. Nous gérons le format, le matériel, l'arbitrage et la remise des prix.",
      },
    ],
  },
  {
    slug: "saas-technologie",
    number: "03",
    name: "SaaS & Technologie",
    shortName: "SaaS",
    role: "Pôle 03 · Produit & ingénierie",
    icon: LayoutDashboard,
    tagline: "Le logiciel de gestion pensé pour les salles de jeu.",
    lead: "Un logiciel SaaS de gestion conçu pour les salles de jeu et leurs clients : suivi des consoles, sessions, paiements, fidélité et reporting. Conçu sur le terrain, éprouvé dans nos propres salles.",
    description:
      "Notre plateforme SaaS est née d'un besoin réel : gérer efficacement nos propres salles de jeu. Suivi des sessions en temps réel, encaissement, paiement mobile, programme de fidélité et reporting consolidé — tout est réuni dans une interface simple, utilisable sur téléphone comme sur ordinateur. Aujourd'hui, nous la mettons à disposition des autres opérateurs.",
    items: [
      "Gestion temps réel des sessions",
      "Caisse & paiement mobile",
      "Fidélité & CRM joueurs",
      "Reporting & analytics",
      "API ouverte & intégrations",
    ],
    offerings: [
      {
        title: "Gestion temps réel des sessions",
        description:
          "Visualisez chaque console, chaque session et chaque minute facturée en direct. Fini les cahiers et les pertes de revenus.",
      },
      {
        title: "Caisse & paiement mobile",
        description:
          "Encaissement intégré, compatible espèces et paiement mobile, avec journal de caisse automatique et clôtures quotidiennes.",
      },
      {
        title: "Fidélité & CRM joueurs",
        description:
          "Profils joueurs, points de fidélité, offres ciblées : transformez les visiteurs occasionnels en habitués.",
      },
      {
        title: "Reporting & analytics",
        description:
          "Chiffre d'affaires par console, heures de pointe, top clients — des tableaux de bord clairs pour piloter votre salle.",
      },
      {
        title: "API ouverte & intégrations",
        description:
          "Connectez la plateforme à vos outils existants grâce à une API documentée et des intégrations prêtes à l'emploi.",
      },
    ],
    stats: [
      { value: "Temps réel", label: "Suivi des consoles et sessions" },
      { value: "Multi-salle", label: "Gérez plusieurs sites depuis un compte" },
      { value: "Mobile first", label: "Utilisable sur n'importe quel téléphone" },
    ],
    faq: [
      {
        question: "Le logiciel fonctionne-t-il sans connexion stable ?",
        answer:
          "Oui. L'application est conçue pour tolérer les coupures : les sessions continuent d'être suivies localement et se synchronisent dès que la connexion revient.",
      },
      {
        question: "Puis-je l'essayer avant de m'engager ?",
        answer:
          "Oui, nous proposons une démonstration guidée puis une période d'essai sur vos propres données. Contactez-nous pour planifier une démo.",
      },
      {
        question: "Gère-t-il plusieurs salles ?",
        answer:
          "Oui, un même compte peut piloter plusieurs sites, avec un reporting consolidé et des droits d'accès par équipe.",
      },
    ],
  },
]

export function getPole(slug: string): Pole | undefined {
  return POLES.find((p) => p.slug === slug)
}

export const MARQUEE_ITEMS = [
  "Sites web sur-mesure",
  "Identité & Design",
  "Automatisation",
  "Salles de gaming",
  "Location de consoles",
  "Logiciel SaaS de gestion",
  "Stratégie digitale",
  "Marketing local",
]

export const PROCESS_STEPS = [
  {
    number: "/01",
    title: "Cadrage & écoute",
    description:
      "On comprend votre métier, vos contraintes, votre budget. On définit un objectif clair, mesurable, et un périmètre réaliste.",
  },
  {
    number: "/02",
    title: "Design & prototype",
    description:
      "Maquettes interactives, identité visuelle, validation rapide. Vous voyez le résultat avant qu'on développe une ligne de code.",
  },
  {
    number: "/03",
    title: "Build & livraison",
    description:
      "Développement par sprints courts, démos hebdo, code propre. Hébergement fiable, sauvegardes, mise en ligne accompagnée.",
  },
  {
    number: "/04",
    title: "Suivi & croissance",
    description:
      "Maintenance mensuelle, suivi des indicateurs, itérations. On grandit avec vous, pas après vous.",
  },
]

export const VISION_CELLS = [
  {
    label: "Vision",
    title: "Un écosystème digital intégré",
    description:
      "Bâtir un groupe intégré, rentable et scalable, capable d'accompagner durablement les PME et les nouvelles générations.",
  },
  {
    label: "Mission",
    title: "Démocratiser le digital & le gaming",
    description:
      "Offrir des solutions numériques accessibles et des expériences gaming modernes, qui favorisent la transformation digitale des jeunes et des petites entreprises.",
  },
  {
    label: "Positionnement",
    title: "Technologie, loisirs, entrepreneuriat",
    description:
      "Un écosystème inclusif qui combine trois pôles complémentaires — digital, gaming et SaaS — autour d'une même culture de la performance et de l'impact.",
  },
]

export const SITE_NAME = "SOUBA DIGITAL"
export const SITE_DESCRIPTION =
  "Groupe entrepreneurial qui combine agence digitale, salles de gaming avec location de consoles, et un SaaS de gestion. Trois pôles, une mission : rendre la transformation digitale et le divertissement accessibles, rentables et durables."
