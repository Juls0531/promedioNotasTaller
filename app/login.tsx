import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const [clave, setClave] = useState("");
  const [visible, setVisible] = useState(false);

  const entrar = () => {
    if (clave === "1234") {
      setClave("");
      router.replace("/");
    }   else {
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese la clave"
        secureTextEntry
        keyboardType="number-pad"
        value={clave}
        onChangeText={(t) => setClave(t.replace(/[^0-9]/g, ""))}
        maxLength={4}
      />

      <Button title="Entrar" onPress={entrar} color="#4B0082" />

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.fondo}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Clave incorrecta</Text>
            <Button title="Cerrar" onPress={() => setVisible(false)} color="#8b2286" />
          </View>
        </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  title: {
        fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B0082", 
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#8b228b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },


  fondo:    {
    flex: 1,
    backgroundColor: "rgba(75,0,130,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal:    {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    borderWidth: 2,
    borderColor:    "#8b227d",
  },
  modalText: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4B0082",
    textAlign: "center",
  },
});