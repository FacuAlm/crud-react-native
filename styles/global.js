import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    marginHorizontal: "2.5%",
    marginTop: 20,
  },
  titulo: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
  },
  fab: {
    flex: 0.3,
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 20,
    backgroundColor: "#1774F2",
  },
});

export default globalStyles;
