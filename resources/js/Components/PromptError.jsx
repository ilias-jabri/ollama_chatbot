export default function PromptError({message}){

    if(message === 'default') message = 'something went wrong';

    return (
        <p className="flex justify-center items-center border-2 border-red-900/50 bg-red-900 dark:bg-red-900/35 dark:text-white p-4 w-[100%] rounded-md">
            {message}
        </p>
    )
}
