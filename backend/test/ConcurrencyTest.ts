import fetch from "node-fetch";

const URL = "http://localhost:3000/account/";

const payload = {
  username: "peninsulaTest",
  amount: 300,
  type: "withdraw",
};

const makeRequest = async (index: number) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { index, data };
};

const TOTAL_REQUESTS = 7;

Promise.all(
  Array.from({ length: TOTAL_REQUESTS }, (_, i) => makeRequest(i))
)
  .then(results => {
    console.log("Resultados:");
    results.forEach(r => console.log(`Request ${r.index}:`, r.data));
  })
  .catch(console.error);
