import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUser: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Create Category", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUser = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    await createUser.execute({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "password"
    })
  });
});
