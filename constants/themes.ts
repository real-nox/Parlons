export const THEME_POOL = [
  // Société
  { id: 'soc_reseaux', label: 'Les réseaux sociaux', category: 'societe' },
  { id: 'soc_inegalites', label: 'Les inégalités sociales', category: 'societe' },
  { id: 'soc_benevolat', label: 'Le bénévolat', category: 'societe' },
  // Travail
  { id: 'trv_teletravail', label: 'Le télétravail', category: 'travail' },
  { id: 'trv_entretien', label: "L'entretien d'embauche", category: 'travail' },
  { id: 'trv_equilibre', label: 'Équilibre vie pro / vie perso', category: 'travail' },
  // Éducation
  { id: 'edu_distance', label: "L'enseignement à distance", category: 'education' },
  { id: 'edu_langues', label: "L'apprentissage des langues", category: 'education' },
  { id: 'edu_uniforme', label: "L'uniforme à l'école", category: 'education' },
  // Environnement
  { id: 'env_climat', label: 'Le changement climatique', category: 'environnement' },
  { id: 'env_recyclage', label: 'Le recyclage', category: 'environnement' },
  { id: 'env_transport', label: 'Les transports écologiques', category: 'environnement' },
  // Santé
  { id: 'san_sport', label: 'Le sport au quotidien', category: 'sante' },
  { id: 'san_alimentation', label: "L'alimentation équilibrée", category: 'sante' },
  { id: 'san_stress', label: 'Le stress et le bien-être', category: 'sante' },
  // Technologie
  { id: 'tec_ia', label: "L'intelligence artificielle", category: 'technologie' },
  { id: 'tec_smartphone', label: 'Le smartphone chez les jeunes', category: 'technologie' },
  { id: 'tec_vieprivee', label: 'La vie privée en ligne', category: 'technologie' },
  // Culture
  { id: 'cul_cinema', label: 'Le cinéma et les séries', category: 'culture' },
  { id: 'cul_lecture', label: 'La lecture à l\'ère du numérique', category: 'culture' },
  { id: 'cul_traditions', label: 'Les traditions et les fêtes', category: 'culture' },
  // Vie quotidienne
  { id: 'vie_logement', label: 'Le logement en ville', category: 'quotidien' },
  { id: 'vie_cuisine', label: 'La cuisine et les repas', category: 'quotidien' },
  { id: 'vie_voisins', label: 'Les relations de voisinage', category: 'quotidien' },
  // Voyage
  { id: 'voy_tourisme', label: 'Le tourisme de masse', category: 'voyage' },
  { id: 'voy_expatriation', label: "S'installer à l'étranger", category: 'voyage' },
  { id: 'voy_decouverte', label: 'Voyager pour découvrir', category: 'voyage' },
  // Économie
  { id: 'eco_consommation', label: 'La société de consommation', category: 'economie' },
  { id: 'eco_budget', label: 'Gérer son budget', category: 'economie' },
  { id: 'eco_commerce', label: 'Le commerce en ligne', category: 'economie' },
];

const MAX_PER_CATEGORY = 2;
 
/**
 * @param {number} count nombre de thèmes à proposer (10 par défaut)
 * @param {Object} history { [themeId]: nbDeFoisChoisi } pour varier les propositions
 */
export function generateThemes(count = 10, history: any = {}) {
  const pool = THEME_POOL.map((t) => ({
    ...t,
    weight: 1 / (1 + (history[t.id] || 0)),
  }));
 
  const picked = [];
  const perCategory: any = {};
 
  while (picked.length < count && pool.length > 0) {
    const eligible = pool.filter(
      (t) => (perCategory[t.category] || 0) < MAX_PER_CATEGORY
    );
    const source = eligible.length > 0 ? eligible : pool;
 
    const total = source.reduce((sum, t) => sum + t.weight, 0);
    let r = Math.random() * total;
    let chosen = source[source.length - 1];
    for (const t of source) {
      r -= t.weight;
      if (r <= 0) {
        chosen = t;
        break;
      }
    }
 
    picked.push({ id: chosen.id, label: chosen.label, category: chosen.category });
    perCategory[chosen.category] = (perCategory[chosen.category] || 0) + 1;
    pool.splice(pool.findIndex((t) => t.id === chosen.id), 1);
  }
 
  return picked;
}
 