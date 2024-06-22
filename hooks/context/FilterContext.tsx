import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    Dispatch,
} from "react";

// Define the shape of the filter state
interface FilterState {
    brands: number[];
    selectedBrands: number[];
    categories: number[];
    selectedCategories: number[];
    stores: number[];
    selectedStores: number[];
    priceRange: number[];
    search: string;
    page: number;
}

// Define the action types
type FilterAction =
    | { type: "SET_BRANDS"; payload: number[] }
    | { type: "SET_SELECTED_BRANDS"; payload: number[] }
    | { type: "SET_CATEGORIES"; payload: number[] }
    | { type: "SET_SELECTED_CATEGORIES"; payload: number[] }
    | { type: "SET_STORES"; payload: number[] }
    | { type: "SET_SELECTED_STORES"; payload: number[] }
    | { type: "SET_PRICE_RANGE"; payload: number[] }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_PAGE"; payload: number }
    | { type: "RESET_FILTERS" };

// Define the initial state
const initialState: FilterState = {
    brands: [],
    selectedBrands: [],
    categories: [],
    selectedCategories: [],
    stores: [],
    selectedStores: [],
    priceRange: [10, 10000],
    search: "",
    page: 1,
};

// Create the reducer function
const filterReducer = (
    state: FilterState,
    action: FilterAction
): FilterState => {
    switch (action.type) {
        case "SET_BRANDS":
            return { ...state, brands: action.payload };
        case "SET_SELECTED_BRANDS":
            return { ...state, selectedBrands: action.payload, page: 1 };
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload };
        case "SET_SELECTED_CATEGORIES":
            return { ...state, selectedCategories: action.payload, page: 1 };
        case "SET_STORES":
            return { ...state, stores: action.payload };
        case "SET_SELECTED_STORES":
            return { ...state, selectedStores: action.payload, page: 1 };
        case "SET_PRICE_RANGE":
            return { ...state, priceRange: action.payload, page: 1 };
        case "SET_SEARCH":
            return { ...state, search: action.payload, page: 1 };
        case "SET_PAGE":
            return { ...state, page: action.payload };
        case "RESET_FILTERS":
            return initialState;
        default:
            return state;
    }
};

// Create the context with a default value
const FilterContext = createContext<{
    state: FilterState;
    dispatch: Dispatch<FilterAction>;
}>({ state: initialState, dispatch: () => null });

// Define the provider component
interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

// Create a custom hook to use the FilterContext
export const useFilter = () => useContext(FilterContext);
