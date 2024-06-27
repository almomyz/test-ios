export interface Categories {
    id: number;
    Name: string;
    Image: string | null;
    Parent_Category_ID: number | null;
    createdAt: string;
    updatedAt: string;
    SubcategoriesLevel1?: SubcategoryLevel1[];
}

export interface SubcategoryLevel1 {
    id: number;
    Name: string;
    Image: string | null;
    Parent_Category_ID: number;
    createdAt: string;
    updatedAt: string;
    SubcategoriesLevel2?: SubcategoryLevel2[];
}

export interface SubcategoryLevel2 {
    id: number;
    Name: string;
    Image: string | null;
    Parent_Category_ID: number;
    createdAt: string;
    updatedAt: string;
}
