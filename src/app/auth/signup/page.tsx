import dynamic from "next/dynamic";

const Form = dynamic(() => import("./Form"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[600px] h-[424px] bg-slate-400 animate-pulse mx-auto my-auto rounded-lg flex items-center justify-center">
      <h1 className="text-2xl text-white">
        Sign Up Component Is Loading Please Wait...
      </h1>
    </div>
  ),
});
const SignUpPage = () => {
  return (
    <main className="w-full h-[90vh] flex items-center justify-center">
      <Form />
    </main>
  );
};

export default SignUpPage;
