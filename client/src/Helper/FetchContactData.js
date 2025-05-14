const FetchContactData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({
        data: data.ContactData,
        success: true,
      });
      console.log("success", "Contact");
    } catch (error) {
      console.error("Error fetching data:", error);
      reject({
        message: error.message,
        success: false,
      });
    }
  });
};

export default FetchContactData;
