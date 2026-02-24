import { Movie } from './types';

// Public domain movie streams for demonstration
const STREAMS = {
  TEARS_OF_STEEL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  SINTEL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  BIG_BUCK_BUNNY: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ELEPHANTS_DREAM: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  COSMOS: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
};

export const HERO_MOVIE: Movie = {
  id: 0,
  title: "L'Odyssée Stellaire (Tears of Steel)",
  description: "Dans un futur lointain, un équipage d'explorateurs voyage à travers un trou de ver pour assurer la survie de l'humanité. Une épopée visuelle époustouflante qui défie le temps et l'espace.",
  thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg",
  coverUrl: "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
  videoUrl: STREAMS.TEARS_OF_STEEL,
  genre: "Science-Fiction",
  rating: "98% Recommandé",
  year: 2024,
  duration: "2h 14m"
};

export const ACTION_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Cyber Lapin (Big Buck Bunny)",
    description: "Un gros lapin navigue dans les bas-fonds d'une forêt dangereuse.",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg",
    coverUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
    videoUrl: STREAMS.BIG_BUCK_BUNNY,
    genre: "Action",
    rating: "95%",
    year: 2023,
    duration: "1h 45m 12s"
  },
  {
    id: 4,
    title: "Vitesse Absolue",
    description: "Des courses de voitures illégales à travers l'Europe.",
    thumbnailUrl: "https://picsum.photos/seed/speed/600/340",
    coverUrl: "https://picsum.photos/seed/speed/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Action",
    rating: "85%",
    year: 2023,
    duration: "2h 05m"
  },
  {
    id: 11,
    title: "Traque Nocturne",
    description: "Un ex-agent des forces spéciales doit protéger un témoin clé.",
    thumbnailUrl: "https://picsum.photos/seed/hunt/600/340",
    coverUrl: "https://picsum.photos/seed/hunt/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Action",
    rating: "92%",
    year: 2024,
    duration: "1h 58m"
  },
  {
    id: 12,
    title: "Le Dernier Rempart",
    description: "Une forteresse assiégée par des forces ennemies écrasantes.",
    thumbnailUrl: "https://picsum.photos/seed/fort/600/340",
    coverUrl: "https://picsum.photos/seed/fort/1200/675",
    videoUrl: STREAMS.SINTEL,
    genre: "Action",
    rating: "89%",
    year: 2022,
    duration: "2h 10m"
  },
  {
    id: 105,
    title: "Opération Tempête",
    description: "Une unité d'élite doit infiltrer une base ennemie lors d'un ouragan dévastateur.",
    thumbnailUrl: "https://picsum.photos/seed/storm/600/340",
    coverUrl: "https://picsum.photos/seed/storm/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Action",
    rating: "93%",
    year: 2023,
    duration: "1h 45m 24s"
  },
  {
    id: 106,
    title: "Course Contre la Montre",
    description: "Un détective a 24 heures pour retrouver une bombe cachée dans la ville.",
    thumbnailUrl: "https://picsum.photos/seed/clock/600/340",
    coverUrl: "https://picsum.photos/seed/clock/1200/675",
    videoUrl: STREAMS.BIG_BUCK_BUNNY,
    genre: "Action",
    rating: "88%",
    year: 2022,
    duration: "1h 52m 10s"
  }
];

export const COMEDY_MOVIES: Movie[] = [
  {
    id: 6,
    title: "Rêve d'Éléphant",
    description: "L'histoire étrange de deux personnages dans une machine complexe.",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_poster.jpg/800px-Elephants_Dream_poster.jpg",
    coverUrl: "https://orange.blender.org/wp-content/themes/orange/images/media/gallery/s1_proog.jpg",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Comédie",
    rating: "88%",
    year: 2024,
    duration: "1h 45m 53s"
  },
  {
    id: 21,
    title: "Mariage Catastrophe",
    description: "Un mariage où tout ce qui peut mal tourner, tourne mal.",
    thumbnailUrl: "https://picsum.photos/seed/wedding/600/340",
    coverUrl: "https://picsum.photos/seed/wedding/1200/675",
    videoUrl: STREAMS.BIG_BUCK_BUNNY,
    genre: "Comédie",
    rating: "85%",
    year: 2023,
    duration: "1h 42m"
  },
  {
    id: 22,
    title: "Les Potes en Vacances",
    description: "Un road trip hilarant à travers le pays.",
    thumbnailUrl: "https://picsum.photos/seed/friends/600/340",
    coverUrl: "https://picsum.photos/seed/friends/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Comédie",
    rating: "90%",
    year: 2022,
    duration: "1h 50m"
  },
  {
    id: 23,
    title: "Bureau de Dingue",
    description: "La vie quotidienne dans une entreprise complètement folle.",
    thumbnailUrl: "https://picsum.photos/seed/office/600/340",
    coverUrl: "https://picsum.photos/seed/office/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Comédie",
    rating: "82%",
    year: 2024,
    duration: "1h 45m 10s"
  },
  {
    id: 205,
    title: "Le Grand Malentendu",
    description: "Une confusion d'identité mène un comptable timide dans une aventure internationale.",
    thumbnailUrl: "https://picsum.photos/seed/funny/600/340",
    coverUrl: "https://picsum.photos/seed/funny/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Comédie",
    rating: "85%",
    year: 2023,
    duration: "1h 45m 00s"
  },
  {
    id: 206,
    title: "Vacances Explosives",
    description: "Une famille dysfonctionnelle tente de passer des vacances paisibles au camping.",
    thumbnailUrl: "https://picsum.photos/seed/camp/600/340",
    coverUrl: "https://picsum.photos/seed/camp/1200/675",
    videoUrl: STREAMS.SINTEL,
    genre: "Comédie",
    rating: "82%",
    year: 2024,
    duration: "1h 38m 45s"
  }
];

export const DRAMA_MOVIES: Movie[] = [
  {
    id: 31,
    title: "Sintel (La Recherche)",
    description: "Une jeune femme voyage à travers le monde pour retrouver son petit dragon.",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sintel_poster.jpg/800px-Sintel_poster.jpg",
    coverUrl: "https://durian.blender.org/wp-content/uploads/2010/09/05_sintel_ambush_render.png",
    videoUrl: STREAMS.SINTEL,
    genre: "Drame",
    rating: "94%",
    year: 2023,
    duration: "1h 48m"
  },
  {
    id: 32,
    title: "Hiver Éternel",
    description: "La survie d'une communauté isolée dans les montagnes.",
    thumbnailUrl: "https://picsum.photos/seed/winter/600/340",
    coverUrl: "https://picsum.photos/seed/winter/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Drame",
    rating: "91%",
    year: 2022,
    duration: "2h 05m"
  },
  {
    id: 33,
    title: "Destins Brisés",
    description: "Un accident de voiture lie le destin de trois inconnus.",
    thumbnailUrl: "https://picsum.photos/seed/crash/600/340",
    coverUrl: "https://picsum.photos/seed/crash/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Drame",
    rating: "88%",
    year: 2024,
    duration: "1h 55m"
  },
  {
    id: 34,
    title: "L'École de la Vie",
    description: "Un professeur inspire ses élèves défavorisés.",
    thumbnailUrl: "https://picsum.photos/seed/school/600/340",
    coverUrl: "https://picsum.photos/seed/school/1200/675",
    videoUrl: STREAMS.SINTEL,
    genre: "Drame",
    rating: "96%",
    year: 2021,
    duration: "2h 00m"
  },
  {
    id: 305,
    title: "Les Chemins de la Mémoire",
    description: "Un homme tente de reconstituer son passé après une amnésie totale.",
    thumbnailUrl: "https://picsum.photos/seed/memory/600/340",
    coverUrl: "https://picsum.photos/seed/memory/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Drame",
    rating: "96%",
    year: 2021,
    duration: "1h 58m 30s"
  },
  {
    id: 306,
    title: "L'Héritage Caché",
    description: "Trois frères et sœurs découvrent un secret de famille lors de la lecture d'un testament.",
    thumbnailUrl: "https://picsum.photos/seed/legacy/600/340",
    coverUrl: "https://picsum.photos/seed/legacy/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Drame",
    rating: "90%",
    year: 2023,
    duration: "2h 05m 15s"
  }
];

export const SCIFI_MOVIES: Movie[] = [
  {
    id: 41,
    title: "Projet Mars",
    description: "La première colonie humaine sur Mars fait face à une menace inconnue.",
    thumbnailUrl: "https://picsum.photos/seed/mars/600/340",
    coverUrl: "https://picsum.photos/seed/mars/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Science-Fiction",
    rating: "93%",
    year: 2025,
    duration: "2h 10m"
  },
  {
    id: 42,
    title: "Intelligence Supérieure",
    description: "Une IA prend le contrôle des systèmes de défense mondiaux.",
    thumbnailUrl: "https://picsum.photos/seed/ai/600/340",
    coverUrl: "https://picsum.photos/seed/ai/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Science-Fiction",
    rating: "89%",
    year: 2024,
    duration: "1h 55m"
  },
  {
    id: 43,
    title: "Voyageurs du Temps",
    description: "Une équipe d'élite voyage dans le passé pour sauver le futur.",
    thumbnailUrl: "https://picsum.photos/seed/time/600/340",
    coverUrl: "https://picsum.photos/seed/time/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Science-Fiction",
    rating: "91%",
    year: 2023,
    duration: "2h 00m"
  },
  {
    id: 44,
    title: "Invasion Silencieuse",
    description: "Des extraterrestres s'infiltrent parmi la population humaine.",
    thumbnailUrl: "https://picsum.photos/seed/alien/600/340",
    coverUrl: "https://picsum.photos/seed/alien/1200/675",
    videoUrl: STREAMS.SINTEL,
    genre: "Science-Fiction",
    rating: "87%",
    year: 2022,
    duration: "1h 50m"
  },
  {
    id: 405,
    title: "Écho du Néant",
    description: "Un signal radio provenant d'une galaxie morte change à jamais la compréhension de l'univers.",
    thumbnailUrl: "https://picsum.photos/seed/echo/600/340",
    coverUrl: "https://picsum.photos/seed/echo/1200/675",
    videoUrl: STREAMS.SINTEL,
    genre: "Science-Fiction",
    rating: "94%",
    year: 2025,
    duration: "2h 15m 00s"
  },
  {
    id: 406,
    title: "Réalité 2.0",
    description: "Dans un monde où la réalité virtuelle est indiscernable du réel, un hacker cherche la vérité.",
    thumbnailUrl: "https://picsum.photos/seed/vr/600/340",
    coverUrl: "https://picsum.photos/seed/vr/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Science-Fiction",
    rating: "89%",
    year: 2024,
    duration: "1h 48m 20s"
  }
];

export const THRILLER_MOVIES: Movie[] = [
  {
    id: 101,
    title: "The Blacklist: Saison 1",
    description: "Raymond 'Red' Reddington, l'un des fugitifs les plus recherchés, se rend au FBI et propose de les aider à arrêter des criminels intouchables, à condition de ne parler qu'à la profileuse Elizabeth Keen.",
    thumbnailUrl: "https://picsum.photos/seed/blacklist_thumb/600/340",
    coverUrl: "https://picsum.photos/seed/blacklist_cover/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Thriller / Crime",
    rating: "94%",
    year: 2013,
    duration: "Saison 1"
  },
  {
    id: 3,
    title: "Silence des Abysses",
    description: "Une équipe de chercheurs découvre quelque chose d'effrayant au fond de l'océan.",
    thumbnailUrl: "https://picsum.photos/seed/abyss/600/340",
    coverUrl: "https://picsum.photos/seed/abyss/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Thriller",
    rating: "89%",
    year: 2024,
    duration: "1h 45m 24s"
  },
  {
    id: 51,
    title: "L'Espion",
    description: "Un agent double tente de survivre alors que sa couverture est compromise.",
    thumbnailUrl: "https://picsum.photos/seed/spy/600/340",
    coverUrl: "https://picsum.photos/seed/spy/1200/675",
    videoUrl: STREAMS.TEARS_OF_STEEL,
    genre: "Thriller",
    rating: "95%",
    year: 2023,
    duration: "2h 05m"
  },
  {
    id: 52,
    title: "Minuit Passé",
    description: "Un détective privé enquête sur une disparition inquiétante.",
    thumbnailUrl: "https://picsum.photos/seed/noir/600/340",
    coverUrl: "https://picsum.photos/seed/noir/1200/675",
    videoUrl: STREAMS.ELEPHANTS_DREAM,
    genre: "Thriller",
    rating: "90%",
    year: 2022,
    duration: "1h 55m"
  },
  {
    id: 53,
    title: "Huis Clos",
    description: "Cinq étrangers sont piégés dans un ascenseur avec un tueur.",
    thumbnailUrl: "https://picsum.photos/seed/elevator/600/340",
    coverUrl: "https://picsum.photos/seed/elevator/1200/675",
    videoUrl: STREAMS.BIG_BUCK_BUNNY,
    genre: "Thriller",
    rating: "86%",
    year: 2024,
    duration: "1h 45m 15s"
  },
  {
    id: 505,
    title: "Le Témoin Silencieux",
    description: "Un photographe capture accidentellement un crime et devient la cible d'un syndicat du crime.",
    thumbnailUrl: "https://picsum.photos/seed/photo/600/340",
    coverUrl: "https://picsum.photos/seed/photo/1200/675",
    videoUrl: STREAMS.COSMOS,
    genre: "Thriller",
    rating: "91%",
    year: 2023,
    duration: "1h 45m 24s"
  },
  {
    id: 506,
    title: "Ombres du Passé",
    description: "Un cold case est rouvert après la découverte d'un nouvel indice troublant.",
    thumbnailUrl: "https://picsum.photos/seed/coldcase/600/340",
    coverUrl: "https://picsum.photos/seed/coldcase/1200/675",
    videoUrl: STREAMS.BIG_BUCK_BUNNY,
    genre: "Thriller",
    rating: "87%",
    year: 2022,
    duration: "1h 55m 45s"
  }
];

export const TRENDING_MOVIES: Movie[] = [
  THRILLER_MOVIES[0], // The Blacklist
  ACTION_MOVIES[0],
  SCIFI_MOVIES[0],
  DRAMA_MOVIES[0],
  COMEDY_MOVIES[1],
  ACTION_MOVIES[4], // Opération Tempête
  SCIFI_MOVIES[4]   // Écho du Néant
];