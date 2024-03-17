import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateUsageExampleInput {
  @Field()
  expressionToTranslate: string;

  @Field()
  sourceLanguage: string;

  @Field()
  targetLanguage: string;
}
