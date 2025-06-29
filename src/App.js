import { useState, useRef } from 'react';
import UploadTextArea from './components/UploadTextArea';
import RatioInput from './components/RatioInput';
import SummaryDisplay from './components/SummaryDisplay';
import { summarizeText } from './services/summarize';
import './App.css';
import LoadingOverlay from './components/LoadingOverlay';

export default function App() {
  const [text, setText] = useState('');
  const [lastSubmittedText, setLastSubmittedText] = useState(''); // ✅ To track if input text has changed
  const [ratio, setRatio] = useState(0.3);
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const summaryRef = useRef(null);

  function getTopSummary(sentences, ratio) {
    if (!sentences || sentences.length === 0) return '';

    const numToKeep = Math.max(1, Math.floor(sentences.length * ratio));

    const topSentences = sentences
      .slice(0, numToKeep) // Already sorted from backend
      .sort((a, b) => {
        const aIdx = `${a.para_idx}.${a.sent_idx}`;
        const bIdx = `${b.para_idx}.${b.sent_idx}`;
        return aIdx.localeCompare(bIdx); // Restore original order
      });

    return topSentences.map((s) => s.text).join('. ');
  }

  const handleSubmit = async () => {
    // If the text hasn't changed, just scroll to summary
    if (text.trim() === lastSubmittedText.trim() && sentences.length > 0) {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simulate progress
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += Math.random() * 10;
      setProgress(Math.min(simulatedProgress, 90));
    }, 300);

    try {
      const allSentences = await summarizeText(text);
      clearInterval(interval);
      setProgress(100);
      setSentences(allSentences);
      setLastSubmittedText(text); // ✅ Save submitted version of the text

      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      setTimeout(() => setProgress(0), 800);
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setSentences([
        { text: 'Something went wrong.', para_idx: '0', sent_idx: '0', score: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {loading && <LoadingOverlay progress={progress} />}

      <h1 className="app-title">Graph Based Extractive Arabic Text Summarizer</h1>

      <div className="card">
        <UploadTextArea text={text} setText={setText} />
        <RatioInput ratio={ratio} setRatio={setRatio} />
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="loader"></span> : 'Summarize'}
        </button>

        <div ref={summaryRef}>
          <SummaryDisplay summary={getTopSummary(sentences, ratio)} />
        </div>
      </div>
    </div>
  );
}