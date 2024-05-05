import { Dimensions, ImageProps,ImageBackground, TouchableOpacity,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const CARD_WIDTH=Dimensions.get('window').width*0.32

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const CoffeCard: React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,}) => {
  return (
    
    <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.CardLinearGradientContainer}
    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
    <ImageBackground
      source={imagelink_square}
      style={styles.CardImageBG}
      resizeMode="cover">
      <View style={styles.CardRatingContainer}>
        <AntDesign name="star" size={17} color={COLORS.primaryOrangeHex} />
        <Text style={styles.CardRatingText}>{average_rating}</Text>
      </View>
    </ImageBackground>
    <Text style={styles.CardTitle}>{name}</Text>
    <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
    <View style={styles.CardFooterRow}>
      <Text style={styles.CardPriceCurrency}>
        $ <Text style={styles.CardPrice}>{price.price}</Text>
      </Text>
      <TouchableOpacity
        onPress={() => {
          buttonPressHandler({
            id,
            index,
            type,
            roasted,
            imagelink_square,
            name,
            special_ingredient,
            prices: [{...price, quantity: 1}],
          });
        }}>
        <View>
          <Ionicons name="add-circle" size={32} color={COLORS.primaryOrangeHex} />
        </View>
      </TouchableOpacity>
      
    </View>
  </LinearGradient>
    
  )
}

export default CoffeCard

const styles = StyleSheet.create({
    img:{
        width: CARD_WIDTH,
        height:CARD_WIDTH,
        borderRadius:20,
        marginBottom:15,
        overflow:'hidden'
    },
    CardLinearGradientContainer: {
      padding: 15,
      borderRadius: 25,
    },
    CardImageBG: {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: 20,
      marginBottom: 15,
      overflow: 'hidden',
    },
    CardRatingContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.primaryBlackRGBA,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingHorizontal: 15,
      position: 'absolute',
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      top: 0,
      right: 0,
    },
    CardRatingText: {
      
      color: COLORS.primaryWhiteHex,
      lineHeight: 22,
      fontSize: 14,
    },
    CardTitle: {
      // fontFamily: FONTFAMILY.poppins_medium,
      color: COLORS.primaryWhiteHex,
      fontSize: 16,
    },
    CardSubtitle: {
      // fontFamily: FONTFAMILY.poppins_light,
      color: COLORS.primaryWhiteHex,
      fontSize: 10,
    },
    CardFooterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
    },
    CardPriceCurrency: {
      // fontFamily: FONTFAMILY.poppins_semibold,
      color: COLORS.primaryOrangeHex,
      fontSize: 18,
    },
    CardPrice: {
      color: COLORS.primaryWhiteHex,
    },
})