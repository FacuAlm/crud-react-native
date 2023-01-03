import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import { List, Headline, FAB } from "react-native-paper";
import globalStyles from "../styles/global";
import { API_KEY } from "@env";

const Inicio = ({ navigation, route }) => {
  const [clientes, setClientes] = useState([]);
  const [consultarAPI, setConsultarAPI] = useState(true);
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const resultado = await axios.get(`${API_KEY}/clientes`);
        setClientes(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultarAPI) {
      consultarAPI();
      setConsultarAPI(false);
    }
  }, [consultarAPI]);

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? "Clientes" : "Aún no hay clientes"}
      </Headline>
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() =>
              navigation.navigate("DetallesCliente", { item, setConsultarAPI })
            }
          />
        )}
        keyExtractor={(cliente) => cliente.id.toString()}
      />

      <FAB
        icon="plus"
        color="#FFF"
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", { setConsultarAPI })}
      />
    </View>
  );
};

export default Inicio;
