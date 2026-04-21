import React from "react";
import { IonContent, IonButton, IonRouterLink, IonPage } from '@ionic/react';
import ProductList from "../components/ProductList";

const Home: React.FC = () => {
  return (
    <IonPage className="container" style={{ marginTop: "50px" }}>
      <IonContent>
        <section className="hero">
          <p className="hero-subtitle">
            Discover premium apparel for every style. Enjoy exclusive deals and a
          seamless shopping experience!
        </p>
        <div className="hero-actions">
          <IonRouterLink routerLink="#products">
            <IonButton color="primary" onClick={() => window.location.href = "#products"}>Shop Now</IonButton>
          </IonRouterLink>
        </div>
      </section>
      <div id="products">
        <ProductList />
      </div>
    </IonContent>
    </IonPage>
  );
};

export default Home;
