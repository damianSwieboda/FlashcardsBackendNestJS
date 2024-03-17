import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTextTranslate } from 'src/enums/suported-languages';

@InputType()
export class TranslationDTO {
  @IsEnum(LanguagesSupportedByGoogleTextTranslate) // TODO: change to "supportedLanguages" once the final list is complete
  @Field()
  language: string;

  @IsNotEmpty({ message: 'At least one word is required to create a flashcard' })
  @IsString()
  @Field()
  word: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  usageExample?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  translatedWord?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  translatedUsageExample?: string;
}
