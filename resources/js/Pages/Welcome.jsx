import { Link, Head } from "@inertiajs/react";

export default function Welcome(props){



    return (
        <>
            <Head title="Welcome"/>
            <div className="h-screen bg-slate-100 dark:bg-gray-950 dark:text-white text-black">
                <header className="px-4 flex items-center justify-between">
                    <div>
                        <img src="./imgs/logo512.png" className="w-[70px]" alt="nav bar logo" />
                    </div>
                    <nav>
                        <ul className="flex gap-5 justify-end p-3">
                            <li>
                                <Link href={route('register')}>Register</Link>
                            </li>
                            <li>
                                <Link href={route('login')}>Login</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className="h-auto">

                    <div className="hover:border-red-200 dark:hover:border-red-950 h-auto flex flex-col justify-center items-center  bg-slate-200 dark:bg-slate-950 dark:text-white mx-auto mt-10 border-2 border-slate-100 dark:border-slate-800 rounded-md w-1/2">
                        <div className="mx-auto flex justify-center items-center mt-5">
                            <img src='./imgs/logo.png' alt="laravel_llama logo" className="w-1/4 sm:w-[30s%]"/>
                        </div>
                        <h1 className="mb-5">Welcome To <strong className="text-red-500">Ollara</strong> chatbot</h1>
                        <Link href={route('dashboard')} className="p-2 bg-red-500 text-white hover:bg-red-900 dark:hover:bg-slate-900 dark:hover:border-red-800 dark:bg-red-700 rounded-md mb-5">Start a Conversation Now!</Link>
                    </div>

                </main>
            </div>
        </>
    )
}
