"use client";

import { Button } from '@heroui/react';
import { Edit, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface Stores {
  id: number;
  name: string;
  platform: string;
  domain: string;
  isActive: boolean;
}

const Page = () => {

  const [migrating, setMigrating] = useState(false);
  
  const [stores, setStores] = useState<Stores[]>([
    {
      id: 1,
      name: "Store 1",
      platform: "Shopify",
      domain: "store1.com",
      isActive: true
    },
    {
      id: 2,
      name: "Store 2",
      platform: "Shopify",
      domain: "store2.com",
      isActive: true
    },
    {
      id: 3,
      name: "Store 3",
      platform: "Shopify",
      domain: "store3.com",
      isActive: true
    },
    {
      id: 4,
      name: "Store 4",
      platform: "Shopify",
      domain: "store4.com",
      isActive: true
    },
    {
      id: 5,
      name: "Store 5",
      platform: "Shopify",
      domain: "store5.com",
      isActive: true
    },
  ]);

  useEffect(() => {
    if (migrating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [migrating]);

  const handleRunMigration = () => {
    setMigrating(true);
  };

  return (
    <>
      
      {migrating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div className="
              z-10 p-6 rounded-xl
              animate-[fadeInScale_0.25s_ease-out]
              flex flex-col items-center justify-center
            ">
            
            <div className="🤚">
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="🌴"></div>
              <div className="👍"></div>
            </div>
            
            <h2 className="text-xl font-semibold text-blue-600 animate-pulse mt-10">
              Migration in Progress
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Please wait while the migration is running...
            </p>

            <div className="absolute top-4 right-4 flex justify-end">
              <Button
                onClick={() => setMigrating(false)}
                className="bg-transparent text-black px-2 py-1 rounded-full flex items-center justify-center w-6 h-6 hover:bg-gray-200 transition-all duration-300"
              >
                <X size={16} className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen px-4">

        <div className="flex flex-col max-w-7xl mx-auto px-3 gap-4">
          <div className="flex flex-col bg-blue-100/60 rounded-lg p-2">
            <h1 className="text-xl font-bold text-blue-600">SwiftifY Migrator</h1>
          </div>

          <div className="flex flex-col bg-blue-100/60 rounded-lg py-4 px-3 gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-zinc-900">Stores</h1>
              <Button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300">Add Store</Button>
            </div>

            {/* Stores */}
            <div className="flex gap-4">

              {/* Table */}
              <div className="flex-2 p-2">
                <table className="bg-white overflow-hidden rounded-lg min-w-full divide-y divide-gray-200">
                  <thead className='bg-zinc-200'>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Platform
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Domain
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stores.map((store) => (
                      <tr key={store.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.platform}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.domain}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{store.isActive ? "Yes" : "No"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          <Button className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300">
                            <Trash className="w-4 h-4" />
                          </Button>

                          <Button className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Migrator */}
              <div className="flex-1 bg-white rounded-lg p-3 h-fit">
                <h1 className="text-md font-bold text-blue-600">Create Migration</h1>

                <div className="flex gap-4 my-2">
                  {/* Left Side - Source Store */}
                  <div className="flex-1 rounded-lg">
                    <h1 className="text-sm font-bold text-zinc-900 mb-2">Source Store</h1>

                    {/* Dropdown - show list of stores */}
                    <select className="block w-full rounded-md bg-gray-100 border py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                      {stores.map((store) => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                      ))}
                    </select>

                    {/* Choose Tables */}
                    <div className="mt-2">
                      <h1 className="text-sm font-bold text-zinc-900 mb-2">Select Table</h1>

                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          id="checkbox-products"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="checkbox-products"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Products
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="checkbox-orders"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="checkbox-orders"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Orders
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="checkbox-customers"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="checkbox-customers"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Customers
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="checkbox-inventory"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="checkbox-inventory"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Inventory
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Target Store */}
                  <div className="flex-1 flex-col rounded-lg gap-2">
                    <h1 className="text-sm font-bold text-zinc-900 mb-2">Target Store</h1>

                    {/* Dropdown - show list of stores */}
                    <div>
                      <select className="block w-full rounded-md bg-gray-100 border py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {/* both stores not same */}
                        {stores.map((store) => (
                          <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-2'>
                      <h1 className="text-sm font-bold text-zinc-900 mb-2">Mode</h1>
                      <select className="block w-full rounded-md bg-gray-100 border py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value={"full"}>Full</option>
                        <option value={"delta"}>Partial</option>
                      </select>
                    </div>

                    <div className='mt-7 flex justify-end'>
                      <Button
                        type="submit"
                        onPress={handleRunMigration}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300">Run Migration</Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Page