import Entete from "@/components/enteteComponents";
import { globalColors, globalStyle } from "@/constants/global";
import { niveaux } from "@/constants/niveaux";
import { useAuthContext } from "@/hooks/auth.context";
import {
  generateSubjects,
  getProfileThemes,
  Subject,
} from "@/services/subjects";
import { router } from "expo-router";
import { PenLine, Wand2 } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function chooseThemes() {
  const { profile } = useAuthContext();
  const niveau = niveaux.filter((n) => n.title === profile.niveau)[0];

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selected, setSelected] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  const generate = useCallback(
    async (exclude: string[] = []) => {
      if (!profile?.id || !niveau) return;
      setLoading(true);
      setSelected(null);

      const t = await getProfileThemes(profile.id);
      if (!t.success || !t.themes.length) {
        setLoading(false);
        Alert.alert("Erreur", t.success ? "Aucun thème choisi." : t.error);
        return;
      }

      const res = await generateSubjects({
        themes: t.themes,
        niveau: niveau.title,
        motsMin: niveau.motsMin,
        motsMax: niveau.motsMax,
        exclude,
        count: 3,
      });

      setLoading(false);

      if (!res.success) {
        Alert.alert("Erreur", res.error);
        return;
      }
      setSubjects(res.subjects);
    },
    [profile?.id, niveau?.title],
  );

  useEffect(() => {
    generate();
  }, [generate]);

  const startWriting = () => {
    if (!selected || !niveau) return;
    router.push({
      pathname: "/(writing)/[id]",
      params: {
        id: "new",
        title: selected.title,
        type: selected.type,
        desc: selected.desc,
        detail: selected.detail,
        motsMin: String(niveau.motsMin),
        motsMax: String(niveau.motsMax),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Entete title="Production écrite" niveau={niveau.title} />

        <View style={styles.topcontainer}>
          <View>
            <Text style={[globalStyle.title, { fontSize: 20 }]}>
              Choisissez un thème
            </Text>
            <Text style={globalStyle.subtitle}>
              Un sujet qui vous inspire, un texte à votre rythme. À vous de
              jouer !
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[globalStyle.subtitle, { fontWeight: "bold" }]}>
              Thèmes proposés
            </Text>
            <Text style={[globalStyle.subtitle, { paddingBottom: 5 }]}>
              {niveau.motsMin} - {niveau.motsMax} mots
            </Text>
          </View>

          <View>
            {loading ? (
              <View
                style={{ paddingVertical: 40, alignItems: "center", gap: 10 }}
              >
                <ActivityIndicator />
                <Text style={globalStyle.subtitle}>
                  Génération de vos sujets...
                </Text>
              </View>
            ) : (
              <FlatList
                data={subjects}
                scrollEnabled={false}
                keyExtractor={(s) => s.title}
                renderItem={({ item }) => {
                  const active = selected?.title === item.title;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setSelected(item)}
                      accessibilityState={{ selected: active }}
                      style={[styles.gridItem, active && styles.chipActive]}
                    >
                      <Text
                        style={[
                          styles.itemTextTitle,
                          active && { color: globalColors.title2 },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text style={styles.itemTextLabel}>{item.type}</Text>
                      <Text style={styles.itemTextDescription}>
                        {item.desc}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>

          <View>
            <View
              style={[
                styles.gridItem,
                { backgroundColor: "rgba(0, 77, 165, 0.11)" },
              ]}
            >
              <Text style={styles.itemTextTitle}>Envie d’autres idées ?</Text>
              <Text style={styles.itemTextLabel}>
                Découvrez de nouveaux sujets, toujours adaptés à votre niveau{" "}
                {niveau?.title}.
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonRow,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: globalColors.link,
                    width: "100%"
                  },
                  loading && { opacity: 0.5 },
                ]}
                disabled={loading}
                onPress={() => generate(subjects.map((s) => s.title))}
              >
                <Text
                  style={[styles.buttonText, { color: globalColors.title2 }]}
                >
                  Générer des thèmes
                </Text>
                <Wand2 color={globalColors.title2} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonRow,
                (!selected || loading) && { opacity: 0.5 },
              ]}
              disabled={!selected || loading}
              onPress={startWriting}
            >
              <Text style={styles.buttonText}>Écrire sur ce thème</Text>
              <PenLine color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  wrapper: {
    width: "82.5%",
    gap: 25,
  },
  topcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridItem: {
    borderColor: "#ebebeb98",
    borderRadius: 10,
    borderWidth: 2,
    padding: 12.5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  itemTextTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5,
  },
  itemTextLabel: {
    fontWeight: "bold",
    fontSize: 11,
  },
  itemTextDescription: {
    color: "#818181",
    fontWeight: "bold",
    fontSize: 10,
  },
  chipActive: { backgroundColor: "#0042dd0a", borderColor: "#2B59C3" },
  chipLocked: { opacity: 0.8 },
  button: {
    marginTop: 20,
    padding: 12.5,
    backgroundColor: "#0003be",
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  buttonRow: { flexDirection: "row", justifyContent: "center", gap: 10 },
});
