import './UploadTextArea.css';

export default function UploadTextArea({ text, setText }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setText(e.target.result);
        reader.readAsText(file);
    };

    return (
        <div className="upload-container">
            <textarea
                className="text-input"
                placeholder="Paste your Arabic text here..."
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="file"
                accept=".txt"
                className="file-input"
                onChange={handleFileUpload}
            />
        </div>
    );
}