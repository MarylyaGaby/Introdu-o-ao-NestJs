import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/create-user.dto';
import { ApiBody,ApiOperation,ApiResponse, ApiParam, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}
   /*//Rota de criar usário
   @Post()
   @ApiOperation({summary:'Criar um novo usuário'})
   @ApiBody({type: CreateUserDto})
   @ApiResponse({status:201, description: 'Usuário criado com sucesso'})
    create(@Body() data: CreateUserDto) {
        return this.usersService.create(data);
  }
*/
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Get()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    findAll() {
        return this.usersService.findAll();
    }


@Get(':id')
@ApiOperation({ summary: 'Buscar um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

@Put(':id')
@ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
    @ApiBody({ type: UpdateUserDto })
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.usersService.update(id, data);
    }

@Delete(':id')
 @ApiOperation({ summary: 'Remover um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
    }


