"use client";
import React, { useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useShoppingCart } from "use-shopping-cart";
import Link from 'next/link';
const CartProductItem = ({ product }) => {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = (product) => {
    const target = {
      id: product._id,
      title: product.designation,
      image: product.imageart,
      price: product.prix
    };

    if (quantity < product.qtestock) {
      addItem(target, { count: quantity })
        .then(() => {
          console.log('Item added to cart:', target);
          setQuantity(1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Not Enough Stock");
    }
  };

  return (
    <>
   
      <article className="col-sm-3 mt-4">
      <Link href={`Details/${product._id}`}>
        <div className="card grow-on-hover">

          <img
            src={product?.imageart}
            className="card-img-top p-1"
            alt={product.designation}
          />
        </div>
        </Link>  
        <div className="text-center">
          <div>{product.designation.substr(0, 20)} ...</div>
          <div>Prix : {product.prix} TND </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center w-full'>
                <label htmlFor="Quantity" className="sr-only">Quantité</label>
                <div className="flex items-center rounded border border-gray-200 w-24">
                    <button type="button" className="w-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={decreaseQuantity}>
                        -
                    </button>
                    <input
                        type="number"
                        id="Quantity"
                        value={quantity}
                        className="w-16 border-transparent text-center no-spinner sm:text-sm"
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    />
                    <button type="button" className="w-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={increaseQuantity}>
                        +
                    </button>
                </div>
                <div className="text-center">
                    
                    <button
                        className="px-3 py-2 rounded-lg bg-pink-700 text-white"
                        disabled={product?.qtestock < 1}
                        onClick={() => addToCart(product)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
      
      </article>
      <style>
        {`
          .grow-on-hover:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease;
          }
        `}
      </style>
   
    </>
  );
}

export default CartProductItem;
