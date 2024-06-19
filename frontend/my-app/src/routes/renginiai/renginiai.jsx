import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { FaStar } from "react-icons/fa";
import './renginiai.css'

function Renginiai() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [renginiai, setRenginiai] = useState("");
  const [changed, setChanged] = useState(false);
  const [rated, setRated] = useState(false);

  console.log(ReactSession.get("userEmail"));

  const vieta = useParams().miestas;

  useEffect(() => {
    console.log(vieta);
    fetch("/renginiai/" + vieta + "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
        console.log("response");
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch events");
        }
      })
      .then((data) => {
        setChanged(false);
        setRenginiai(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events");
      });
  }, [vieta, changed]);

  useEffect(() => {
    const sessionLoggedIn = ReactSession.get("loggedIn");
    if (sessionLoggedIn) {
      setLoggedIn(sessionLoggedIn);
    }
  }, []);

  const add = async function (e) {
    e.preventDefault();

    const pavadinimas = document.getElementById("pavadinimas").value;
    const laikas = document.getElementById("laikas").value;
    const vieta = document.getElementById("vieta").value;
    const category = document.getElementById("category").value;
    const formData = new FormData();
    formData.append("photo", document.getElementById("photo").files[0]);
  




    try {
      await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pavadinimas,
          laikas,
          vieta,
          category,
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

  const rate = async function (e, id, rating) {
    e.preventDefault();
    const email = ReactSession.get("userEmail");
    console.log(id, rating);
    try {
      await fetch("/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          rating,
          email,
        }),
      })
        .then((response) => {
          console.log("response");
          if (response.ok) {
            setRated(true)
            setTimeout(() => {
              setRated(false)
            }, 3000)
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('lt-LT', options);
  };

  return (
    <div className="renginiai">
      <h1>{useParams().miestas}</h1>
      <div className="renginiai">
        { rated && 
            <div className="rated">
                Ivertinta!
            </div>
        }
        {renginiai.message && (
          <>
            {renginiai.message.map((renginys, index) => (
              <div key={index}>
                <h2>{renginys.title}</h2>
                <p>Data: {formatDate(renginys.date)}</p>
                <p>Kategorija: {renginys.category}</p>
                <p>Vertinti: <div className="stars">
                    <FaStar onClick={(e) => rate(e, renginys.id, 5)} className="star"/>
                    <FaStar onClick={(e) => rate(e, renginys.id, 4)} className="star"/>
                    <FaStar onClick={(e) => rate(e, renginys.id, 3)} className="star"/>
                    <FaStar onClick={(e) => rate(e, renginys.id, 2)} className="star"/>
                    <FaStar onClick={(e) => rate(e, renginys.id, 1)} className="star"/>
                    </div>
                    </p>
              </div>
            ))}
          </>
        )}
      </div>

      {(loggedIn && (
        <div className="add">
          <h2>Pridėti renginį</h2>
          <form action="" onSubmit={(e) => add(e)}>
            <input
              type="text"
              name=""
              id="pavadinimas"
              placeholder="Pavadinimas"
            />
            <label htmlFor="date">Laikas</label>
            <input type="date" name="" id="laikas" />
            <select name="" id="vieta">
              <option value="1">Klaipėda</option>
              <option value="2">Kaunas</option>
              <option value="3">Vilnius</option>
            </select>
            <select name="" id="category">
                <option value="Koncertas">Koncertas</option>
                <option value="Talentų šau">Talentų šau</option>
                <option value="Turas">Turas</option>
                <option value="Maratonas">Maratonas</option>
                <option value="Pramogos">Pramogos</option>
            </select>

            <input type="file" accept="image/*" name="" id="photo" />
            
            <button type="submit">Pridėti</button>
          </form>
        </div>
      )) ||
        "prisijunkite, kad galėtumete pridėti renginį"}
    </div>
  );
}

export default Renginiai;
