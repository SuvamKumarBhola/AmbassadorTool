import React, { useState, useEffect } from "react";

const Linker = () => {
  const links = [
    "https://gemini.google.com/app",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=2622&promptId=17",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=2622&promptId=16",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=2622&promptId=15",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=2622&promptId=14",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=2622&promptId=13",
  ];

  const [started, setStarted] = useState(false);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [visitedLinks, setVisitedLinks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null); // ✅ track which link was copied

  const messages = [
    "💡 Patience is the secret sauce of success!",
    "🚀 Great things take time—just like this timer!",
    "🎯 Stay focused, your certificate is on the way!",
    "🌱 Every second counts, use it to grow your ideas!",
    "🔥 You're almost there, keep the energy up!",
  ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  const handleStart = () => {
    setStarted(true);
    setProgress(0);
    setCompleted(false);
    setShowConfetti(false);
    setPopupBlocked(false);
    setVisitedLinks([]);

    // Open first link immediately
    const firstWin = window.open(links[0], "_blank", "noopener,noreferrer");
    if (!firstWin || firstWin.closed) {
      setPopupBlocked(true);
      return;
    }

    setVisitedLinks([0]);
    setProgress((1 / links.length) * 100);
    setCurrentMessage(messages[0]);
    setCurrentLinkIndex(1);
  };

  const handleReset = () => {
    setStarted(false);
    setCurrentLinkIndex(-1);
    setProgress(0);
    setCompleted(false);
    setShowConfetti(false);
    setCurrentMessage(messages[0]);
    setPopupBlocked(false);
    setVisitedLinks([]);
    setCopiedIndex(null);
  };

  // Auto open one by one
  useEffect(() => {
    if (started && currentLinkIndex > 0 && currentLinkIndex < links.length) {
      const timer = setTimeout(() => {
        const win = window.open(
          links[currentLinkIndex],
          "_blank",
          "noopener,noreferrer"
        );

        if (!win || win.closed) {
          setPopupBlocked(true);
        } else {
          setVisitedLinks((prev) => [...new Set([...prev, currentLinkIndex])]);
        }

        setProgress(((currentLinkIndex + 1) / links.length) * 100);
        setCurrentMessage(messages[currentLinkIndex % messages.length]);

        if (currentLinkIndex === links.length - 1) {
          setCompleted(true);
          setShowConfetti(true);
        } else {
          setCurrentLinkIndex((prev) => prev + 1);
        }
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [currentLinkIndex, started]);

  // Manual open
  const manualOpen = (link, index) => {
    const win = window.open(link, "_blank", "noopener,noreferrer");
    if (win && !win.closed) {
      setVisitedLinks((prev) => [...new Set([...prev, index])]);
      setProgress(((visitedLinks.length + 1) / links.length) * 100);
      setCurrentMessage(messages[index % messages.length]);

      if (visitedLinks.length + 1 === links.length) {
        setCompleted(true);
        setShowConfetti(true);
      }
    } else {
      setPopupBlocked(true);
    }
  };

  // Copy link
  const copyLink = async (link, index) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const ConfettiParticle = ({ delay }) => (
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `bounce 2s infinite ${delay}ms`,
      }}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <ConfettiParticle key={i} delay={i * 50} />
          ))}
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        🎉 GSA Program Journey
      </h1>

      {/* Popup Blocked Banner */}
      {popupBlocked && (
        <div className="bg-yellow-200 border border-yellow-400 text-yellow-800 px-4 py-2 rounded mb-4 text-center max-w-md">
          ⚠️ Pop-ups may be blocked. Please allow them, or use the manual links
          below. If on mobile, try opening on a PC for better experience.
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center space-y-6">
        {!started && !completed && (
          <>
            <p className="text-lg text-gray-700 text-center">
              Click the button to start <b>Gemini's Adventure</b>. Sit back,
              relax, and wait!
            </p>
            <button className="relative block group" onClick={handleStart}>
              <span className="absolute inset-0 bg-indigo-500 rounded-lg"></span>
              <div className="transition bg-black relative border-2 rounded-lg -translate-x-2 -translate-y-2 w-30">
                <div className="p-3">
                  <p className="text-xl font-medium text-amber-50">Start</p>
                </div>
              </div>
            </button>
          </>
        )}

        {started && !completed && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-500 h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-800 font-medium">
              {Math.round(progress)}% completed
            </p>
            <p className="italic text-center text-purple-600 font-semibold">
              {currentMessage}
            </p>
          </>
        )}

        {completed && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">
              🎊 Adventure Completed!
            </h2>
            <p className="text-lg">
              Do you want to claim your <b>Google Ambassador Certificate</b>?
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdFakeForm/viewform",
                    "_blank"
                  )
                }
                className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white"
              >
                ✅ Yes, claim it!
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl border border-gray-400 hover:bg-gray-100"
              >
                ❌ No thanks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Manual Links Section */}
      <div className="mt-8 w-full max-w-md border border-gray-300 rounded-lg p-4 bg-white shadow-md text-black">
        <h3 className="text-lg font-bold mb-3 text-center">🔗 Manual Links</h3>
        <ul className="space-y-2">
          {links.map((link, index) => {
            const visited = visitedLinks.includes(index);
            return (
              <li
                key={index}
                className={`flex justify-between items-center px-3 py-2 rounded-md transition ${
                  visited ? "bg-green-100" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium flex-1">
                  {visited ? "✅ " : "🔗 "} Link {index + 1}
                </span>
                <div className="flex gap-2">
                  {!visited && (
                    <button
                      onClick={() => manualOpen(link, index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Open
                    </button>
                  )}
                  <button
                    onClick={() => copyLink(link, index)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    {copiedIndex === index ? "✅ Copied" : "📋 Copy"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-center text-gray-700 text-sm">
          🕒 Note: If auto-opening fails, open links manually. You can also copy
          and share them. Please wait until the timer completes for the
          certificate prompt.
        </p>
      </div>
    </div>
  );
};

export default Linker;
