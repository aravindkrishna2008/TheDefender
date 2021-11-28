import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as blazeface from "@tensorflow-models/blazeface";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import { Camera } from "expo-camera";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { LogBox } from "react-native";
//disable yellow warnings on EXPO client!
LogBox.ignoreAllLogs = true;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [blazeFaceModel, setBlazeFaceModel] = useState(null);
  const [textureDimsState, setTextureDims] = useState();
  const [blazeFacePrediction, setBlazeFacePrediction] = useState();
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [modelFaces, setModelFaces] = useState([]);
  const [isTFReady, setTFReady] = useState(false);
  const [loadedModel, setModelLoaded] = useState(null);
  const [modelPrediction, setModelPrediction] = useState();
  const [frameWorkReady, setFrameWorkReady] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState();
  const [predictionReady, setPredictionReady] = useState(false);
  const [allPredictions, setAllPredictions] = useState({
    0: [],
    5: [],
    10: [],
  });

  let requestAnimationFrameId = 0;
  let frameCount = 0;
  let makePredictionsEveryNFrames = 1;
  let queueSize = 0;
  const AUTORENDER = true;

  // const modelJSON = require("../../assets/machine_learning/model.json");
  // const modelWeights = require("../../assets/machine_learning/group1-shard1of1.bin");

  const tensorDims = { height: 200, width: 200, depth: 3 };

  useEffect(() => {
    if (!frameWorkReady) {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync().catch((e) =>
          console.log(e)
        );
        if (Platform.OS == "ios") {
          setTextureDims({ height: 1920, width: 1080 });
        } else {
          setTextureDims({ height: 1200, width: 1600 });
        }
        setHasPermission(status === "granted");
        await tf.ready().catch((e) => console.log(e));
        setTFReady(true);
        setModelLoaded(await loadModel().catch((e) => console.log(e)));
        setBlazeFaceModel(
          await loadBlazeFaceModel().catch((e) => console.log(e))
        );
        setFrameWorkReady(true);
      })();
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  const getPrediction = async (tensor) => {
    if (!tensor) {
      console.log("Tensor not found!");
    }
    const bfModel = await blazeFaceModel;
    const returnTensors = true;
    const faces = await bfModel
      .estimateFaces(tensor, returnTensors)
      .catch((e) => console.log(e));
    const scale = {
      height: styles.camera.height / tensorDims.height,
      width: styles.camera.width / tensorDims.width,
    };

    if (!isEmpty(faces)) {
      setModelFaces({ faces });
      faces.map((face, i) => {
        const { topLeft, bottomRight } = face;
        // Boxes in cropAndResize require to be normalized
        const normTopLeft = topLeft.div(tensor.shape.slice(-3, -2));
        const normBottomRight = bottomRight.div(tensor.shape.slice(-3, -2));
        const width = Math.floor(
          bottomRight.dataSync()[0] - topLeft.dataSync()[0] * scale.width
        );
        const height = Math.floor(
          bottomRight.dataSync()[1] - topLeft.dataSync()[1] * scale.height
        );
        const boxes = tf
          .concat([normTopLeft.dataSync(), normBottomRight.dataSync()])
          .reshape([-1, 4]);
        const crop = tf.image.cropAndResize(
          tensor.reshape([1, 200, 200, 3]),
          boxes,
          [0],
          [height, width]
        );
        // Resize cropped faces to [1,224,224,3]
        const alignCorners = true;
        const imageResize = tf.image.resizeBilinear(
          crop,
          [200, 200],
          alignCorners
        );
        makePrediction(imageResize);
      });
    }
  };

  const makePrediction = async (image) => {
    if (!image) {
      console.log("No input!");
    }
    const model = await loadedModel;
    const prediction = await model.predict(image, { batchSize: 1 });
    if (!prediction || isEmpty(prediction)) {
      console.log("Prediction not available");
    }
    rollingPrediction(prediction.dataSync());
  };

  // Handling the camera input and converting it into tensors to be used in the
  // model for predictions
  const handleCameraStream = (imageAsTensors) => {
    if (!imageAsTensors) {
      console.log("Image not found!");
    }
    const loop = async () => {
      if (frameCount % makePredictionsEveryNFrames === 0) {
        const imageTensor = imageAsTensors.next().value;

        if (loadedModel !== null && blazeFaceModel !== null) {
          await getPrediction(imageTensor).catch((e) => console.log(e));
        }
        tf.dispose(imageAsTensors);
      }

      frameCount += 1;
      frameCount = frameCount % makePredictionsEveryNFrames;
      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    //loop infinitely to constantly make predictions
    loop();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </Button>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
    marginBottom: 300,
  },
});
