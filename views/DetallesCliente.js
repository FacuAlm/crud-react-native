import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Headline, Subheading, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/global";
import axios from "axios";
import { API_KEY } from "@env";

const DetallesCliente = ({ route, navigation }) => {
  const { setConsultarAPI } = route.params;
  const { nombre, empresa, correo, telefono, id } = route.params.item;
  const mostrarConfirmacion = () => {
    Alert.alert(
      "¿Deseas eliminar este cliente?",
      "Un contacto eliminado no se puede recuperar",
      [
        { text: "Si, Eliminar", onPress: () => eliminarContacto() },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const eliminarContacto = async () => {
    try {
      const resultado = await axios.delete(
        `${API_KEY}/clientes/${id}`
      );
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("Inicio");
    setConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Teléfono: <Subheading>{telefono}</Subheading>
      </Text>

      <Button
        mode="contained"
        icon="cancel"
        style={styles.boton}
        onPress={() => mostrarConfirmacion()}
      >
        Eliminar Cliente
      </Button>

      <FAB

        icon="pencil"
        color="#FFF"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate("NuevoCliente", {
            cliente: route.params.item,
            setConsultarAPI,
          })
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    marginTop: 50,
    backgroundColor: "red",
  },

  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default DetallesCliente;
