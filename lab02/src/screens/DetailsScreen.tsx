import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

interface DetailsScreenProps {
    title: string;
    description: string;
}

export default function DetailsScreen() {
    const route = useRoute();
    const { title, description } = route.params as DetailsScreenProps;

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: title
        });
    }, []);

    return(
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22 }}>{title}</Text>
            <Text>{description}</Text>
        </View>
    )
}