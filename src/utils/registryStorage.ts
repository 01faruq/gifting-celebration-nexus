
export interface RegistryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  reservedBy?: string;
}

export interface Registry {
  id: string;
  title: string;
  eventType: string;
  eventDate: string;
  message: string;
  items: RegistryItem[];
  createdAt: string;
  userId: string;
}

export const saveRegistry = (registryData: Omit<Registry, 'id' | 'createdAt'>) => {
  const existingRegistries = getRegistries();
  const newRegistry: Registry = {
    ...registryData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  existingRegistries.push(newRegistry);
  localStorage.setItem("gifty-registries", JSON.stringify(existingRegistries));
  return newRegistry;
};

export const getRegistries = (): Registry[] => {
  const data = localStorage.getItem("gifty-registries");
  return data ? JSON.parse(data) : [];
};

export const getRegistry = (id: string): Registry | null => {
  const registries = getRegistries();
  return registries.find(r => r.id === id) || null;
};

export const updateRegistry = (id: string, updates: Partial<Registry>) => {
  const registries = getRegistries();
  const index = registries.findIndex(r => r.id === id);
  if (index !== -1) {
    registries[index] = { ...registries[index], ...updates };
    localStorage.setItem("gifty-registries", JSON.stringify(registries));
    return registries[index];
  }
  return null;
};

export const reserveItem = (registryId: string, itemId: string, guestName: string) => {
  const registries = getRegistries();
  const registryIndex = registries.findIndex(r => r.id === registryId);
  
  if (registryIndex !== -1) {
    const itemIndex = registries[registryIndex].items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1 && !registries[registryIndex].items[itemIndex].reservedBy) {
      registries[registryIndex].items[itemIndex].reservedBy = guestName;
      localStorage.setItem("gifty-registries", JSON.stringify(registries));
      return true;
    }
  }
  return false;
};
