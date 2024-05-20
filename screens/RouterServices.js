import {COLORS} from "../constants"
import { useMyContextController } from "../store"
import { useEffect } from "react"
import Services from "./Services"
import ServiceDetail from "./ServiceDetail"
import { createStackNavigator } from "@react-navigation/stack"
import AddNewService from "./AddNewService"

const Stack = createStackNavigator();
export default RouterServices = ({navigation}) =>{
    const [controller,dispatch] =useMyContextController();
    const {userLogin} = controller;
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    },[userLogin])
    return(

        <Stack.Navigator initialRouteName='Login'>
            
            <Stack.Screen name="Services" component={Services}
            options={{
                headerShown:false
            }}/>
            <Stack.Screen name="AddNewService" component={AddNewService}
            options={{
                headerStyle:{backgroundColor:COLORS.pink},
            }}/>
            <Stack.Screen name="ServiceDetail" component={ServiceDetail}
            options={{
                headerStyle:{backgroundColor:COLORS.pink},
            }}/>
            
        </Stack.Navigator>
    )
}