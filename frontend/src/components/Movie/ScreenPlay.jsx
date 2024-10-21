import axios from "../../axios";
import { useParams } from "react-router-dom";

const ScreenPlay = (props) => {
  const { sceneId } = useParams();

  const handleDownload = async () => {
    try {
      alert("sent");
      // Replace '/download' with your actual download URL
      const response = await axios.post(
        `/api/scene_to_voice/${sceneId}`,
        {}, // You can pass any data in the request body if needed
        {
          responseType: "blob", // Important for downloading files
        }
      );
      alert("sent");

      // Create a new Blob object using the response data
      const blob = new Blob([response.data]);

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement("a");
      a.href = url;
      a.download = "filename.mp3"; // Replace 'filename.ext' with the desired file name
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to trigger the download
      a.remove(); // Remove the link element from the DOM

      // Clean up and release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="screenplay-page bg-black">
      {console.log(props.data)}
      <div
        id="screenplay-content"
        className="screenplay-container"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
      <button
        onClick={handleDownload}
        className="download-button relative px-8 py-2 ml-4 text-xl overflow-hidden font-semibold rounded text-white hover:bg-darkPurple transition-all bg-purple"
      >
        Download Audio
      </button>
    </div>
  );
};

export default ScreenPlay;
