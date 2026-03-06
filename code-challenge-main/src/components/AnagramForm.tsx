import { useState } from 'react';
import { findAnagrams } from '../utils/anagram';
import { findDuplicates } from '../utils/duplicates';

function AnagramForm() {
  const [word, setWord] = useState('');
  const [wordList, setWordList] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  //  useEffect(() => {                      // este useEffect determina como falso cuando el usuario modifica el input de word y por eso falla el test.
  //   setResults([]);
  //   setSubmitted(false);
  // }, [word]);

  const handleSubmit =(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const candidates = wordList
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
    const anagrams = findAnagrams(word, candidates);
    setResults(anagrams);                                // results.push(...anagrams) puede tener interferencia con React ya que .push modifica arrays, se elimina y se tiene que modificar a setResults(anagrams) para que no rompa el test.
    setDuplicates(findDuplicates(candidates));
    setSubmitted(true);
  };                                           // aqui el useCallback tiene dependencias vacias "[])", por lo tanto quitamos usecallback ya que no es necesario.

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="word">Word</label>
        <input
          id="word"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="wordList">Word List (comma-separated)</label>
        <input
          id="wordList"
          type="text"
          value={wordList}
          onChange={(e) => setWordList(e.target.value)}
        />
      </div>

      <button type="submit">Find Anagrams</button>

      {submitted && results.length > 0 && (
        <div className="results">
          <h2>Anagrams found:</h2>
          <ul>
            {results.map((anagram) => (
              <li key={anagram}>{anagram}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && results.length === 0 && <p className="no-results">No anagrams found.</p>}

      {submitted && (
        <div className="duplicates">
          <h2>Duplicate words:</h2>
          {duplicates.length > 0 ? (
            <ul>
              {duplicates.map((duplicate) => (
                <li key={duplicate}>{duplicate}</li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No duplicate words in the list.</p>
          )}
        </div>
      )}
    </form>
  );
}

export default AnagramForm;
