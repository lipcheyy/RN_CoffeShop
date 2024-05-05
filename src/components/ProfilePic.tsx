import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.imgContainer}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.img}/>
    </View>
  )
}



const styles = StyleSheet.create({
    imgContainer:{
        height:SPACING.space_36,
        width:SPACING.space_36,
        borderRadius:SPACING.space_12,
        borderWidth:2,
        borderColor:COLORS.secondaryDarkGreyHex,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    },
    img:{
        height:SPACING.space_36,
        width:SPACING.space_36,
    }
})
export default ProfilePic