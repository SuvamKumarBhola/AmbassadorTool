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
    const [windows, setWindows] = useState([]);

    const messages = [
        "💡 Patience is the secret sauce of success!",
        "🚀 Great things take time—just like this timer!",
        "🎯 Stay focused, your certificate is on the way!",
        "🌱 Every second counts, use it to grow your ideas!",
        "🔥 You're almost there, keep the energy up!",
    ];
    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    // Manual open fallback
    const manualOpen = (link, index) => {
        const win = window.open(link, "_blank", "noopener,noreferrer");
        if (!win || win.closed) {
            alert("⚠️ Unable to open link. Please check your popup settings.");
        } else {
            setProgress(((index + 1) / links.length) * 100);
            setCurrentMessage(messages[index % messages.length]);
            if (index === links.length - 1) {
                setCompleted(true);
                setShowConfetti(true);
            }
        }
    };

    const handleStart = () => {
        setStarted(true);
        setProgress(0);
        setCurrentLinkIndex(0);
        setCompleted(false);
        setShowConfetti(false);
        setPopupBlocked(false);

        // Try opening first link immediately
        const firstWin = window.open(links[0], "_blank", "noopener,noreferrer");
        if (!firstWin || firstWin.closed) {
            setPopupBlocked(true);
            setStarted(false);
            setCurrentLinkIndex(-1);
            alert("⚠️ Pop-ups are blocked! Please allow them and click Restart.");
            return;
        }

        // Pre-open blank windows for the rest
        const remainingWins = links.slice(1).map(() =>
            window.open("about:blank", "_blank", "noopener,noreferrer")
        );

        if (remainingWins.some((w) => !w || w.closed)) {
            setPopupBlocked(true);
            setStarted(false);
            alert("⚠️ Pop-ups are blocked! Please allow them and click Restart.");
            return;
        }

        setWindows([firstWin, ...remainingWins]);
        setProgress((1 / links.length) * 100);
        setCurrentMessage(messages[0]);
        setCurrentLinkIndex(1); // schedule the next ones
    };

    const handleReset = () => {
        setStarted(false);
        setCurrentLinkIndex(-1);
        setProgress(0);
        setCompleted(false);
        setShowConfetti(false);
        setCurrentMessage(messages[0]);
        setPopupBlocked(false);
    };

    // Auto-navigation for the rest of the links
    useEffect(() => {
        if (
            started &&
            currentLinkIndex > 0 &&
            currentLinkIndex < links.length &&
            windows.length > 0
        ) {
            const timer = setTimeout(() => {
                const win = windows[currentLinkIndex];
                if (win && !win.closed) {
                    win.location.href = links[currentLinkIndex];
                } else {
                    setPopupBlocked(true);
                    setStarted(false);
                    alert("⚠️ Pop-up window was closed. Please keep them open.");
                    return;
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
    }, [currentLinkIndex, started, windows]);

    const features = [
        {
            icon: "🚀",
            title: "Completion",
            description: "Takes Less than 2 minutes",
        },
        {
            icon: "📊",
            title: "Certification",
            description: "Can be added on LinkedIn",
        },
        {
            icon: "🔗",
            title: "Google Student Ambassador",
            description: "Official GSA program 2025",
        },
    ];

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
        <>
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
                                Do you want to claim your{" "}
                                <b>Google Ambassador Certificate</b>?
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
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <span className="font-medium">Link {index + 1}</span>
                                <button
                                    onClick={() => manualOpen(link, index)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Open
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-center text-gray-700 text-sm">
                        🕒 Note: If auto-opening fails, you can open links manually but
                        please wait until the timer completes for the certificate prompt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <footer className="mt-12 text-center text-gray-600">
                    <p className="text-sm">© 2025 Made specially for GSA program</p>
                </footer>
            </div>
        </>
    );
};

export default Linker;
