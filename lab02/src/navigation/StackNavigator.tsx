import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
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
                options={({ navigation }) => ({
                    title: "News",
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Text style={{ fontSize: 16, color: "#007AFF" }}>Menu</Text>
                        </Pressable>
                    ),
                })}
            />

            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
            />
        </Stack.Navigator>
    )
}