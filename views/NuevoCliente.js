import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  TextInput,
  Button,
  Headline,
  Paragraph,
  Dialog,
  Portal,
  
} from "react-native-paper";
import globalStyles from "../styles/global";
import axios from "axios";
import { API_KEY } from "@env";

const NuevoCliente = ({ navigation, route }) => {
  const { setConsultarAPI } = route.params;
  // Formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const { nombre, telefono, correo, empresa } = route.params.cliente;
      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    // Validar
    if (nombre === "" || telefono === "" || correo === "" || empresa === "") {
      setAlerta(true);
      return;
    }

    // Generar el cliente
    const cliente = { nombre, telefono, correo, empresa };

    // Si estamos editando o creando un nuevo cliente
    if (route.params.cliente) {
      const { id } = route.params.cliente;
      cliente.id = id;
      try {
        await axios.put(`${API_KEY}/clientes/${id}`, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Guardar el cliente en la API
      try {
        await axios.post(`${API_KEY}/clientes`, cliente);
      } catch (error) {
        console.log(error);
      }
    }

    // Redireccionar
    navigation.navigate("Inicio");

    // Limpiar el formulario
    setNombre("");
    setTelefono("");
    setCorreo("");
    setEmpresa("");

    setConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
      <TextInput
        label="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={(texto) => setNombre(texto)}
      />
      <TextInput
        label="Teléfono"
        style={styles.input}
        value={telefono}
        onChangeText={(texto) => setTelefono(texto)}
      />
      <TextInput
        label="Correo"
        style={styles.input}
        value={correo}
        onChangeText={(texto) => setCorreo(texto)}
      />
      <TextInput
        label="Empresa"
        style={styles.input}
        value={empresa}
        onChangeText={(texto) => setEmpresa(texto)}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        style={styles.boton}
        onPress={() => guardarCliente()}
      >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  boton: {
    marginTop: 50,
    backgroundColor: "#1774F2",
  },
});

export default NuevoCliente;
