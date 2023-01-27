import axios from "axios";

export async function getData() {
  try {
    const res = await axios.get("http://localhost:8080/test");
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function putData(newData: any) {
  try {
    await axios.put("http://localhost:8080/test", newData);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteData(id: number) {
  try {
    await axios.delete(`http://localhost:8080/test/${id}`);
  } catch (e) {
    console.log(e);
  }
}
