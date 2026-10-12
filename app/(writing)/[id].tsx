import Entete from "@/components/enteteComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { niveaux } from "@/constants/niveaux";
import { useAuthContext } from "@/hooks/auth.context";
import { getEssay, saveEssay } from "@/services/essays";
import { router, useLocalSearchParams } from "expo-router";
import { AlignLeft, Save } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductionEcrite() {
  const { profile, refreshStreak } = useAuthContext();
  const niveau = niveaux.filter(n => n.title === profile.niveau)[0]
  const { id, title, detail, desc, type } =
    useLocalSearchParams<{
      id: string;
      title: string;
      detail: string;
      desc: string;
      type: string;
    }>();

  const isNew = id === "new";

  const [essayId, setEssayId] = useState<string | undefined>(
    isNew ? undefined : id,
  );
  const [subject, setSubject] = useState({
    title: title ?? "",
    type: type ?? "",
    desc: desc ?? "",
    detail: detail ?? "",
  });
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await getEssay(id);

      if (res.success) {
        setSubject(res.essay?.subject);
        setTexte(res.essay?.content);

        
        
      } else {
        Alert.alert("Erreur", res.error);
      }
      setLoading(false);
    })();
  }, [id]);

  const nbMots = useMemo(() => {
    const t = texte.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [texte]);

  const objectifAtteint =
    nbMots >= Number(niveau.motsMin) && nbMots <= Number(niveau.motsMax);

  const submit = async () => {
    if (!profile || saving) return;
    setSaving(true);

    const res = await saveEssay(profile.id, {
      id: essayId,
      theme: subject.title,
      level: profile.niveau,
      subject,
      word_count: String(nbMots),
      content: texte,
      status: "submitted",
    });

    setSaving(false);

    if (!res.success) {
      Alert.alert("Erreur", res.error);
      return;
    }

    setEssayId(res.essay.id);
    await refreshStreak()
    router.replace("/pages/homepage");
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
          <View style={styles.wrapper}>
            <Entete title="Votre texte" niveau={niveau.title} />

            <View
              style={{
                backgroundColor: "#0042dd0a",
                padding: 10,
                marginTop: 5,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                {(type ? type : subject.type).toUpperCase()}
              </Text>
              <Text
                style={[globalStyle.title, { fontSize: 18, paddingBottom: 5 }]}
              >
                {title ? title : subject.title}
              </Text>
              <Text style={[globalStyle.subtitle, { fontSize: 12 }]}>
                {detail ? detail : subject.detail}
              </Text>
              <View style={[styles.row, { paddingTop: 5 }]}>
                <AlignLeft size={12} fontWeight={"bold"} />
                <Text style={{ fontSize: 12 }}>
                  {niveau.motsMin } à {niveau.motsMax} mots
                </Text>
              </View>
            </View>

            <Text>Votre production</Text>

            <View style={styles.card}>
              <TextInput
                multiline
                style={styles.input}
                value={texte}
                onChangeText={setTexte}
                placeholder="Écrivez ici..."
              />
              <View style={styles.footer}>
                <Text
                  style={[
                    globalStyle.subtitle,
                    {
                      fontSize: 12,
                      color: objectifAtteint ? "green" : globalColors.red,
                    },
                  ]}
                >
                  {nbMots} mots
                </Text>
                <Text style={[globalStyle.subtitle, { fontSize: 12 }]}>
                  Objectif: {niveau.motsMin}-{niveau.motsMax}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                  },
                  !texte.length && {
                    opacity: 0.5,
                  },
                ]}
                disabled={!texte.length}
                onPress={submit}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  Sauvegarder votre production écrite{" "}
                </Text>
                <Save color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  wrapper: {
    flex: 1,
    width: "85.5%",
    gap: 10,
    paddingBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#85858563",
    padding: 12,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Manrope",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#85858563",
  },
  button: {
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
