import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDMxMjYwMTE2QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY2NDU5NSwiaWF0IjoxNzUwNjYzNjk1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTZkNTFiNjktZjRkNC00NWI4LTljNWItM2NiOTY2Nzc1MWY5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia3VuY2hlIHBydWRodmkgc2FpIGJoYXZhbmkgcHJhc2FkIiwic3ViIjoiYTYxMDI5MTQtMGM2ZS00NTEzLWE5ODMtYTU2ZGMwMTg5NWQxIn0sImVtYWlsIjoiMjIwMzAzMTI2MDExNkBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoia3VuY2hlIHBydWRodmkgc2FpIGJoYXZhbmkgcHJhc2FkIiwicm9sbE5vIjoiMjIwMzAzMTI2MDExNiIsImFjY2Vzc0NvZGUiOiJUUnpnV00iLCJjbGllbnRJRCI6ImE2MTAyOTE0LTBjNmUtNDUxMy1hOTgzLWE1NmRjMDE4OTVkMSIsImNsaWVudFNlY3JldCI6Inl2U3N0Zm16VlVCc2ZxQVUifQ.hSvigZiS7BvKtsh5mDsUh-SmkisG6TYNUj3mlvw82NM";

export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      "http://20.244.56.144/evaluate-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}
