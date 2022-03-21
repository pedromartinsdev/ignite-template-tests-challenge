import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getBalanceUseCase: GetBalanceUseCase
let createStatementUseCase: CreateStatementUseCase 

describe("Create a new statement", () => {
  enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository(); 
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, userRepositoryInMemory)
    createStatementUseCase = new CreateStatementUseCase(userRepositoryInMemory, inMemoryStatementsRepository)
  });

  it("Should be able to create deposit statement", async () => {
    const user = await createUserUseCase.execute({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "senhasupersecreta123"
    })
    
    const depositStatement = await createStatementUseCase.execute({
      user_id: `${user.id}`,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "test"
    })
    const balance = await getBalanceUseCase.execute({user_id: user.id as string})
   
    expect(balance.balance).toBe(100)
  });

  it("Should be able to create withdraw statement", async () => {
    const user = await createUserUseCase.execute({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "senhasupersecreta123"
    })
    const depositStatement = await createStatementUseCase.execute({
      user_id: `${user.id}`,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "test"
    })
    const withdrawStatement = await createStatementUseCase.execute({
      user_id: `${user.id}`,
      type: OperationType.WITHDRAW,
      amount: 100,
      description: "test"
    })
    const balance = await getBalanceUseCase.execute({user_id: user.id as string})
   
    expect(balance.balance).toBe(0)
  });
}) 