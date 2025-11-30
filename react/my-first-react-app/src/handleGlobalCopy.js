const handleGlobalCopy = (event) => {
  // Prevent the browser's default copy behavior first
  event.preventDefault();

  // Get the text the user actually selected
  // const selectedText = window.getSelection().toString();

  // Define your custom text (e.g., add a copyright notice or URL)
  // const customText = `${selectedText}\n\nRead more at: yourwebsite.com`;

  // Write the custom text to the clipboard data
  // event.clipboardData.setData('text/plain', customText);
  event.clipboardData.setData("text/plain", "☠☠☠☠☠☠☠☠☠☠");

  console.log("Custom text was added to the clipboard.");
};
export default handleGlobalCopy;
