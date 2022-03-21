import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository
let createStatementUseCase: CreateStatementUseCase
let getStatementOperationUseCase: GetStatementOperationUseCase

describe("Get operation", () => {
  enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository(); 
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(userRepositoryInMemory, inMemoryStatementsRepository)
    getStatementOperationUseCase = new GetStatementOperationUseCase(userRepositoryInMemory, inMemoryStatementsRepository)
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

    const operationsInfo = await getStatementOperationUseCase.execute({ user_id: user.id as string, statement_id: statementDeposit.id as string })
    
    console.log(operationsInfo)

    expect(operationsInfo).toHaveProperty("type")
  });
})  
