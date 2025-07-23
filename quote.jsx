import React, { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration",
  });
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    fetch("/quotes.json")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setFilteredQuotes(data);
      });
  }, []);

  const filterQuotes = (category) => {
    if (category === "All") {
      setFilteredQuotes(quotes);
    } else {
      const filtered = quotes.filter((q) => q.category === category);
      setFilteredQuotes(filtered);
    }
  };

  const generateQuote = () => {
    if (filteredQuotes.length > 0) {
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      setQuote(random);
      setliked(false);
    }
  };

  const copyTOClipboard = () =>{
    const texttocopy = `"${quote.text}" - ${quote.author}`;
    navigator.clipboard.writeText(texttocopy).then(()=>{
        alert("Quote copied to clipboard!");
    })
    .catch(
        err=>{
            alert("Failed to copy")
        }
    )
  }

  const download = ()=>{
    const text = `"${quote.text}"\n - ${quote.author}`;
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = 'quote.txt';
    link.click();
  };


  const [liked, setliked] = useState(false);
  const togglelike = ()=>{
    setliked(!liked);
  }
  return (
    <div className="app">
      <div className="heading">
        <h1>
          <LuSparkles /> AI QUOTE GENERATOR
        </h1>
      </div>

      <div className="sub-head">
        <p>Discover wisdom, inspiration, and motivation with AI-powered quotes</p>
      </div>

      <div className="categories">
        <button onClick={() => filterQuotes("All")}>All</button>
        <button onClick={() => filterQuotes("Inspiration")}>Inspiration</button>
        <button onClick={() => filterQuotes("Wisdom")}>Wisdom</button>
        <button onClick={() => filterQuotes("Motivation")}>Motivation</button>
        <button onClick={() => filterQuotes("Success")}>Success</button>
      </div>

      {quote && (
        <div className="quote-box">
          <div className="quote">"{quote.text}"</div>
          <div className="author">— {quote.author}</div>
          <div className="category">{quote.category}</div>
        </div>
      )}

      <div className="all-buttons">
        <button onClick={generateQuote}>
          <LuSparkles /> Generate New Quote
        </button>
        <div className="options-button">
          <button onClick={copyTOClipboard}>
            <MdContentCopy />
          </button>
          <button onClick={togglelike}>
            {liked ? <FaHeart style={{color:" #38ef7d"}}/> :<FaRegHeart />}
          </button>
          <button onClick={download}>
            <MdOutlineFileDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
