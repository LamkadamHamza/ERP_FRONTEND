export interface Product {

  id : number,
  name : string,
  PRODCINT : number,
  PRODCEXT :string,
  productType :string,
  productNature :string,
  productEtat : string,
  productGestion : string,
  PRODDCRE :string,
  PRODDMAJ:string,
  price : number,
  quantity : number




}



export  enum ProductType{
  USUELLE,FLM,GENERIQUE,SERVICE,KIT,FABRIQUE,VARIANTE,ALCOOL
}
export  enum ProductNature{
  DEFAUT,ELECTROMENAGER,ALIMENTAIRE,LIQUIDE,SPORT,JOUET,TEXTILE,JARDIN,INFORMATIQUE,SERVICE
}

export  enum ProductEtat{
  ACTIVE,SUPPRIME,GELE,GELEVENTE,GELEACHAT
}

export  enum ProductGestion{
  DEFAUT, FRAIS, PGC
}
