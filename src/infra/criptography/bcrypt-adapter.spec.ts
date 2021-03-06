import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Deve chamar o bcrypt com valores corretos', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('qualquer_valor')
    expect(hashSpy).toHaveBeenCalledWith('qualquer_valor', salt)
  })

  test('Deve retornar o hash caso dê sucesso', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('qualquer_valor')
    expect(hash).toBe('hash')
  })

  test('Deve retornar a excessão para quem o invocou', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('qualquer_valor')
    await expect(promise).rejects.toThrow()
  })
})
