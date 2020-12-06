import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cardHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({products , setReload = (f) => f, reload = undefined}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;
  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken: info.clientToken });
      }
    });
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData).then((response) => {
            console.log("PAYMENT SUCCESS");
          setInfo({ ...info, success: response.success, loading: false });
          const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount
          }
          createOrder(userId, token, orderData)
          cartEmpty(()=>{
              console.log()
          })
          setReload(!reload)
        })
        .catch(error =>{
            console.log("PAYMENT FAILED");
            setInfo({...info, loading: false, success: false})
        })
      })
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = p.price + amount;
    });

    return amount;
  };

  const showBTdropIn = (products) => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={() => {onPurchase()}}>
              Pay {getAmount()} $
            </button>
          </div>
        ) : (
          <h3>Add Products to Cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  return (
    <div>
      <h3>{showBTdropIn(products)}</h3>
    </div>
  );
};

export default Paymentb;
