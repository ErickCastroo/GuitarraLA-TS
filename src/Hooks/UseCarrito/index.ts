import { useState, useEffect, useMemo} from 'react'
import type { Guitarra, CarritoItem } from '../../Types/guitarra'

import { db } from '../../Data/Db/Data'

const useCarrito = ()  => {
  
  const initialCarrito = () : CarritoItem[] => {
    const localStorageCarrito = localStorage.getItem('carrito')
    return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
  }

  const [guitarras, setGuitarras] = useState<Guitarra[]>([])
  const [carrito, setCarrito] = useState<CarritoItem[]>(initialCarrito)

  const maxItems = 10
  const minItems = 1

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  useEffect(() => {
    setGuitarras(db)
  }, [])

  const handleAddToCart = (item: Guitarra) => {
    const itemExist = carrito.findIndex(guitarra => guitarra.id === item.id)
    if (itemExist >= 0) {
      if (carrito[itemExist].cantidad >= maxItems) return
      const updateCarrito = [...carrito]
      updateCarrito[itemExist].cantidad++
      setCarrito(updateCarrito)
    } else {
      const nuevoItem : CarritoItem = {...item, cantidad: 1}
      setCarrito([...carrito, nuevoItem])
    }
  }

  const handleRemove = (id: Guitarra['id']) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((guitarra) => guitarra.id !== id)
    )
  }

  const additemToCart = (id: Guitarra['id']) => {
    const ActualizarCarrito = carrito.map((item) => {
      if (item.id === id && item.cantidad < maxItems) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        }
      }
      return item
    })
    setCarrito(ActualizarCarrito)
  }

  const minItemToCart = (id: Guitarra['id']) => {
    const Actualizarcart = carrito.map((item) => {
      if (item.id === id && item.cantidad > minItems) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        }
      }
      return item
    })
    setCarrito(Actualizarcart)
  }

  const clearCart = () => {
    setCarrito([])
  }

    //state derivado
    const isEmpty = useMemo(() => carrito.length === 0, [carrito])
    const carritoTotal = useMemo(
      () =>
        carrito.reduce((total, item) => total + item.cantidad * item.price, 0),
      [carrito]
    )

  return {
    guitarras,
    carrito,
    handleAddToCart,
    handleRemove,
    additemToCart,
    minItemToCart,
    clearCart,
    isEmpty,
    carritoTotal,
  }
}

export { useCarrito }
