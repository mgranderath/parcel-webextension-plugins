import { Resolver } from "@parcel/plugin";
import path from "path";
import merge from "deepmerge";

const NODE_ENV = process.env.NODE_ENV ?? "development";

export default new Resolver({
  async resolve({ options, filePath }) {
    if (path.basename(filePath) !== "manifest.json") {
      return null;
    }

    const fs = options.inputFS;

    const directoryOfManifest = path.dirname(filePath);
    const mainManifestCode = JSON.parse(await fs.readFile(filePath, "utf-8"));

    const additionalManifestPath = path.join(
      directoryOfManifest,
      `manifest.${NODE_ENV}.json`
    );
    let additionalManifestCode = {};
    if (fs.exists(additionalManifestPath)) {
      additionalManifestCode = JSON.parse(
        await fs.readFile(additionalManifestPath, "utf-8")
      );
    }

    return {
      filePath: await fs.realpath(filePath),
      code: JSON.stringify(merge(mainManifestCode, additionalManifestCode)),
      invalidateOnFileCreate: [],
      invalidateOnFileChange: [],
    };
  },
});
