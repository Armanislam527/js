import React from "react";

const CopyButtonExample = () => {
  const textToCopy = "boss this text is modified";

  const copyToClipboard = async () => {
    try {
      // Use the modern asynchronous Clipboard API
      await navigator.clipboard.writeText(textToCopy);
      alert("Specific text copied to clipboard successfully!");
    } catch (err) {
      // Fallback for older browsers
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text. Please try again or use a modern browser.");
    }
  };

  return (
    <div>
      <p>
        The secret code is: <code>here you can copy </code>
      </p>
      <button onClick={copyToClipboard}>Copy Specific Text</button>
    </div>
  );
};

export default CopyButtonExample;
