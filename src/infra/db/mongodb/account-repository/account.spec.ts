import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })
  afterAll(async () => { await MongoHelper.disconnect() })

  test('Deve retornar um account caso dê sucesso', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'qualquer_nome',
      email: 'qualquer_email@gmail.com',
      password: 'qualquer_senha'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('qualquer_nome')
    expect(account.email).toBe('qualquer_email@gmail.com')
    expect(account.password).toBe('qualquer_senha')
  })
})
