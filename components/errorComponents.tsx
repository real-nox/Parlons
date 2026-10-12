import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  erreur: string;
  onClose: () => void;
};

export default function ErrorComponents({ title, erreur, onClose }: Props) {
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{erreur}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d00000",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#0003be",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});