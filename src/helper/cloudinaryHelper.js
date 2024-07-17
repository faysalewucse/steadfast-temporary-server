const cloudinary = require("../config/cloudinary");
const { projectName } = require("../secret");

const uploadFileToCloudinary = async (file, folder, model = "The") => {
  const { secure_url } = await cloudinary.uploader.upload(file.path, {
    folder: `${projectName}/${folder}`,
    transformation: [
      { width: 512, height: 512, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  if (!secure_url) {
    throw new Error(
      `${model} image was unable to be upload. Please try again.`
    );
  }

  return secure_url;
};

const deleteFileFromCloudinary = async (url, folder, model) => {
  const { result } = await cloudinary.uploader.destroy(
    getPublicIdFromURL(url, folder)
  );

  if (result !== "ok") {
    throw new Error(
      `${model} image was unable to be deleted. Please try again.`
    );
  }
};

const getPublicIdFromURL = (url, folder) => {
  const parts = url.split("/");
  return `${projectName}/${folder}/${parts[parts.length - 1].split(".")[0]}`;
};

module.exports = {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
  getPublicIdFromURL,
};
