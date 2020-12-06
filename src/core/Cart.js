import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cardHelper";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This Section to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCard={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This Section for checkout</h2>
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Proceed to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No Products</h4>
          )}
        </div>
        {/* <div className="col-6"><StripeCheckout
        products={products}
        setReload={setReload}
        /></div> */}
        {console.log("FROM CART ",products)}
        <div className="col6"><Paymentb products={products} setReload={setReload} reload={reload}/></div>
      </div>
    </Base>
  );
};

export default Cart;
