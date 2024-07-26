import { ActionFunctionArgs } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getOrderImage } from "routes/Orders/api";

export const orderActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("order");
  switch (action) {
    case "downloadOrderImages":
      return handleOrderImagesDownload(formData);
    default:
      break;
  }
};

const handleOrderImagesDownload = async (formData: FormData) => {
  const orderId = formData.get("orderId");
  const orderImageNames = formData.getAll("orderImageNames") as string[];
  const zip = new JSZip();
  for (const imageName of orderImageNames) {
    const { file, status } = await getOrderImage(imageName);
    if (status !== 200) {
      return { message: "Error downloading images" };
    }
    zip.file(imageName, file);
  }
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `order-${orderId}.zip`);
  });
  return true;
};
