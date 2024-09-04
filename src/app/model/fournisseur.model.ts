export interface Fournisseur {
  fourncodeint: number;
  fourncodeext: number;
  fourlibl: string;
  fouretat: string;
  fourtype: string;
  fournatu: string;
  fourtaxe: number;
  fourtva: number;
  fourcre: string;
  fourmaj: string;
  fourutil: string;
}

export  enum FournisseurEtat{
  ACTIF, GELE,SUPPRIMER
}


export  enum FournisseurType{
  EXTERNE,TRANSIT, CENTRAL
}

export  enum FournisseurNature{
  MARCHANDISE, TRANSPORT
}
