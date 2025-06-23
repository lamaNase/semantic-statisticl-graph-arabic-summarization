import './SummaryDisplay.css';

export default function SummaryDisplay({ summary }) {
    if (!summary) return null;

    return (
        <div className="summary-container">
            <h2 className="summary-title">Summary</h2>
            <p className="summary-text">{summary}</p>
        </div>
    );
}