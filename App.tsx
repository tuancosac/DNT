import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status?: "active" | "inactive";
  showOnlyInactive?: boolean;
}


function ThongTinSach(props: Book)
{
  const [ status, SetStatus] = useState(props.status);
  const [ showInfo, setShowInfo] = useState(true);
  
  const handleStatusChange =() =>{
    if(status === "active"){
      SetStatus("inactive");
      setShowInfo(true);
    } else if (status === "inactive") {
      SetStatus("active");
      setShowInfo(false);
    }
  };

  if (props.showOnlyInactive && status !== "inactive") {
    return null;
  }

  return (
    <View style={{borderWidth:1, borderColor:'black', padding:10, margin:10}}>
      <Pressable onPress={handleStatusChange}>
        <Text style={styles.button}>{status}</Text>
      </Pressable>
      <Text style={styles.text}>Information</Text>
      {showInfo && <ShowInfor title={props.title} author={props.author} category={props.category} />}
    </View>
  )
}

function ShowInfor(props: { title: string; author: string; category: string }) {
  return (
    <ScrollView>
      <Text>Title: {props.title}</Text>
      <Text>Author: {props.author}</Text>
      <Text>Category: {props.category}</Text>
    </ScrollView>
  );
}

export default function App() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>--- DANH SÁCH 1: TẤT CẢ SÁCH ---</Text>
      <ThongTinSach id={1} title="Lập trình C" author="Nguyễn Văn A" category="Lập trình" status="inactive" />
      <ThongTinSach id={2} title="Lập trình Java" author="Trần Văn B" category="Lập trình" status="inactive" />
      <ThongTinSach id={3} title="React Native cơ bản" author="Lê Văn C" category="Di động" status="active" />
      <ThongTinSach id={4} title="Cơ sở dữ liệu" author="Phạm Văn D" category="Cơ sở dữ liệu" status="active" />
      <ThongTinSach id={5} title="Mạng máy tính" author="Hoàng Văn E" category="Mạng" status="active" />
      <ThongTinSach id={6} title="Cấu trúc dữ liệu" author="Nguyễn Văn F" category="Lập trình" status="inactive" />

      <Text style={styles.sectionTitle}>--- DANH SÁCH 2: INACTIVE ---</Text>
      <ThongTinSach id={1} title="Lập trình C" author="Nguyễn Văn A" category="Lập trình" status="inactive" showOnlyInactive />
      <ThongTinSach id={2} title="Lập trình Java" author="Trần Văn B" category="Lập trình" status="inactive" showOnlyInactive />
      <ThongTinSach id={3} title="React Native cơ bản" author="Lê Văn C" category="Di động" status="inactive" showOnlyInactive />
      <ThongTinSach id={4} title="Cơ sở dữ liệu" author="Phạm Văn D" category="Cơ sở dữ liệu" status="inactive" showOnlyInactive />
      <ThongTinSach id={5} title="Mạng máy tính" author="Hoàng Văn E" category="Mạng" status="inactive" showOnlyInactive />
      <ThongTinSach id={6} title="Cấu trúc dữ liệu" author="Nguyễn Văn F" category="Lập trình" status="inactive" showOnlyInactive />
    </ScrollView>
  );
}

const styles=StyleSheet.create ({
  container: {
    paddingVertical: 40,
    alignItems: 'stretch',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  text: {
    fontSize: 20,
    color: 'blue',
    alignSelf: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
})  