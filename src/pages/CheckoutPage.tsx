import React from "react";
import { IonContent, IonPage } from '@ionic/react';
import Checkout from "../components/Checkout";
import "../styles/Cart.css";

const CheckoutPage: React.FC = () => {
  return (
    <IonPage className="container">
      <IonContent className="cart-page-container">
        <h1>Checkout</h1>
        <Checkout />
      </IonContent>
    </IonPage>  
  );
};

export default CheckoutPage;
