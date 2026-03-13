import {View, Text, FlatList, Image} from "react-native";
import {newsData} from "../data/mockData";
import {News} from '../types/News';
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {RootStackParamList} from "../types/navigation";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "MainScreen"
>;

export default function MainScreen() {
    const [data, setData] = useState(newsData);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const MAX_PAGES = 4;

    const navigation = useNavigation<NavigationProp>();

    const renderItem = ({ item }: { item: News }) => {
        return (
            <View style={{ padding: 16 }}>
                <Text
                    onPress={() =>
                        navigation.navigate("DetailsScreen", {
                            title: item.title,
                            description: item.description
                        })
                    }
                >
                    {item.title}
                </Text>

                <Text>{item.description}</Text>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 160, marginTop: 8, borderRadius: 8 }}
                />
            </View>
        );
    };

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(()=>{
            setData(newsData);
            setPage(1);
            setRefreshing(false)
        }, 1000);
    }

    const loadMore = () => {
        if (isLoadingMore || refreshing || page >= MAX_PAGES) {
            return;
        }

        setIsLoadingMore(true);

        setTimeout(() => {
        const moreNews = newsData.map((item, index) => ({
            ...item,
            id: `${item.id}_${page}_${index}_${Date.now()}`
        }));

        setData(prev => [...prev, ...moreNews]);
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
        }, 700);
    };

    return (

        <FlatList data={data} keyExtractor={(item) => item.id}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                  initialNumToRender={6}
                  maxToRenderPerBatch={6}
                  windowSize={6}
                  renderItem={renderItem}

                  ItemSeparatorComponent={() => (
                      <View style={{height:1, backgroundColor:"#ddd"}} />
                  )}

                  ListHeaderComponent={
                      <Text style={{fontSize:22, padding:16}}>
                          News
                      </Text>
                  }

                  ListFooterComponent={
                      isLoadingMore ? (
                          <Text style={{textAlign:"center", padding:20}}>
                              Loading more...
                          </Text>
                      ) : null
                  }
        />
    )
}