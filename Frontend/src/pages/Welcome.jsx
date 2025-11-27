import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const { user } = useAuth();
   

 

  function goNext() {
    if (role === "admin") nav("/admin/dashboard");
    else nav("/user/dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 animate-bgMove px-4">
      
      {/* Floating Neon Balls */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floatingBall absolute rounded-full opacity-30 blur-xl"
          style={{
            width: `${80 + Math.random() * 100}px`,
            height: `${80 + Math.random() * 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-4">
          Welcome {user.name} 🎉
        </h1>

        <p className="text-lg text-white/90 max-w-md mx-auto mb-8">
          You’re all set! Get ready to explore your personalized dashboard.
        </p>

        <button
          onClick={goNext}
          className="px-8 py-3 rounded-xl bg-white/90 text-indigo-700 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Continue →
        </button>
      </div>

    </div>
  );
}
