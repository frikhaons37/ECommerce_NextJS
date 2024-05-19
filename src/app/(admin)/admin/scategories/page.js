import Listscategories from '@/Components/admin/listscategories';
import { fetchSCategories } from "@/services/ScategorieService";

const scategoriesPage = async () => {
  try {
    const scategories = await fetchSCategories();
    return (
      <div className="container">
        <Listscategories categories={scategories} />
      </div>
    );
  } catch (error) {
    console.error("Erreur lors du chargement des catégories de sous-catégories:", error);
    return <div>Une erreur s'est produite lors du chargement des catégories.</div>;
  }
};

export default scategoriesPage;
