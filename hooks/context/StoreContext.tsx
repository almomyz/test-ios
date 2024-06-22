import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Store } from "@/models/Store";
import axios from "axios";

interface StoreContextType {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

interface StoreProviderProps {
  children: ReactNode;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.224:3000/api/products/stores"
        ); // Replace with your API endpoint
        setStores(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stores");
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <StoreContext.Provider value={{ stores, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
