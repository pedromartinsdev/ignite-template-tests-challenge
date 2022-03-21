import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getBalanceUseCase: GetBalanceUseCase
let createStatementUseCase: CreateStatementUseCase 

describe("Get balance", () => {
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

  it("Should be able to list all operations and subtotal", async () => {
    const user = await createUserUseCase.execute({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "senhasupersecreta123"
    })
    
    const statementDeposit = await createStatementUseCase.execute({
      user_id: `${user.id}`,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "test"
    })
    const statementWithdraw = await createStatementUseCase.execute({
      user_id: `${user.id}`,
      type: OperationType.WITHDRAW,
      amount: 45,
      description: "test"
    })

    const balance = await getBalanceUseCase.execute({user_id: user.id as string})

    expect(balance).toHaveProperty("balance")
  });
})  
