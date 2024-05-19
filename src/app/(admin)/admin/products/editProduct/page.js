import EditProduct from "@/Components/admin/EditProductComponent";
import { fetchSCategories } from "@/services/ScategorieService";
const getscategories = async () => {
  const data = await fetchSCategories();
  return data;
};
const EditProductPage = async () => {
  const scategories = await getscategories();
  return (
    <div>
      <EditProduct scategories={scategories} />
    </div>
  );
};
export default EditProductPage;
