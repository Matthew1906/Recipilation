import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import RecipeCarousel from "../components/containers/RecipeCarousel";
import CombinationCard from "../components/cards/CombinationCard";
import RecipeCard from "../components/cards/RecipeCard";
import Button from "../components/utils/Button";

const Dashboard = () => {
  const recipes = [
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
  const categories = [
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
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      <Header auth="guest" />
      <main className="min-h-screen h-auto overflow-x-hidden">
        {/* Carousel (Top rated/Trending Recipes) */}
        <RecipeCarousel recipes={recipes} />
        {/* Top Categories */}
        <section className="px-10 py-8" id="top-categories">
          <h5 class="font-nunito font-bold text-2xl mb-3 md:mb-0">
            Top Categories
          </h5>
          <div className="flex justify-center lg:justify-between flex-wrap items-center px-8 mt-4">
            {categories.map((category, key) => (
              <CombinationCard
                key={key}
                type="icon"
                images={category.images.slice(0, 4)} // can only show 4 first images
                name={category.name}
                to="/"
              />
            ))}
            <Link>
              <span className="text-blue text-xl font-nunito underline hover:text-red">
                View more
              </span>
            </Link>
          </div>
        </section>
        {/* Recipes - Recommended for you (User) */}
        <section className="px-10 py-8 bg-light-yellow" id="recommended">
          <h5 class="font-nunito font-bold text-2xl mb-4 md:mb-0">
            Recommended for you
          </h5>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe, key) => (
              <RecipeCard recipe={recipe} key={key} />
            ))}
          </div>
          <Link>
            <div className="text-center">
              <Button theme="red" className="mt-4 text-xl">
                Load More
              </Button>
            </div>
          </Link>
        </section>
        {/* Top-rated recipes in (most famous category) */}
        {/* Recently viewed recipes (both) */}
        <section className="px-10 py-8 bg-white-secondary" id="recommended">
          <h5 class="font-nunito font-bold text-2xl mb-4 md:mb-0">
            Recently viewed
          </h5>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe, key) => (
              <RecipeCard recipe={recipe} key={key} />
            ))}
          </div>
          <Link>
            <div className="text-center">
              <Button theme="orange" className="mt-4 text-xl">
                Load More
              </Button>
            </div>
          </Link>
        </section>
        {/* Top-rated recipes in (recently viewed category if exists) */}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
