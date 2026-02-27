import { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Modal, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const mostrarError = (msg: string) => {
    setMensaje(msg);
    setVisible(true);
  };

  const agregar = () => {
    if (nota.trim() === "") {
      mostrarError("Ingrese una nota");
      return;
    }

    const texto = nota.replace(",", ".");
    const numero = Number(texto);

    if (isNaN(numero)) {
      mostrarError("Solo números");
      return;
    }

    if (numero < 0 || numero > 5) {
      mostrarError("Debe estar entre 0 y 5");
      return;
    }

    setNotas([...notas, numero]);
    setNota("");
  };

  const borrar = () => {
    setNotas([]);
  };

  const salir = () => {
    setNotas([]);
    setNota("");
    router.replace("/login");
  };

  let promedio = 0;

  if (notas.length > 0) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
      suma += notas[i];
    }
    promedio = suma / notas.length;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promedio de Notas</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese nota (0 a 5)"
        keyboardType="decimal-pad"
        value={nota}
        onChangeText={(t) => setNota(t.replace(/[^0-9.,]/g, ""))}
      />

      <Button title="Agregar nota" onPress={agregar} color="#4B0082" />

      <View style={styles.box}>

        <Text style={styles.promTitle}>Promedio total:</Text>
        <Text style={styles.promedio}>{promedio.toFixed(2)}</Text>
        
      </View>

      <Text style={styles.sub}>Notas:</Text>

      <FlatList
        data={notas}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            Nota {index + 1}: {item}
          </Text>
        )}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="Borrar" onPress={borrar} color="#ff5555" />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Salir" onPress={salir} color="#4B0082" />
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.fondo}>
          <View style={styles.modal}>
            <Text style={{ marginBottom: 10, color: "#4B0082" }}>{mensaje}</Text>
            <Button title="Cerrar" onPress={() => setVisible(false)} color="#c72ca5" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F3E5F5", 
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#4B0082",
  },
  input: {
    borderWidth: 2,
    borderColor: "#8b227d",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  box: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4B0082",
  },
  promTitle: {
    color: "#82228b",
  },
  promedio: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B0082",
  },
  sub: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#87228b",
  },
  item: {
    marginTop: 5,
    color: "#4B0082",
  },
  fondo: {
    flex: 1,
    backgroundColor: "rgba(75,0,130,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    borderWidth: 2,
    borderColor: "#87228b",
  },
});