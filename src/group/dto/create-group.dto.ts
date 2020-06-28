import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupDTO {
  @IsNotEmpty()
  groupName: string;

  @IsNotEmpty()
  voteEndDt: Date;

  @IsOptional()
  minPrice: number;

  @IsOptional()
  maxPrice: number;

  @IsOptional()
  emails: string[];
}
