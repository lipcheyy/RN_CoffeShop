import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import { COLORS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface GradientIconProps{
    name:string;
    color:string;
    size:number
}

const GradientIcon: React.FC<GradientIconProps> = ({name,color,size}) => {
  return (
    <View style={styles.container}>
      <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}}
        colors={[COLORS.secondaryGreyHex,COLORS.primaryBlackHex]}
        style={styles.linear}>
        {/* <CustomIcon name={name} color={color} size={size}/> */}
        <MaterialCommunityIcons name="dots-grid" size={36} color={color} />
     </LinearGradient>
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderBlockColor:COLORS.secondaryDarkGreyHex,
        borderRadius:SPACING.space_12,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.secondaryDarkGreyHex,
        overflow:'hidden'
    },
    linear:{
        height:SPACING.space_36,
        width:SPACING.space_36,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default GradientIcon