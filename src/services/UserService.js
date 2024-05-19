const USER_API = "/api/users/";

export const fetchUsers = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_KEY + USER_API, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response;
};

export const fetchUserById = async (userId) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + USER_API + `${userId}`,
    {
      method: "GET",
    }
  );
  const response = await res.json();
  return response;
};

export const deleteUser = async (userId) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + USER_API + `${userId}`,
    {
      method: "DELETE",
    }
  );
  const response = await res.json();
  return response;
};

export const addUser = async (user) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_KEY + USER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const response = await res.json();
  return response;
};

export const editUser = async (user) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY + USER_API + `${user._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const response = await res.json();
  return response;
};

export const getUsersByRole = async (role) => {
  try {
    const users = await User.find({ role });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
