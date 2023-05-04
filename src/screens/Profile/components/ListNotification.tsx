import { View,Text } from "react-native"
import {Notice} from '../../../schemas/Notice'
const ListNotification = ({notice}:{notice:Notice})=> {
    return(
        <View style={{height:200,width:200}}>
            <Text>{notice}</Text>
        </View>
    )
}

export default ListNotification