export default function Login() {
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-50">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-blue-100"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-blue-900/50 px-3 py-1.5 text-base text-blue-50 placeholder:text-blue-300 outline-1 -outline-offset-1 outline-blue-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-blue-100"
              >
                Contraseña
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-blue-400 hover:text-blue-300"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-blue-900/50 px-3 py-1.5 text-base text-blue-50 placeholder:text-blue-300 outline-1 -outline-offset-1 outline-blue-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                placeholder="********"
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
