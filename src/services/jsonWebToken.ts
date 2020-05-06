import jsonwebtoken from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || ''

export async function sign (data: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign({ data }, secret, { expiresIn: '1h' }, function (err, token) {
      if (err) reject(err)
      resolve(token)
    })
  })
}

export async function verify (token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, function (err, decoded) {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}
