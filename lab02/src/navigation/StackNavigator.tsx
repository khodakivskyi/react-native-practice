import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/DetailsScreen";
import {RootStackParamList} from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ title: "News" }}
            />

            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
            />
        </Stack.Navigator>
    )
}