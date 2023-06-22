import { Link } from 'react-router-dom';
import { FacebookLogo, GithubLogo, GoogleLogo } from '~/components/common/LogoCompany';
import routesConfigs from '~/configs/routes.config';

function Signin() {
  const handleSignInWithGoogle = () => {
    window.open(
      `${import.meta.env.DEV ? import.meta.env.VITE_SERVER_DEV : import.meta.env.VITE_SERVER_PROD}/auth/google`, // or process.env.NODE_ENV === 'development' ? :
      '_self',
    );
  };

  const handleSignInWithGithub = () => {
    window.open(
      `${import.meta.env.DEV ? import.meta.env.VITE_SERVER_DEV : import.meta.env.VITE_SERVER_PROD}/auth/github`, // or process.env.NODE_ENV === 'development' ? :
      '_self',
    );
  };

  return (
    <div className="relative z-0 mx-auto w-full min-w-[300px] overflow-hidden rounded-xl bg-transparent p-8 shadow-2xl">
      {/* Decorate tag -> //FIXME: using pseudo element */}
      <div className="absolute -left-2 top-0 z-[-1] h-[300px] w-[300px] origin-top-left rotate-45 rounded-xl bg-[#d1c1ff]"></div>

      {/* Title */}
      <h3 className="mb-6 text-center text-3xl font-bold uppercase">Sign in</h3>

      {/* Go back */}
      <Link to={routesConfigs.home} className="absolute left-4 top-4">
        <i className="fa-sharp fa-solid fa-arrow-left"></i>
      </Link>

      {/* Sign in via username, password */}
      <form className="">
        {/* List FormGroups */}
        <div className="relative">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="peer w-full border-b-2 border-solid border-gray-300 bg-transparent p-1.5 pl-8 outline-none transition-all focus:border-[#c772ff] [&:not(:placeholder-shown)]:border-[#c772ff]"
          />
          <label
            className="absolute left-1 top-1/2 -translate-y-1/2" /* peer-focus:text-[#c772ff] peer-[:not(:placeholder-shown)]:text-[#c772ff] */
            htmlFor="username"
          >
            {/* FIXME: Icon via CDN and using pure html */}
            <i className="fa-solid fa-user"></i>
          </label>
        </div>

        <div className="relative mt-4">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="peer w-full border-b-2 border-solid border-gray-300 bg-transparent p-1.5 pl-8 outline-none transition-all focus:border-[#c772ff] [&:not(:placeholder-shown)]:border-[#c772ff]"
          />
          <label
            className="absolute left-1 top-1/2 -translate-y-1/2" /* peer-focus:text-[#c772ff] peer-[:not(:placeholder-shown)]:text-[#c772ff] */
            htmlFor="password"
          >
            {/* FIXME: Icon via CDN and using pure html */}
            <i className="fa-solid fa-lock"></i>
          </label>
        </div>

        {/* Forgot pw & Remember me */}
        <div className="mt-1 flex items-center justify-between text-sm">
          {/* FIXME: custom checkbox */}
          <div className="flex items-center opacity-0">
            <input type="checkbox" name="remember" id="remember" />
            <span>Remember me</span>
          </div>
          <span className="cursor-not-allowed select-none text-slate-400 underline">Forgot password?</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 w-full rounded bg-[#c772ff] px-4 py-1.5 font-bold uppercase text-white"
          onClick={(e) => e.preventDefault()}
        >
          Submit
        </button>
      </form>

      {/* Sign up link */}
      <p className="mt-4 text-sm">
        Don't have an account? <span className="cursor-not-allowed text-blue-500 underline">Sign up now</span>
      </p>

      {/* Separate */}
      <div className="mt-4 flex items-center justify-between">
        <span className="h-[1px] w-[45%] bg-gray-300" />
        <span className="leading-none">or</span>
        <span className="h-[1px] w-[45%] bg-gray-300" />
      </div>

      {/* Sign in via social account */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" onClick={handleSignInWithGoogle}>
          <GoogleLogo className="h-8 w-8 transition-all duration-300 hover:scale-125" />
        </button>
        <button type="button">
          <FacebookLogo className="h-8 w-8 transition-all duration-300 hover:scale-125" />
        </button>
        <button type="button" onClick={handleSignInWithGithub}>
          <GithubLogo className="h-8 w-8 transition-all duration-300 hover:scale-125" />
        </button>
      </div>
    </div>
  );
}

export default Signin;
