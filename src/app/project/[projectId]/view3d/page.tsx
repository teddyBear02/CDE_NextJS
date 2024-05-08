"use client";
import React, { useEffect, useRef } from "react";
import { Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";

const ViewerXkt = ({}) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = new Viewer({
      canvasId: "myCanvas",
    });

    viewer.camera.eye = [-2.56, 8.38, 8.27];
    viewer.camera.look = [13.44, 3.31, -14.83];
    viewer.camera.up = [0.1, 0.98, -0.14];

    const xktLoader = new XKTLoaderPlugin(viewer);

    xktLoader.load({
      // Returns an Entity that represents the model
      id: "myModel",
      src: "/Model2.xkt",
      edges: true,
    });

    // model = viewer.scene.models["myModel"];
  }, []);

  return (
    <canvas
      ref={viewerRef}
      style={{ width: "100%", height: "100%", border: "solid 1px #000" }}
      id="myCanvas"
    />
  );
};

export default ViewerXkt;
