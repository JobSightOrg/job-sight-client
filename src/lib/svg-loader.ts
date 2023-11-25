import React from "react";

type SVGImport = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

function importAll(r: __WebpackModuleApi.RequireContext): SVGImport {
  let svgMap: SVGImport = {};

  r.keys().forEach((fileName: string) => {
    // Extracting the key from the fileName
    let tempKey: string = fileName.replace(/\.\/(.+)\.svg$/, "$1");
    const key: string =
      tempKey.charAt(0).toUpperCase() + tempKey.slice(1).toLowerCase();

    // Importing the SVG component
    const component: React.FC<React.SVGProps<SVGSVGElement>> =
      r(fileName)?.default;

    svgMap[key] = component;
  });

  return svgMap;
}

export const svgFiles: SVGImport = importAll(
  require.context("@/public/assets/logos", false, /\.\/.*\.svg$/)
);
