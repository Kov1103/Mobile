import { create } from 'zustand';

export interface Item {
  id: string;
  name: string;
  image: string[]; // Assuming the image is a URL or a local path
  category: string[];
  color: string[];
}

export interface CategoryProps {
  items: Item[]; 
}

interface ItemState {
    items: CategoryProps;
    setItems: (items: CategoryProps) => void; // Function to set items
}

export const useItemStore = create<ItemState>((set) => ({
    items: { items: [] }, 
    setItems: (items) => set({ items }) 
}));
