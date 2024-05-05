import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientIcon from './GradientIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps{
    title?:string;
}

const HeaderBar:React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GradientIcon name='menu' 
          color={COLORS.primaryLightGreyHex} 
          size={FONTSIZE.size_16}/>
      <Text style={styles.headerTitle}>{title}</Text>
      <ProfilePic/>
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer:{
    marginTop:15,
    padding:SPACING.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerTitle:{
    // fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_20,
    color:COLORS.primaryWhiteHex
  }
})
export default HeaderBar

