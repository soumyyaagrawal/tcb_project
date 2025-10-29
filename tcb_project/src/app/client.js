// app/page.js
'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
export default function Client({ articles }) {
  const [summary, setSummary] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showtoast, setShowToast] = useState(false);



  const handleSummarize = async (text) => {``

    setShowToast(true);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    // alert("Generating summary, please wait...");
    const data = await res.json();
    setSummary(data.summary);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden flex-wrap p-8">

//blobs
  <div class="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob z-0"></div>
  <div class="absolute top-1/2 right-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
  <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <h1 className="text-purple-700 text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 text-transparent bg-clip-text">
          InsightDigest
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map(article => (
          <div key={article.url} className="bg-gradient-to-tr from-[hsla(239,100%,67%)] to-[hsla(200,89%,90%)] shadow p-4 rounded-xl">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-52 object-cover rounded-lg"
            />
            <h1 className=" line-clamp-2 hover:line-clamp-none text-black lg font-semibold mt-2">{article.title}</h1> <br />
            <p className=" text-black sm text-gray-600 mt-2">{article.content}</p>
            <a
              href={article.url}
              target="_blank"
              className="text-blue-900 mt-2 inline-block"
            >
              Read full 
            </a> <br/>
            <button
              onClick={() => handleSummarize(article.content || article.description || article.title)}
              className="   w-[345px] text-gray-900 text-md text-center mt-2 p-2 bg-gray-200 shadow p-1 rounded-xl cursor-pointer"
            >
              summarize  
            </button>
          </div>
        ))}
      </div>

{showtoast && toast.error("Generating summary, please wait...",{
  autoClose: 3000
}) } 



      {/* Modal */}
      {showModal && (
        <Summarymodal text={summary} onClose={closeModal} />
      )}
    </main>
  );
} 

function Summarymodal({ text, onClose }) {
  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50 ">
      <div className=" w-[280px] bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <span className="text-gray-100">{text}</span>
        <br/>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

