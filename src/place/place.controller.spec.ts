import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { CloudinaryService } from "./cloudinary.service";
import { Place, placeType } from "@prisma/client";



describe("PlaceController testes", ()=> {

    let controller: PlaceController;
    let placeService: jest.Mocked<PlaceService>;
    let cloudinaryService: jest.Mocked<CloudinaryService>;

    beforeEach(async () => {
        const mockPlaceService = {
            findAll: jest.fn(),
            findPaginated: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        } as any;

        const mockCloudinaryService = {
            uploadImage: jest.fn(),
            deleteImage: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceController],
            providers: [
                {provide: PlaceService, useValue: mockPlaceService},
                {provide: CloudinaryService, useValue: mockCloudinaryService}
            ]
        }).compile()

        controller = module.get<PlaceController>(PlaceController);
        placeService = module.get(PlaceService);
        cloudinaryService = module.get(CloudinaryService);
    });

    // "Deve listar todos os locais"
    
    it("Deve listar todos os locais", async () => {
    const places: Place[] = [
        {
            id: "1", 
            name: "Baron",
            type: placeType.RESTAURANTE,
            phone: "(88) 4002-8922",
            latitude: -12344,
            longitude: 12345,
            images: [],
            created_at: new Date()
    }]
    placeService.findAll.mockResolvedValue(places);

    expect(await controller.findAll()).toEqual(places)
  });

    // "Deve listar locais paginados"

    it("Deve listar locais paginados", async () => {
    const places: Place[] = [
     {
      id: "1",
      name: "Baron",
      type: placeType.RESTAURANTE,
      phone: "(88) 4002-8922",
      latitude: -23.5505,
      longitude: -46.6333,
      images: [],
      created_at: new Date()
    }
  ];

  const page = 1;
  const limit = 10;

  // simula o retorno paginado do serviço
  placeService.findPaginated.mockResolvedValue({
    data: places,
    meta: {
      total: 1,
      page,
      lastPage: 1
    }
  });

  expect(await controller.findPaginated()).toEqual({
    data: places,
    meta: {
      total: 1,
      page,
      lastPage: 1
    }
  });

  })
});