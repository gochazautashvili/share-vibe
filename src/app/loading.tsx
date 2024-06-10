import React from "react";

const loading = () => {
  return (
    <main className="w-full h-screen bg-slate-800 absolute z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
    </main>
  );
};

export default loading;
