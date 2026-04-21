import React from "react";
import ProductList from "../components/ProductList";

const Home: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <p className="hero-subtitle">
          Discover premium apparel for every style. Enjoy exclusive deals and a
          seamless shopping experience!
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-primary">
            Shop Now
          </a>
        </div>
      </section>
      <div id="products">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
