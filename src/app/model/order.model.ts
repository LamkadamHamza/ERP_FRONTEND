export interface Orders {


  id: string;
  dateCreation : string;
  dateLivrision: string;
  status :string;
  Contratfile :string;
  IdCustomer : number;
  IdProduct : string;
  IdSite : number;




}

export  enum StatusOrder{
  CREATED ,PROCESSING ,COMPLETED
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
