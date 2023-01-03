import { Button } from "react-native-paper";

const BarraSuperior = ({ navigation, route }) => {
  const handlePress = () => {
    navigation.navigate("NuevoCliente");
  };
  return (
    <Button textColor="#FFF" icon="plus-circle" onPress={() => handlePress()}>
      CLIENTE
    </Button>
  );
};

export default BarraSuperior;
