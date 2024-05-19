import React from "react";
import CartProductItem from'@/Components/Client/shoppingCart/cartProductItem';
import {fetchArticles} from "@/services/ArticleService";
import Footer from '@/Components/Client/footer';

async function getProducts(){
const data=await fetchArticles()
return data;
}
const CartProductsPage= async ()=> {
const products = await getProducts();
return (
<>
<div className="row">
{products && products?.map((product) => (
<CartProductItem key={product?._id} product={product} />
))}
</div>
<Footer/>
</>
)
}
export default CartProductsPage;