"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";

import { Edit, Edit2, Eye, EyeOff, StoreIcon } from "lucide-react";
import { Button, Input, Label, Switch } from "@heroui/react";
import { useTenantStore } from "@/app/store/useTenantStore";
import toast from "react-hot-toast";


export default function TAddStoreModal({ store = null, className }: { store?: any, className?: string }) {

  const { 
    isAddingStore,
    addNewStore,
    updateStore
  } = useTenantStore();

  const { setOpen } = useModal();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState({
    platform: "shopify",
    storeName: "",
    storeUrl: "",
    accessToken: "",
    apiKey: "",
    apiSecret: "",
    isActive: true,
  });

  useEffect(() => {
    if (store) {
      setForm({
        platform: store.platform || "",
        storeName: store.storeName || "",
        storeUrl: store.storeUrl || "",
        accessToken: store.accessToken || "",
        apiKey: store.apiKey || "",
        apiSecret: store.apiSecret || "",
        isActive: store.isActive ?? true,
      });
    }
  }, [store]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {

    // check fields are not empty
    if (!form.platform || !form.storeName || !form.storeUrl || !form.accessToken || !form.apiKey || !form.apiSecret) {
      toast.error('Please fill in all fields');
      return;
    }

    if (store) {
      updateStore({
        id: store.id,
        ...form
      });
    } else {
      addNewStore(form);
    }

    setOpen(false);

    // reload the page
    window.location.reload();
  };
  
  return (
    <div className="flex items-center justify-center">
      <Modal>

        <ModalTrigger className={className}>
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {store ? <Edit className="h-4 w-4" /> : "Add New Store"}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            
            {store ? <Edit2 className="h-4 w-4" /> : <StoreIcon className="h-4 w-4" />}
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-left mb-8">
              {store ? "Update Store" : "Add New Store"}
            </h4>

            <div className="flex flex-col gap-4">

              {/* Platform */}
              <div className="space-y-2 flex flex-col">
                <Label>Platform</Label>
                <select
                  value={form.platform}
                  onChange={(e) => handleChange("platform", e.target.value)}
                  className="block w-full rounded-md bg-gray-100 border py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="shopify">Shopify</option>
                  <option value="woocommerce">WooCommerce</option>
                </select>
              </div>

              {/* Store Name */}
              <div className="space-y-2 flex flex-col">
                <Label>Store Name</Label>
                <Input
                  placeholder="Demo Fashion Store"
                  value={form.storeName}
                  className="block w-full rounded-md bg-gray-100 text-black dark:text-white placeholder:text-gray-600 border py-2 px-3 focus:outline-none focus:ring-none sm:text-sm shadow-none"
                  onChange={(e) => handleChange("storeName", e.target.value)}
                />
              </div>

              {/* Store URL */}
              <div className="space-y-2 flex flex-col">
                <Label>Store URL</Label>
                <Input
                  placeholder="https://store.myshopify.com"
                  value={form.storeUrl}
                  className="block w-full rounded-md bg-gray-100 text-black dark:text-white placeholder:text-gray-600 border py-2 px-3 focus:outline-none focus:ring-none sm:text-sm shadow-none"
                  onChange={(e) => handleChange("storeUrl", e.target.value)}
                />
              </div>

              {/* Access Token */}
              <div className="space-y-2 flex flex-col">
                <Label>Access Token</Label>
                <Input
                  placeholder="shpat_..."
                  value={form.accessToken}
                  className="block w-full rounded-md bg-gray-100 text-black dark:text-white placeholder:text-gray-600 border py-2 px-3 focus:outline-none focus:ring-none sm:text-sm shadow-none"
                  onChange={(e) => handleChange("accessToken", e.target.value)}
                />
              </div>

              {/* API Key */}
              <div className="space-y-2 flex flex-col">
                <Label>API Key</Label>
                <Input
                  placeholder="API Key"
                  value={form.apiKey}
                  className="block w-full rounded-md bg-gray-100 text-black dark:text-white placeholder:text-gray-600 border py-2 px-3 focus:outline-none focus:ring-none sm:text-sm shadow-none"
                  onChange={(e) => handleChange("apiKey", e.target.value)}
                />
              </div>

              {/* API Secret */}
              <div className="space-y-2 flex flex-col">
                <Label>API Secret</Label>
                <div className="relative block w-full rounded-md bg-gray-100 text-black dark:text-white placeholder:text-gray-600 border focus:outline-none focus:ring-none sm:text-sm shadow-none">
                  <Input
                    placeholder="API Secret"
                    type={passwordVisible ? "text" : "password"}
                    value={form.apiSecret}
                    className="block w-full text-black dark:text-white placeholder:text-gray-600 bg-transparent focus:outline-none focus:ring-none sm:text-sm shadow-none"
                    onChange={(e) => handleChange("apiSecret", e.target.value)}
                  />
                  <Button
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    className="w-8 h-8 rounded-full p-1 absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {passwordVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="mt-2 w-fit">
                <Switch isSelected={form.isActive} onChange={(val) => handleChange("isActive", val)} className="flex items-center space-x-2">
                  <Switch.Content>
                    <Label>Active Store</Label>
                  </Switch.Content>

                  <Switch.Control className="bg-slate-200">
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>

            </div>
          </ModalContent>

          <ModalFooter className="gap-4">
            <Button isDisabled={isAddingStore} onPress={handleSubmit} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              {isAddingStore
                ? store
                  ? "Updating..."
                  : "Adding..."
                : store
                  ? "Update Store"
                  : "Add Store"
              }
            </Button>
          </ModalFooter>
          
        </ModalBody>
      </Modal>
    </div>
  );
}

const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};
