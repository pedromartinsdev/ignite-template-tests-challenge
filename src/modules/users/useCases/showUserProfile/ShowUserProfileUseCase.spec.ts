import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let createUser: CreateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    createUser = new CreateUserUseCase(userRepositoryInMemory)
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory)
  });

  it("Should be able to return a user profile", async () => {
    const user: ICreateUserDTO = {
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "senhasupersecreta123",
    }
    const result = await createUser.execute(user);

    await showUserProfileUseCase.execute(result.id as string)
  });
});