type Resident = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    id: string;
}

export enum Currency {
    GCS= "GCS",
    ICS= "ICS"
}

export enum TransactionStatus {
    Completed = "completed",
    Blocked = "blocked",
    InProgress = "inProgress"
}

type Transaction = {
    id: string;
    currency: Currency;
    amount: number;
    user: string;
    date: string;
    status: TransactionStatus;
}

export type Planet = {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: Resident[];
    films: string[];
    created: string;
    edited: string;
    id: string;
    transactions: Transaction[];
}