import {create} from 'zustand';
import { produce } from 'immer';
import {persist,createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeData';
import BeansData from '../data/BeansData';

export const useStore=create(
    persist(
        (set,get)=>({
            coffeList:CoffeeData,
            beanList:BeansData,
            favoritesList:[],
            cartList:[],
            orderHistoryList:[],
            cartPrice:0,
            addToCart: (cartItem: any) =>
              set(
                produce(state => {
                  let found = false;
                  for (let i = 0; i < state.cartList.length; i++) {
                    if (state.cartList[i].id == cartItem.id) {
                      found = true;
                      let size = false;
                      for (let j = 0; j < state.cartList[i].prices.length; j++) {
                        if (
                          state.cartList[i].prices[j].size == cartItem.prices[0].size
                        ) {
                          size = true;
                          state.cartList[i].prices[j].quantity++;
                          break;
                        }
                      }
                      if (size == false) {
                        state.cartList[i].prices.push(cartItem.prices[0]);
                      }
                      state.cartList[i].prices.sort((a: any, b: any) => {
                        if (a.size > b.size) {
                          return -1;
                        }
                        if (a.size < b.size) {
                          return 1;
                        }
                        return 0;
                      });
                      break;
                    }
                  }
                  if (found == false) {
                    state.cartList.push(cartItem);
                  }
                }),
              ),
            calcCartPrice:()=>set(produce(state=>{
                let totalPrice=0;
                for(let i=0;i<state.cartList.length;i++){
                    let tempPrice=0;
                    for(let j=0;j<state.cartList[i].prices.length;j++){
                        tempPrice=tempPrice+parseFloat(state.cartList[i].prices[j].price)*state.cartList[i].prices[j].quantity
                    }
                    state.cartList[i].itemPrice=tempPrice.toFixed(2).toString();
                    totalPrice=totalPrice+tempPrice
                }
                state.cartPrice=totalPrice.toFixed(2).toString();
            })),
            addToFavoriteList: (type: string, id: string) =>
                set(
                  produce(state => {
                    if (type == 'Coffee') {
                      for (let i = 0; i < state.coffeList.length; i++) {
                        if (state.coffeList[i].id == id) {
                          if (state.coffeList[i].favourite == false) {
                            state.coffeList[i].favourite = true;
                            state.favoritesList.unshift(state.coffeList[i]);
                          } else {
                            state.coffeList[i].favourite = false;
                          }
                          break;
                        }
                      }
                    } else if (type == 'Bean') {
                      for (let i = 0; i < state.beanList.length; i++) {
                        if (state.beanList[i].id == id) {
                          if (state.beanList[i].favourite == false) {
                            state.beanList[i].favourite = true;
                            state.favoritesList.unshift(state.beanList[i]);
                          } else {
                            state.beanList[i].favourite = false;
                          }
                          break;
                        }
                      }
                    }
                  }),
                ),
              deleteFromFavoriteList: (type: string, id: string) =>
                set(
                  produce(state => {
                    if (type == 'Coffee') {
                      for (let i = 0; i < state.coffeList.length; i++) {
                        if (state.coffeList[i].id == id) {
                          if (state.coffeList[i].favourite == true) {
                            state.coffeList[i].favourite = false;
                          } else {
                            state.coffeList[i].favourite = true;
                          }
                          break;
                        }
                      }
                    } else if (type == 'Beans') {
                      for (let i = 0; i < state.beanList.length; i++) {
                        if (state.beanList[i].id == id) {
                          if (state.beanList[i].favourite == true) {
                            state.beanList[i].favourite = false;
                          } else {
                            state.beanList[i].favourite = true;
                          }
                          break;
                        }
                      }
                    }
                    let spliceIndex = -1;
                    for (let i = 0; i < state.favoritesList.length; i++) {
                      if (state.favoritesList[i].id == id) {
                        spliceIndex = i;
                        break;
                      }
                    }
                    state.favoritesList.splice(spliceIndex, 1);
                  }),
                ),
                incrementCartItemQuantity: (id: string, size: string) =>
                    set(
                      produce(state => {
                        for (let i = 0; i < state.cartList.length; i++) {
                          if (state.cartList[i].id == id) {
                            for (let j = 0; j < state.cartList[i].prices.length; j++) {
                              if (state.cartList[i].prices[j].size == size) {
                                state.cartList[i].prices[j].quantity++;
                                break;
                              }
                            }
                          }
                        }
                      }),
                    ),
            decrementCartItemQuantity: (id: string, size: string) =>
            set(
            produce(state => {
                for (let i = 0; i < state.cartList.length; i++) {
                if (state.cartList[i].id == id) {
                    for (let j = 0; j < state.cartList[i].prices.length; j++) {
                    if (state.cartList[i].prices[j].size == size) {
                        if (state.cartList[i].prices.length > 1) {
                        if (state.cartList[i].prices[j].quantity > 1) {
                            state.cartList[i].prices[j].quantity--;
                        } else {
                            state.cartList[i].prices.splice(j, 1);
                        }
                        } else {
                        if (state.cartList[i].prices[j].quantity > 1) {
                            state.cartList[i].prices[j].quantity--;
                        } else {
                            state.cartList.splice(i, 1);
                        }
                        }
                        break;
                    }
                    }
                }
                }
            }),
            ),
        }),
        {
            name:'coffe-app',
            storage:createJSONStorage(()=>AsyncStorage)
        }
    )
)