import { Test, TestingModule } from '@nestjs/testing';
import { VistaEmpleadosController } from './vista-empleados.controller';

describe('VistaEmpleadosController', () => {
  let controller: VistaEmpleadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VistaEmpleadosController],
    }).compile();

    controller = module.get<VistaEmpleadosController>(VistaEmpleadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
