import axios from "axios";

export async function getData() {
  try {
    const res = await axios.get("http://localhost:8080/dogs");
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function putData(newData: any) {
  try {
    await axios.put("http://localhost:8080/dogs", newData);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteData(id: number) {
  try {
    await axios.delete(`http://localhost:8080/dogs/${id}`);
  } catch (e) {
    console.log(e);
  }
}
