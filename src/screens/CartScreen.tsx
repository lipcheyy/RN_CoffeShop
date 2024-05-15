import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'

const CartScreen = () => {
  const CartList=useStore((state:any)=>state.cartList)
  console.log(CartList)
  return (
    <SafeAreaView>
      <Text>CartScreen</Text>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({})
export default CartScreen