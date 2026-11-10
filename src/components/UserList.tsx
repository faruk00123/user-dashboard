import { useEffect, useState } from "react";
import type { User } from "../types/Type";
import { createUser, getUsers } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // new user
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    } catch (error) {
      setError("Failed to create new user");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const reQust = await getUsers();
      setUsers(reQust);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="bg-red-100 border border-red-400 text-red-700 py-3 relative px-4 rounded"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      {/* new user */}
      <div className="bg-white shadow rounded-lg p-4 mb-4 space-y-5">
        <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            className="py-2 px-1 focus:outline-none w-full"
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            className="py-2 px-1 focus:outline-none w-full"
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <input
            className="py-2 px-1 focus:outline-none w-full"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>

      {/* user list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Users</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-4 sm:px-4">
              <div className="sm:flex space-y-3 sm:space-y-0 items-center justify-between">
                <div className="flex-1 min-w-0 space-x-2">
                  <p className="text-sm font-medium text-indigo-600">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-1.5 px-4 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 cursor-pointer hover:bg-red-700 text-white py-1.5 px-4 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
