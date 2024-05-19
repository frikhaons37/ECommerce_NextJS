'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useShoppingCart } from "use-shopping-cart";

export default function ProductDetailPage({product}) {

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
                price: product.prix,
            };

            if (quantity <= product.qtestock) {
                addItem(target, { count: quantity })
                    .then(() => {
                        console.log('Item added to cart:', target);
                        setQuantity(1);
                        // Redirection après l'ajout au panier
                        window.location.href = `Details?productId=${product._id}`;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                window.alert('Not Enough Stock');
            }
        };

        return (
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
        );
    };

   
    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">{product?.designation}</h1>
                    <p className="mt-4 text-gray-500">{product?.reference}</p>
                </div>

                <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="reference" className="mt-4 text-pink-700">Référence: </label>
                        <div className="relative">
                            <p className="mt-4 text-gray-500">{product?.reference}</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="marque" className="mt-4 text-pink-700">Marque: </label>
                        <div className="relative">
                            <p className="mt-4 text-gray-500">{product?.marque}</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="prix" className="mt-4 text-pink-700">Prix: </label>
                        <div className="relative">
                            <p className="mt-4 text-gray-500">{product?.prix} Dt</p>
                        </div>
                    </div>

                    <CartProductItem product={product} />
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img alt={product?.designation} src={product?.imageart} />
            </div>
        </section>
    );
}
