import { IsArray,IsString} from 'class-validator';

export class CreateNotficationDto {
  @IsString()
  public type: string;
  @IsString()
  public provider: string;

  @IsString()
  public title: string;

  @IsString()
  public body: string;

  @IsArray()
  public consumers: string[];

}
