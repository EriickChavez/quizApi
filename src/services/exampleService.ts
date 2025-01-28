import { exampleModel } from "../models/exampleModel";

export const exampleService = {
  getData: async () => {
    return await exampleModel.find();
  },
  createData: async (data: any) => {
    return await exampleModel.create(data);
  },
};
