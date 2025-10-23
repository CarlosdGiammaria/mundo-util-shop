import sistemaSolar from "../assets/sistema_solar.jpeg";
import celulaAnimal from "../assets/celula_animal.jpg";
import relieveColombiano from "../assets/relieve_colombiano.jpg";

import type { Product } from "../types";

export const mockProducts: Product[] = [
  { 
    id: "1", 
    name: "Maqueta Sistema Solar - Modelo A", 
    materials: "Cartón y pintura", 
    price: 120000, 
    image: sistemaSolar
  },
  { 
    id: "2", 
    name: "Maqueta Célula Animal", 
    materials: "Plastilina y papel", 
    price: 90000, 
    image: celulaAnimal
  },
  { 
    id: "3", 
    name: "Maqueta Relieve Colombiano", 
    materials: "Yeso y pintura", 
    price: 220000, 
    image: relieveColombiano
  },
];
