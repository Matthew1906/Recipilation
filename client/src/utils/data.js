export const errorMessages = {
  'auth/user-not-found': 'User does not exist!',
  'auth/wrong-password': 'Wrong password!'
}

export const recipes = [
  {
    image: "/images/lasagna-1.png",
    name: "Classic Lasagna",
    description:
      "A great dish to make for a crowd and easy to adjust for varying tastes.",
    preparation_time: "10 mins",
    cookTime: "1 hour",
    serving_size: 4,
    difficulty: "Easy",
  },
  {
    image: "/images/spaghetti-card.png",
    name: "Spaghetti Bolognaise",
    description:
      "A great dish to make for yourself. Spaghetti Bolognaise combines the smoothness of pasta, sweetness of meat, and freshness of bolognaise sauce for you to enjoy.",
    preparation_time: "10 mins",
    cooking_time: "1 hour",
    serving_size: 4,
    difficulty: "Easy",
  },
  {
    image: "/images/pizza-card.png",
    name: "Supreme Pizza",
    description: "A great dish for the crowd. Who doesn't like pizza?",
    prepTime: "10 mins",
    cooking_time: "1 hour",
    serving_size: 4,
    difficulty: "Medium",
  },
  {
    image: "/images/spaghetti-card.png",
    name: "Spaghetti Bolognaise",
    description:
      "A great dish to make for yourself. Spaghetti Bolognaise combines the smoothness of pasta, sweetness of meat, and freshness of bolognaise sauce for you to enjoy.",
    preparation_time: "10 mins",
    cooking_time: "1 hour",
    serving_size: 4,
    difficulty: "Hard",
  },
];

export const categories = [
  { name: "Italian", images: ["/images/lasagna-card.jpg"] },
  {
    name: "Meat",
    images: ["/images/lasagna-card.jpg", "/images/pizza-card.png"],
  },
  {
    name: "Eastern",
    images: [
      "/images/lasagna-card.jpg",
      "/images/pizza-card.png",
      "/images/spaghetti-card.png",
    ],
  },
  {
    name: "Asian",
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

export const equipments = [
  {name:'Stainful steel mixing bowl', image:'/images/equipment-card.png'},
  {name:'Stainless steel mixing bowl', image:'/images/equipment-card.png'},
  {name:'Wooden mixing bowl', image:'/images/equipment-card.png'},
  {name:'Plastic mixing bowl', image:'/images/equipment-card.png'},
  {name:'Ceramic bowl', image:'/images/equipment-card.png'},
  {name:'Cannon bowl', image:'/images/equipment-card.png'},
];

export const ingredients = [
  "3 cups of hoisin sauce (60 ml/cc)",
  "3 cups of hoisin sauce (60 ml/cc)",
  "3 cups of hoisin sauce (60 ml/cc)",
  "3 cups of hoisin sauce (60 ml/cc)",
  "3 cups of hoisin sauce (60 ml/cc)",
];

export const steps = [
  {index:6, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:2, title:'Brown the ground beefss', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:1, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:3, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:7, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:5, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:4, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
  {index:8, title:'Brown the ground beef', image:'/images/step-card.png', details:'In a large skillet heat 2 teaspoons of olive oil on medium high heat. Add the ground beef and cook until it is lightly browned on all sides. Remove the beef with a slotted spoon to a bowl. Drain off all but a tablespoon of fat.'},
];

export const comments = [
  {name: "Joko Jokoko", datetime:new Date(), rating:5, body:"The best lasagna recipe i've ever seen"},
  {name: "Jeko Jokako", datetime:new Date(), rating:3, body:"The best lasagna recipe i've ever seen ever ever ever and forever"},
  {name: "Juko Jokake", datetime:new Date(), rating:5, body:"The best lasagna recipe i've ever seen wadawwwwwwwwwwww"},
  {name: "Jaka Jokako", datetime:new Date(), rating:4, body:"The best lasagna recipe i've ever"},
  {name: "Jeki Jokoka", datetime:new Date(), rating:5, body:"The best lasagna recipe i've ever seen in my life, and probably the next life."},
  {name: "Joki Jokeko", datetime:new Date(), rating:5, body:"The best lasagna recipe i've ever seen in my life, the next life, and probably my previous life too."},
  {name: "Juki Jekoke", datetime:new Date(), rating:4, body:"The best lasagna recipe i've ever seen in my life"},
];

export const difficulties = [
  {value:'easy', name:'Easy'},
  {value:'medium', name:'Medium'},
  {value:'hard', name:'Hard'}
];

export const timeLengths = [
  {value:'second', name:'second(s)'},
  {value:'minute', name:'minute(s)'},
  {value:'hour', name:'hour(s)'}
];