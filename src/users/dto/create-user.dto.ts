import { ApiProperty , PartialType} from '@nestjs/swagger';
import{ IsEmail, IsNotEmpty} from "class-validator"


export class CreateUserDto {
@ApiProperty({ 
    example: 'Jonas Fortes',
    description: 'Nome completo do usuário'
})
@IsNotEmpty({message:'O nome é obrigatório'})
name: string;

@ApiProperty({
     example: 'jonas@example.com',
      description: 'Email do usuário'
})
@IsEmail({},{message:"O email deve ser um endereço válido!"})
email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}