export const callGetData = async () => {
  const response = await fetch("/getData", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  if (response.status !== 200) throw Error(response.statusText);
  return data;
};
<<<<<<< HEAD

export const callDateRangeFilterData = async (params) => {
  const response = await fetch("/getDataByDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ dateandTime: params }),
  });
  const data = await response.json();
  if (response.status !== 200) throw Error(response.statusText);
  return data;
};
=======
>>>>>>> 55348779dde8e007463ae19ede0ee0f16c218c6a
