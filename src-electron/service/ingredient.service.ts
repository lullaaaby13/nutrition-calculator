import {Injectable, Logger} from '@nestjs/common';
import Ingredient from '../domain/ingredient';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import CreateIngredientDto from 'app/src-electron/dto/create-ingredient.dto';


@Injectable()
export default class IngredientService {

  private readonly logger = new Logger(IngredientService.name);
  constructor(
    @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>,
  ) {
  }

    async list(): Promise<Ingredient[]> {
        return this.ingredientRepository.find();
    }

    async save(request: CreateIngredientDto) {
      try {
        const ingredient = new Ingredient();
        ingredient.name = request.name;
        ingredient.category = request.category;
        ingredient.memo = request.memo;
        ingredient.calories = request.calories;
        ingredient.unitPrice = request.unitPrice;
        ingredient.carbohydrates = request.carbohydrates;
        ingredient.sugars = request.sugars;
        ingredient.protein = request.protein;
        ingredient.caffeine = request.caffeine;
        ingredient.fat = request.fat;
        ingredient.saturatedFat = request.saturatedFat;
        ingredient.updatedAt = new Date();
        await this.ingredientRepository.save(ingredient);
        this.logger.log(`원재료 저장 완료: ${ingredient.name}`);
      } catch (e){
        this.logger.error(`원재료 저장 실패: ${e.message}`, e);
      }
    }



}
