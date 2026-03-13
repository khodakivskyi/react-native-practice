import {View, Text, SectionList} from "react-native";
import {contactsData} from "../data/contactsData";
import {ListRenderItem} from "react-native";

interface Item {
    id: string;
    name: string;
    phone: string;
}

interface Section {
    title: string;
    data: Item[];
}

export default function ContactsScreen() {
    const renderItem: ListRenderItem<Item> = ({item}) => {
        return (
            <View style={{padding: 16}}>
                <Text>{item.name}</Text>
                <Text>{item.phone}</Text>
            </View>
        )
    }

    const renderSectionHeader = ({section}: {section: Section}) => {
        return (
            <View style={{backgroundColor: "#eee", padding: 10}}>
                <Text style={{fontWeight: "bold"}}>{section.title}</Text>
            </View>
        )
    }

    return(
        <SectionList<Item, Section> sections={contactsData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ddd" }} />
        )}/>
    )
}