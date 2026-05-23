import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DATA_DIR = path.join(__dirname, 'public', 'data');

// Ensure directory exists
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

async function downloadVocab() {
  console.log('Downloading vocabulary files...');
  for (let i = 1; i <= 5; i++) {
    const level = `N${i}`;
    const url = `https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/db/n${i}.json`;
    console.log(`Fetching ${level} vocab from ${url}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      // Map to our VocabEntry format
      const formatted = data.map((item, idx) => ({
        id: `v-${level.toLowerCase()}-${idx}`,
        word: item.word,
        reading: item.furigana || item.reading,
        meanings: [item.meaning],
        level: level,
        partOfSpeech: 'Word', // simple fallback
        example: {
          sentence: `この言葉は「${item.word}」です。`,
          reading: `このことばは「${item.furigana || item.reading}」です。`,
          translation: `This word is "${item.meaning}".`
        }
      }));

      const destPath = path.join(PUBLIC_DATA_DIR, `vocab_${level}.json`);
      fs.writeFileSync(destPath, JSON.stringify(formatted, null, 2));
      console.log(`Saved ${level} vocab with ${formatted.length} words.`);
    } catch (err) {
      console.error(`Failed to download ${level} vocab:`, err.message);
    }
  }
}

async function downloadKanji() {
  console.log('Downloading kanji database (with readings and meanings)...');
  const url = 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const allKanji = await res.json();

    // Group by level
    const groups = {
      N5: [],
      N4: [],
      N3: [],
      N2: [],
      N1: []
    };

    for (const [character, item] of Object.entries(allKanji)) {
      const jlptLvl = item.jlpt_new; // e.g. 5, 4, 3, 2, 1
      if (jlptLvl && jlptLvl >= 1 && jlptLvl <= 5) {
        const levelName = `N${jlptLvl}`;
        groups[levelName].push({
          id: `k-${levelName.toLowerCase()}-${character}`,
          character: character,
          level: levelName,
          meanings: item.meanings || [],
          onyomi: item.readings_on || [],
          kunyomi: item.readings_kun || [],
          strokes: item.strokes || 0,
          examples: [
            {
              word: `${character}る`,
              reading: item.readings_kun[0]?.replace('.', '') || character,
              meaning: item.meanings[0] || 'Definition'
            }
          ]
        });
      }
    }

    for (const [level, list] of Object.entries(groups)) {
      const destPath = path.join(PUBLIC_DATA_DIR, `kanji_${level}.json`);
      fs.writeFileSync(destPath, JSON.stringify(list, null, 2));
      console.log(`Saved ${level} kanji with ${list.length} characters.`);
    }
  } catch (err) {
    console.error('Failed to download kanji database:', err.message);
  }
}

async function main() {
  await downloadVocab();
  await downloadKanji();
  console.log('Done downloading datasets!');
}

main();
