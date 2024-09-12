export default function ChatBotResponse({content, isLoading}){

    return (
        <div className={"p-2 rounded-md w-[100%] sm:w-[70%] mt-2 self-end".concat(isLoading ? " animate-pulse dark:bg-black bg-slate-500" : ' dark:bg-slate-900 bg-slate-300')}>
            <h4 className="flex justify-end"><span>🕒</span><span>22h:00</span></h4>
            <p className="pl-1">{content}</p>
        </div>
    )
}
