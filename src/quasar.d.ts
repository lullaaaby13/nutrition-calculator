import Ingredient from 'src/types/ingredient';

declare global {
  interface Window {
    ingredients: {
      list: () => Promise<any[]>;
      save: (ingredient: string) => Promise<void>;
    }
  }
}
