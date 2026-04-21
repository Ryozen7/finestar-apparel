import React from "react";
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import  Cart  from "../components/Cart";
import "../styles/Cart.css";

const CartPage: React.FC = () => {
  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="cart-page-container">
        <Cart />
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
