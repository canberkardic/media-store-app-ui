


interface Product {
  id? : number
  name?: string
  genre?: string
  releaseDate?: string
  basePrice?: string
  category? : string

  attributes? : ProductAttributes[]
}

interface ProductAttributes {
  attributeName : string
  attributeValue : string
}

export {
  Product,
  ProductAttributes
}
