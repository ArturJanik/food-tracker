export interface FoodModel {
    id: string;
    name: string;
    unit: string;
    amount: number;
    kcal: number;
    prot: number;
}

export type FoodDraft = Omit<FoodModel, 'id'>;
