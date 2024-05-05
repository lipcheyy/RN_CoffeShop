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
            cartPrice:0
        }),
        {
            name:'coffee-app',
            storage:createJSONStorage(()=>AsyncStorage)
        }
    )
)
// import {create} from 'zustand';
// import {produce} from 'immer';
// import {persist, createJSONStorage} from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CoffeeData from '../data/CoffeData';
// import BeansData from '../data/BeansData';

// export const useStore = create(
//   persist(
//     (set, get) => ({
//         coffeList:CoffeeData,
//         beanList:BeansData,
//         favoritesList:[],
//         cartList:[],
//         orderHistoryList:[],
//         cartPrice:0,
//       OrderHistoryList: [],
      
//     }),
//     {
//       name: 'coffee-app',
//       storage: createJSONStorage(() => AsyncStorage),
//     },
//   ),
// );