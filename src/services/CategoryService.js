import axios from "axios";

const CATEGORY_API = "/api/categories/";

export const fetchCategories = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + CATEGORY_API);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchCategoryById = async (categoryId) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_KEY + CATEGORY_API + `${categoryId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(
      process.env.NEXT_PUBLIC_API_KEY + CATEGORY_API + `${categoryId}`
    );
    return { message: "Category deleted successfully." };
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};

export const addCategory = async (category) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_KEY + CATEGORY_API,
      category,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to add category");
  }
};

export const editCategory = async (category) => {
  try {
    const res = await axios.put(
      process.env.NEXT_PUBLIC_API_KEY + CATEGORY_API + `${category._id}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to edit category");
  }
};
