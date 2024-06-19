import{ React, useState, useEffect } from 'react';


function Admin() {

    const [renginiai, setRenginiai] = useState("");
    const [vieta, setVieta] = useState("");
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/renginiai", {
            // Use relative URL
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("response");
            if (response.ok) {
              return response.json(); // Parse JSON from response
            } else {
              throw new Error("Failed to fetch events");
            }
          })
          .then((data) => {
            setChanged(false);
            setRenginiai(data); // Set renginiai state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching events:", error);
            setError("Failed to fetch events");
          });
      }, [vieta, changed]);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('lt-LT', options);
      };

      

      const getCityName = (miestoId) => {
        switch (miestoId) {
          case 1:
            return "Klaipėda";
          case 2:
            return "Kaunas";
          case 3:
            return "Vilnius";
          default:
            return "Unknown City";
        }
      };
    const deletion = async function (e, id) {
        e.preventDefault();
        console.log(id);

        try {
          await fetch("/deletion", {
            // Use relative URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
            }),
          })
            .then((response) => {
              console.log("response");
              if (response.ok) {
                setChanged(true);
                return response.json();
              } else {
                setError("nepavyko");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <h1>Admin</h1>
            {renginiai.message && (
          <>
            {renginiai.message.map((renginys, index) => (
              <div key={index}>
                <h2>{renginys.title}</h2>
                <p>Data: {formatDate(renginys.date)}</p>
                <p>Kategorija: {renginys.category}</p>
                <p>Miestas: {getCityName(renginys.miesto_id)}</p>                {/* Add other details as needed */}
                <button onClick={(e) => deletion(e, renginys.id)}>Trinti</button>
              </div>
            ))}
          </>
        )}
        </div>
    );
}

export default Admin;