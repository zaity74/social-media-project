import { useEffect, useRef, useState } from "react";
import { iaTreatment } from "../../redux/action/iaAction";
import { useDispatch, useSelector } from "react-redux";

const SnapshotCapture = ({
  onSnapshot,
  scrollDebounceMs = 1000,
  observedElementRef = null,
}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [snapshots, setSnapshots] = useState([]);
  const [waitingForScroll, setWaitingForScroll] = useState(false);

  const { payload, loading, error } = useSelector((state) => state.iaTreatment);

  // 1. Demander l'accès à la caméra lors du montage
  useEffect(() => {
    async function getCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Erreur lors de l'accès à la caméra :", error);
      }
    }
    getCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Détection du scroll
  useEffect(() => {
    let scrollTimeout = null;
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      if (waitingForScroll && snapshots.length > 0) {
        const currentPostId = observedElementRef?.current?.getAttribute("data-id") || null;
        console.log("Envoi des snapshots à l'API Node.js...");
        console.log(`Nombre d'images : ${snapshots.length}`);
        console.log(`Post observé : ${currentPostId}`);
        if(currentPostId){
          dispatch(iaTreatment(snapshots, currentPostId));
        }
      
        setSnapshots([]); // Vider le tableau après l'envoi
        setWaitingForScroll(false);
      }

      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setWaitingForScroll(true);
      }, scrollDebounceMs);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [snapshots, dispatch, scrollDebounceMs]);

  // 3. Suivre la visibilité de la page pour éviter les captures lorsque l'onglet est en arrière-plan
  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 4. Capture des snapshots avec un délai aléatoire entre 1.25 et 3.25 secondes
  useEffect(() => {
    let timeoutId;
    const captureLoop = () => {
      if (!isScrolling && videoRef.current && videoRef.current.readyState === 4 && documentVisible) {
        const snapshot = captureSnapshot(videoRef.current);
        setSnapshots((prevSnapshots) => [...prevSnapshots, snapshot]);

        if (onSnapshot) onSnapshot(snapshot);
        if (observedElementRef && observedElementRef.current) {
          const postId = observedElementRef.current.getAttribute("data-id");
          console.log(`Prise d'un snapshot pour le post ${postId}`);
        } else {
          console.log("Prise d'un snapshot");
        }
      }
      const randomDelay = Math.floor(Math.random() * (3000 - 1250 + 1)) + 1250;
      timeoutId = setTimeout(captureLoop, randomDelay);
    };
    captureLoop();
    return () => clearTimeout(timeoutId);
  }, [isScrolling, onSnapshot, documentVisible, observedElementRef]);

  // Fonction pour capturer un snapshot depuis le flux vidéo
  function captureSnapshot(videoElement) {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  }

  return (
    <div style={{ opacity: 1 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        controls
        style={{ width: "300px", height: "200px", backgroundColor: "black" }}
      />
    </div>
  );
};

export default SnapshotCapture;