import './RatioInput.css';

export default function RatioInput({ ratio, setRatio }) {
    return (
        <div className="ratio-input-container">
            <label htmlFor="ratio" className="ratio-label">Summary Ratio:</label>
            <input
                id="ratio"
                type="number"
                min={0.1}
                max={1.0}
                step={0.1}
                value={ratio}
                onChange={(e) => setRatio(parseFloat(e.target.value))}
                className="ratio-input"
            />
        </div>
    );
}