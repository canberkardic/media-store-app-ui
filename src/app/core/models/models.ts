


export interface Product {
  productId? : number
  name?: string
  genre?: string
  releaseDate?: string
  basePrice?: string
  category? : string

  attributes : ProductAttributes[];
}

export interface ProductAttributes {
  attributeName : string
  attributeValue : string
}

