import { OpenRouter } from "@openrouter/sdk";
import { config } from "dotenv";
import express from "express";

config({ quiet: true });

const app = express();

const apiOpenRouterkey = process.env.API_OPENROUTER;
const openrouter = new OpenRouter({
  apiKey: apiOpenRouterkey,
});

const LEVELS = {
  B1: {
    words: "100-150",
    types: "récit, description, e-mail informel, opinion simple",
  },
  B2: {
    words: "180-250",
    types: "lettre formelle, texte argumentatif, comparaison",
  },
  C1: { words: "250-300", types: "article d'opinion, synthèse, texte nuancé" },
  C2: {
    words: "300-400",
    types: "essai critique, argumentation subtile, registre soutenu",
  },
};

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const result = await openrouter.chat.send({
      chatRequest: {
        messages: [
          {
            role: "user",
            content: `Génère un sujet de production écrite.
                      Thème : Le logement en ville
                      Niveau CECRL : B2
                      Types de tâches adaptés : ${LEVELS.B2.types}
                      Longueur attendue : ${LEVELS.B2.words} mots

                      Format JSON :
                      {
                        "titre": "...",
                        "type_de_texte": "...",
                        "consigne": "...",
                        "contexte": "...",
                        "contraintes": ["...", "..."],
                        "nombre_de_mots": "${LEVELS.B2.words}",
                        "criteres_evaluation": ["...", "..."]
                      }`,
          },
        ],
        model: "apodex/apodex-1.1-mini:free",
        provider: { zdr: true, sort: "price" },
        stream: false,
        maxTokens: 3500,
      },
    });

    const raw = result.choices[0]?.message?.content;

    if (typeof raw !== "string") throw new Error("empty response");

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("no JSON found");

    res.json(JSON.parse(raw.slice(start, end + 1)));
  } catch (err) {
    console.error(err);
  }
});
app.listen("2000", () => {
  console.log("Here alive");
});
