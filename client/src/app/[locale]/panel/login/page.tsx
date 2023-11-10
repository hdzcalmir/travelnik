"use client";
import UserAPI from "@/interceptor/User/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState<ILogin>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    if (data.email.length === 0 || data.password.length === 0)
      return setError("Please insert your email and password to log in.");
    try {
      const response = await UserAPI.login(data.email, data.password);
      if (response.status === 200) {
        setError("");
        router.push("/panel/dashboard");
      }
    } catch (error: any) {
      setError(error.response.data as string);
    }
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('/images/castle.png')]">
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-70">
            <div>
              <div className="flex">
                <svg
                  version="1.0"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="80px"
                  height="80px"
                  viewBox="0 0 64 64"
                  enableBackground="new 0 0 64 64"
                  xmlSpace="preserve"
                >
                  <path
                    fill="#65CF94"
                    d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
                                    C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
                                    C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                  />
                </svg>
                <h2 className="text-7xl mt-1 font-bold text-white">Travnik</h2>
              </div>
              <p className="max-w-2xl text-lg mt-3 ml-4 text-gray-300">
                Located 90 km northeast of Sarajevo, Travnik is one of
                Bosnia&apos;s most charming small towns. But while its main
                attractions can be seen in just a couple of hours, Travnik is
                much more historically important than it appears at first
                glance. Travnik, in fact, was long the seat of Bosnia&apos;s
                Ottoman viziers.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e: FormEvent) => handleForm(e)}
          className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6"
        >
          <div className="flex-1">
            <div className="text-center">
              <Image
                alt="travelnik logo"
                width={1203}
                height={503}
                src="/images/travelnik-logo.png"
              />
              <p className="mt-3 text-gray-500 ">
                Sign in to access your admin dashboard
              </p>
            </div>

            <div className="mt-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setData({ email: e.target.value, password: data.password })
                  }
                  value={data?.email}
                  placeholder="example@travelnik.ba"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-secondaryColor/80 dark:focus:border-secondaryColor/80 focus:ring-secondaryColor/80 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600  ">
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setData({ email: data?.email, password: e.target.value })
                  }
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-secondaryColor/80 dark:focus:border-secondaryColor/80 focus:ring-secondaryColor/80 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {error.length > 0 && <p className="text-red-400">{error}</p>}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondaryColor rounded-md hover:bg-secondaryColor/80 focus:outline-none focus:bg-secondaryColor/80 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
