export type Guitarra = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export type CarritoItem = Guitarra &{
  cantidad: number
}
