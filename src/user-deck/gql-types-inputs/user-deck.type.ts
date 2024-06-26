import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserDeckType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  deckOwner: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;

  @Field(() => [ID])
  cards: string[];
}
