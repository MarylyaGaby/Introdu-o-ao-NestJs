import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
//import { PrismaService } from "src/prisma/prisma.service"
import { PrismaService } from '../prisma/prisma.service'
import { NotFoundException } from "@nestjs/common"

const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

// Testes para o UsersService
// Aqui estamos criando uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
  let service: UsersService;

  // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // Testes individuais
  // Aqui definimos os testes individuais para cada funcionalidade do UsersService
  //01. Teste do método UsersService.create
  it("deve criar um usuário", async () => {
    const userDataDto = { 
        name: "Jonas",
        email: "jonas@example.com" 
    };
    mockPrisma.user.create.mockResolvedValue(userDataDto);

    const result = await service.create(userDataDto as any);
    expect(result).toEqual(userDataDto);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: userDataDto });
  });

  //02. Teste para o método UsersService. findAll
  it("deve listar todos os usuários", async () => {
    const users = [
      { id: 1, name: "Jonas", email: "jonas@example.com"},
      { id: 2, name: "Marilia", email: "marilia@example.com"},
    ];
    mockPrisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
   });

  it("deve retornar um usuário pelo ID", async () => {
    const user = { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" };
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await service.findOne("1");
    expect(result).toEqual(user);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  it("deve lançar erro se o usuário não for encontrado", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne("999")).rejects.toThrow(NotFoundException);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "999" },
    });
   });

  it("deve atualizar um usuário", async () => {
    const updated = { id: 1, name: "João", email: "joao@example.com", password: "123" };
    mockPrisma.user.update.mockResolvedValue(updated);

    const result = await service.update("1", updated as any);
    expect(result).toEqual(updated);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: updated,
    });
   });

   it("deve deletar um usuário", async () => {
    const removed = { id: 1, name: "Jonas", email: "jonas@example.com", password: "123" };
    mockPrisma.user.delete.mockResolvedValue(removed);

    const result = await service.remove("1");
    expect(result).toEqual(removed);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });
});

// Executar os  testes: npm test
