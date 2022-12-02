export const recipes = [
  {
    image: "/images/lasagna-1.png",
    title: "Classic Lasagna",
    description:
      "A great dish to make for a crowd and easy to adjust for varying tastes.",
    prepTime: "10 mins",
    cookTime: "1 hour",
    serving: 4,
    difficulty: "Easy",
  },
  {
    image: "/images/spaghetti-card.png",
    title: "Spaghetti Bolognaise",
    description:
      "A great dish to make for yourself. Spaghetti Bolognaise combines the smoothness of pasta, sweetness of meat, and freshness of bolognaise sauce for you to enjoy.",
    prepTime: "10 mins",
    cookTime: "1 hour",
    serving: 4,
    difficulty: "Easy",
  },
  {
    image: "/images/pizza-card.png",
    title: "Supreme Pizza",
    description: "A great dish for the crowd. Who doesn't like pizza?",
    prepTime: "10 mins",
    cookTime: "1 hour",
    serving: 4,
    difficulty: "Medium",
  },
  {
    image: "/images/spaghetti-card.png",
    title: "Spaghetti Bolognaise",
    description:
      "A great dish to make for yourself. Spaghetti Bolognaise combines the smoothness of pasta, sweetness of meat, and freshness of bolognaise sauce for you to enjoy.",
    prepTime: "10 mins",
    cookTime: "1 hour",
    serving: 4,
    difficulty: "Hard",
  },
];

export const categories = [
  { name: "Italian", images: ["/images/lasagna-card.jpg"] },
  {
    name: "Italian",
    images: ["/images/lasagna-card.jpg", "/images/pizza-card.png"],
  },
  {
    name: "Italian",
    images: [
      "/images/lasagna-card.jpg",
      "/images/pizza-card.png",
      "/images/spaghetti-card.png",
    ],
  },
  {
    name: "Italian",
    images: [
      "/images/lasagna-card.jpg",
      "/images/pizza-card.png",
      "/images/spaghetti-card.png",
      "/images/lasagna-1.png",
    ],
  },
];


export const profiles = [
  {
    name: 'Jake Cook',
    image: '/images/profile-card.png',
    recipes: 6,
    rating: 4, 
    reviews: 12
  }, 
  {
    name: 'Jake ManyCook',
    image: '/images/profile-card.png',
    recipes: 10,
    rating: 5, 
    reviews: 2
  }, 
  {
    name: 'Jake Unrated',
    image: '/images/profile-card.png',
    recipes: 3,
    rating: 0, 
    reviews: 0
  },
  {
    name: 'Jake No Cook',
    image: '/images/profile-card.png',
    recipes: 0,
    rating: 0, 
    reviews: 0
  }
];