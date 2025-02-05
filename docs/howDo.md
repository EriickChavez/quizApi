Como crear un nuevo endpoint

5 - crear el archivo de servicio en `src/services/example/exampleService.ts`

```typescript
import { IExampleRepository } from "../../repositories/interfaces/exampleRepository";

export class ExampleService {
  private exampleRepository: IExampleRepository;

  constructor(exampleRepository: IExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async createExample(example: Omit<IExample, "id">) {
    const newExample = await this.exampleRepository.createExample(example);
    return newExample;
  }
}
```

4 - crear interface de la instancia en `src/repositories/interfaces/exampleRepository.ts`

```typescript
import { Document } from "mongoose";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";

export interface IExample {
  id: string;
  name: string;
  icon?: string;
}

// @ts-ignore
export interface IExampleDocument extends IExample, Document {}

export interface IExampleRepository {
  createExample(example: Omit<IExample, "id">): Promise<IExampleDocument>;
}
```

3 - crear una nueva instancia en el archivo `src/services/instances/exampleServiceInstance.ts`

```typescript
import { LocalCategoryRepository } from "../../repositories/categoryLocalRepository";
import { ExampleService } from "../example/exampleService";

/* 
    TENER EN CUENTA QUE LocalExampleRepository ES PARA QUE SE PUEA USAR DE MANERA LOCAL, SOLO DE PRUEBAS.

    HAY QUE CONECTARLO A LA BASE DE DATOS CON MYSQL O MONGODB
*/
// Crear una instancia del repositorio
const exampleRepository = new LocalExampleRepository();

// Crear una instancia de QuestionService con el repositorio inyectado
export const exampleServiceInstance = new ExampleService(exampleRepository);
```

2 - Crear un archivo en `src/controller/example/exampleController.ts`

```typescript
import { Request, Response } from "express";
import { sendResponse } from "../../utils/apiResponse";

...
export const createExample = async (req: Request, res: Response) => {
  try {
    const example = await exampleServiceInstance.createExample(req.body);
    sendResponse(res, 201, "Example created successfully", example);
  } catch (error: any) {
    sendResponse(res, 500, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};
```

1 - Crear un archivo `exampleRoutes.ts` en la carpeta `src/routes`

```typescript
import { Router } from "express";
import {
  createExample,
  createMultiExample,
  deleteExample,
  getExample,
  updateExample,
} from "../controller/example/exampleController";

const router = Router();

const exampleRoutes = (app: Router) => {
  app.use("/example", router);

  router.post("/create", createExample);
  router.post("/createMulti", createMultiExample);
  router.get("/get", getExample);
  router.put("/update", updateExample);
  router.delete("/delete", deleteExample);
};

export default categoryRoutes;
```
