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
        setCurrentLinkIndex(0);
        setCompleted(false);
        setShowConfetti(false);
    };

    const handleReset = () => {
        setStarted(false);
        setCurrentLinkIndex(-1);
        setProgress(0);
        setCompleted(false);
        setShowConfetti(false);
        setCurrentMessage(messages[0]);
    };


    useEffect(() => {
        if (started && currentLinkIndex >= 0 && currentLinkIndex < links.length) {
            const timer = setTimeout(() => {
                window.open(links[currentLinkIndex], "_blank", "noopener,noreferrer");
                setProgress(((currentLinkIndex + 1) / links.length) * 100);
                setCurrentMessage(messages[currentLinkIndex % messages.length]);

                if (currentLinkIndex === links.length - 1) {
                    setCompleted(true);
                } else {
                    setCurrentLinkIndex((prev) => prev + 1);
                }
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [currentLinkIndex, started]);

    const features = [
        {
            icon: "🚀",
            title: "Completion",
            description: "Takes Less than 2 minutes",
        },
        {
            icon: "📊",
            title: "Certification",
            description: "Can be added on linkdIn",
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
                animation: `bounce 2s infinite ${delay}ms`
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
                    🎉 GSA program Journey
                </h1>

                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center space-y-6">
                    {!started && !completed && (
                        <>
                            <p className="text-lg text-gray-700 text-center">
                                Click the button to start Process <b>Gemini's Adventure</b>.
                                Sit back, relax, and wait!
                            </p>
                            <button
                                className="relative block group"
                                onClick={handleStart}
                            >
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
                                    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdFakeForm/viewform", "_blank")}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <footer className="mt-12 text-center text-gray-600">
                    <p className="text-sm">
                        © 2025 Made specially for GSA programm
                    </p>
                </footer>
            </div>
        </>
    );
};


export default Linker;




