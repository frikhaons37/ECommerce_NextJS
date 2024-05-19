export async function getProductDetails(productId) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/articles/${productId}`, {
    cache: "no-cache",
  });
  return data.json();
}
