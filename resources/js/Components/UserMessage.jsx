export default function UserMessage({content}){

    return (
        <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-md w-[100%] sm:w-[40%] mt-4">
            <h4 className="flex justify-end"><span>🕒</span><span>22h:00</span></h4>
            <p className="pl-1">{content}</p>
        </div>
    )
}
