const SCATEGORIE_API = "/api/scategories/";
export const fetchSCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}${SCATEGORIE_API}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response;
};
export const fetchSCategorieById = async (scategorieId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}${SCATEGORIE_API}${scategorieId}`,
    {
      method: "GET",
    }
  );
  const response = await res.json();
  return response;
};

export const deleteSCategorie = async (scategorieId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}${SCATEGORIE_API}/${scategorieId}`,
    {
      method: "DELETE",
    }
  );
  const response = await res.json();
  return response;
};
export const addSCategorie = async (scategorie) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_KEY + SCATEGORIE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scategorie),
  });
  const response = await res.json();

  return response;
};
export const editSCategorie = async (scategorie) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + SCATEGORIE_API + `${scategorie._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scategorie),
    }
  );
  const response = await res.json();
  return response;
};
