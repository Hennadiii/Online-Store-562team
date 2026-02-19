import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-hidden px-4 sm:px-6 lg:px-20">
      <div className="bg-404 relative mt-5 flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center text-white">

        <div className="flex flex-col items-center animate-fadeIn">
          <h1 className="text-[clamp(70px,15vw,140px)] font-bold leading-[110%]">
            404
          </h1>

          <p className="mt-4 text-lg sm:text-xl lg:text-2xl opacity-90">
            Page not found
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex h-[56px] items-center justify-center rounded-md border border-white px-8 text-[16px] uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}
