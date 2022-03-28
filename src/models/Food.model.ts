export interface FoodModel {
    id: number;
    name: string;
    unit: string;
    amount: number;
    kcal: number;
    prot: number;
}

export type FoodDraft = Omit<FoodModel, 'id'>;
