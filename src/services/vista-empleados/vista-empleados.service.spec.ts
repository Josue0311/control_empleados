import { Test, TestingModule } from '@nestjs/testing';
import { VistaEmpleadosService } from './vista-empleados.service';

describe('VistaEmpleadosService', () => {
  let service: VistaEmpleadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VistaEmpleadosService],
    }).compile();

    service = module.get<VistaEmpleadosService>(VistaEmpleadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
