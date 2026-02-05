useEffect(() => {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  if (sessionId) {
    fetch("/api/success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
  }
}, []);
