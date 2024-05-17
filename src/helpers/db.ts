import { openDB } from "idb";

export async function openDatabase() {
  await openDB("don-calceton-cart", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("orderItems")) {
        db.createObjectStore("orderItems", { keyPath: "id" });
      }
    },
  });
}
