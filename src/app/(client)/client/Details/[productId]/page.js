import ProductDetailPage from '@/Components/Client/ProductDetailPage';
import { getProductDetails } from '../GetProductDetails';
export default async function ProductDetail({params}) {
  const product =await getProductDetails(params.productId);
  return <ProductDetailPage product={product}/>;
}