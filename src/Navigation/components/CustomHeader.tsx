import { Image } from '@rneui/base'
import React from 'react'
import { View } from 'react-native'
import { color } from 'react-native-reanimated'
import colors from '../../assets/colors'

export default function CustomHeader(){
    return(
        <View style={{backgroundColor:colors.primary, height:60,justifyContent:'center', alignItems:'center'}}>
            <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50}}/>
        </View>
    )
}