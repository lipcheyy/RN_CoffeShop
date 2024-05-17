import { StyleSheet, Text,FlatList, View ,SafeAreaView, ScrollView,TouchableOpacity,TextInput, Dimensions, Alert} from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/store'
import Toast from 'react-native-toast-message';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { StatusBar } from 'expo-status-bar'

import HeaderBar from '../components/HeaderBar'
import { SearchBar } from 'react-native-screens';

import CoffeCard from '../components/CoffeCard';
import { AntDesign } from '@expo/vector-icons';

const getCategory = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeList=(category:string,data:any)=>{
    if(category=='All'){
      return data;
    }else{
      let coffelist=data.filter((item:any)=>item.name==category);
      return coffelist
    }
}

const HomeScreen = ({navigation}:any) => {
  const coffeList=useStore((state:any)=>state.coffeList);
  const beanList=useStore((state:any)=>state.beanList)
  
//cart
const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calcCartPrice);
  //cart/

  const [categories,setCategory]=useState(getCategory(coffeList))
  const [searchText,setSearchText]=useState('')
  const [categoryId,setCategoryId]=useState({
    index:0,
    category:categories[0],
  })
  const [sortedCoffe,setSorted]=useState(getCoffeList(categoryId.category, coffeList))
  const ListRef:any=useRef<FlatList>()
  const tabBarHeight=useBottomTabBarHeight()
  // console.log('====================================');
  // console.log(sortedCoffe[0]);
  // console.log('====================================');
  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryId({index: 0, category: categories[0]});
      setSorted([
        ...coffeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };
  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryId({index: 0, category: categories[0]});
    setSorted([...coffeList]);
    setSearchText('');
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    Alert.alert("Success",`${name} add to cart`)
    
  };
  
  return (
    <View style={styles.mainContainer}>
      
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}>
          
          <HeaderBar />
          
          <Text style={styles.heading}>Find the best{'\n'}coffe for you</Text>
     
     
      {/* search bar */}
        <View style={styles.searchBar}>
          <TouchableOpacity
            onPress={() => {
              searchCoffee(searchText);
            }}>
            <Ionicons name="search"
              style={styles.searchIcon}
              size={24} 
              color={searchText.length>0
                    ?COLORS.primaryOrangeHex
                    :COLORS.primaryLightGreyHex} />
            
          </TouchableOpacity>
          <TextInput placeholder='find coffe...' 
            value={searchText}
            onChangeText={text=>{setSearchText(text); searchCoffee(text)}}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.searchText}/>
            {searchText.length>0?(
              <TouchableOpacity 
                onPress={() => {
                resetSearchCoffee();
              }}>
                <AntDesign name="closecircle" size={18} color={COLORS.primaryLightGreyHex} style={styles.searchIcon}/>
              </TouchableOpacity>)
              :(<></>)}
          
        </View>
        {/* category component */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
            {categories.map((data,index)=>(
              <View
                key={index.toString()}
                style={styles.categoryView}>
                <TouchableOpacity 
                  style={styles.touchableOpacity}
                  onPress={()=>{
                    ListRef?.current?.scrollToOffset({
                      animated:true,
                      offset:0
                    })
                    setCategoryId({index:index,category:categories[index]})
                    setSorted([...getCoffeList(categories[index], coffeList)])
                  }}>
                  <Text style={[
                    styles.categoryTextActive,
                    categoryId.index==index?{color:COLORS.primaryOrangeHex}:{}
                    ]}>
                    {data}
                  </Text>
                  {categoryId.index==index
                  ?<View style={styles.categoryActive}></View>
                  :<></>}
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
        {/* coffe list */}
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffe}
          contentContainerStyle={styles.sortedCoffeListContainer}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <TouchableOpacity>
                  <CoffeCard 
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={()=>{}}
                  />
              </TouchableOpacity>
            )
          }}
        /> */}
        <Text style={styles.CoffeeBeansTitle}>Coffee List</Text>
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.notFound}>
              <Text style={styles.categoryTextActive}>No Coffe Found</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffe}
          contentContainerStyle={styles.sortedCoffeListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                  
                });
              }}
                >
                <CoffeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCarthandler}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* coffe list */}
        {/* beans list */}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanList}
          contentContainerStyle={[styles.sortedCoffeListContainer,{marginBottom:tabBarHeight}]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                  
                });
              }}
                >
                <CoffeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCarthandler}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  scroll:{
    flexGrow:1,
  },
  heading:{
    fontSize:FONTSIZE.size_28,
    // fontFamily:FONTFAMILY.poppins_semibold,
    fontWeight:'bold',
    color: COLORS.primaryWhiteHex,
    paddingLeft:SPACING.space_30
  },
  searchText:{
    height:60,
    fontSize: FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex
  },
  searchIcon:{
    marginHorizontal:20,
  },
  searchBar:{
    margin:30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryDarkGreyHex,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:8,
    paddingBottom:8,
  },
  categoryTextActive:{
    fontSize:16,
    color:COLORS.primaryLightGreyHex,
    fontWeight:'bold'
  },
  notFound:{
    width:Dimensions.get('window').width-30*2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:36*3.6
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    // fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  categoryActive:{
    height:10,
    width: 10,
    borderRadius:10,
    marginTop:10,
    backgroundColor:COLORS.primaryOrangeHex
  },
  categoryView:{
    paddingHorizontal:15,
  },
  categoryContainer:{
    paddingHorizontal:20,
    marginBottom:20,
  },
  touchableOpacity:{
    alignItems:'center',

  },
  sortedCoffeListContainer:{
    gap:20,
    paddingVertical:20,
    paddingHorizontal:30
  }
})

export default HomeScreen