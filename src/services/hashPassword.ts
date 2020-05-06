import bcrypt from 'bcrypt'

export default async function hashPassword (password: string): Promise<string> {
  const saltRounds = 10

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
      if (err) return reject(err)
      bcrypt.hash(password, salt, (err: any, hash : string) => {
        if (err) return reject(err)
        resolve(hash)
      })
    })
  })
}

export async function comparePassword (password: string, hash : string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
