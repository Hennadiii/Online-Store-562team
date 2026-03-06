// Типи відповідають ProductDto на бекенді

export interface CharacteristicsDto {
    material: string;
    upholstery: string;
    functionality: string;
  }
  
  export interface ProductDto {
    id: number;
    title: string;
    price: number;
    description: string;
    fullDescription: string;
    category: string;
    producer: string;
    popular: boolean;
    images: string[];
    characteristics: CharacteristicsDto;
  }
  
  // Відповідає PaginatedResponse<T> на бекенді
  export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; // поточна сторінка (0-based на бекенді)
    size: number;
  }
  
  // Параметри фільтрації
  export interface ProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    producer?: string;
  }
  
  // Параметри запиту списку товарів
  export interface GetProductsParams {
    filter?: ProductFilter;
    sort?: string;
    order?: "asc" | "desc";
    page: number;      // 0-based (бекенд)
    pageSize: number;
  }