// TODO: Args in enpoints that dont have Gql input types, and DTOS, for example "generateUsageExample" endpoint, shoud they get their own one prop dtos and inputs? Or, we should keep it like it is? Its matter becouse of safety and data validation.
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { OfficialCardService } from './official-card.service';
// import { OfficialCard } from './official-card.model';
import { AddTranslationDTO, CreateOfficialCardDTO, UpdateTranslationDTO } from './dto';
import {
  AddTranslationType,
  OfficialCardType,
  UpdateTranslationType,
  GenerateExpressionTranslationType,
} from './gql-types-inputs';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';
import { GenerateUsageExampleType } from './gql-types-inputs';
import { GenerateUsageExampleTranslationType } from './gql-types-inputs';

@Resolver(() => OfficialCardType)
export class OfficialCardResolver {
  constructor(private officialCardService: OfficialCardService) {}

  @Query(() => [OfficialCardType])
  async getOfficialCards(
    @Args('officialCardIds', { type: () => [String] }) officialCardIds: string[],
    @Args('languages', { type: () => [String] }) languages: string[]
  ): Promise<OfficialCardType[]> {
    const officialCards = await this.officialCardService.getOfficialCards(
      officialCardIds,
      languages
    );

    return officialCards;
  }

  @Mutation(() => OfficialCardType)
  async createOfficialCard(
    @Args('createOfficialCardInput') createOfficialCardInput: CreateOfficialCardDTO
  ): Promise<OfficialCardType> {
    const officialCard = await this.officialCardService.createOfficialCard(createOfficialCardInput);

    return officialCard;
  }

  @Mutation(() => AddTranslationType)
  async addTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('addTranslationInput') addTranslationInput: AddTranslationDTO
  ): Promise<AddTranslationType> {
    const addedTranslationMessage = await this.officialCardService.addTranslation(
      officialCardId,
      addTranslationInput
    );
    return { officialCardId, message: addedTranslationMessage };
  }

  @Mutation(() => UpdateTranslationType)
  async updateTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('updateTranslationInput') updatetranslationInput: UpdateTranslationDTO // TODO: should we accept empty string from client? Or we should create another enpoint for it?
  ): Promise<UpdateTranslationType> {
    const updatedTranslationMessage = await this.officialCardService.updateTranslation(
      officialCardId,
      updatetranslationInput
    );
    return { officialCardId, message: updatedTranslationMessage };
  }

  @Mutation(() => GenerateUsageExampleType)
  async generateUsageExample(
    @Args('officialCardId') officialCardId: string
  ): Promise<GenerateUsageExampleType> {
    const usageExample = await this.officialCardService.generateUsageExample(officialCardId);

    return { officialCardId, usageExample };
  }

  @Mutation(() => GenerateExpressionTranslationType)
  async generateExpressionTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('targetLanguage') targetLanguage: LanguagesSupportedByGoogleTranslate
  ): Promise<GenerateExpressionTranslationType> {
    const translatedExpression = await this.officialCardService.generateExpressionTranslation(
      officialCardId,
      targetLanguage
    );

    return { officialCardId, translatedExpression, targetLanguage };
  }

  @Mutation(() => GenerateUsageExampleTranslationType)
  async generateUsageExampleTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('targetLanguage') targetLanguage: LanguagesSupportedByGoogleTranslate
  ) {
    const usageExampleTranslation =
      await this.officialCardService.generateUsageExampleTranslationWithOpenAI(
        officialCardId,
        targetLanguage
      );

    return { officialCardId, usageExampleTranslation };
  }
}
