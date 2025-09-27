import { useEffect, useState } from "react";
import api from "../api/axios";

// Components
import HeroBanner from "../components/HeroBanner";
import ShopByPet from "../components/ShopByPet";
import TopRatedProducts from "../components/TopRatedProducts";
import Promotions from "../components/Promotions";
import Services from "../components/Services";

// Default pet images
import dogImg from "../assets/pets/dog.png";
import catImg from "../assets/pets/cat.png";
import hamsterImg from "../assets/pets/hamster.png";
import guineaPigImg from "../assets/pets/guinea-pig.png";
import fishImg from "../assets/pets/fish.png";
import rabbitImg from "../assets/pets/rabbit.png";
import ratImg from "../assets/pets/rat.png";

// Hardcoded "Shop by Pet" data
const pets = [
  { id: 1, name: "Dog", slug: "dog", image: dogImg },
  { id: 2, name: "Cat", slug: "cat", image: catImg },
  { id: 3, name: "Hamster", slug: "hamster", image: hamsterImg },
  { id: 4, name: "Guinea Pig", slug: "guinea-pig", image: guineaPigImg },
  { id: 5, name: "Fish", slug: "fish", image: fishImg },
  { id: 6, name: "Rabbit", slug: "rabbit", image: rabbitImg },
  { id: 7, name: "Rat", slug: "rat", image: ratImg },
];

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("pages/home/");
        console.log("Home API:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Home load error", err);
      }
    };
    load();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-sans">
      <HeroBanner hero_banner={data.hero_banner} />
      <ShopByPet pets={pets} />
      <TopRatedProducts products={data.top_rated_products} />
      <Promotions promotions={data.promotions} />
      <Services services={data.services} />
    </div>
  );
}
