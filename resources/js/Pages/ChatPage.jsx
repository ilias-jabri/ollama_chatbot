import {Link, Head} from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import UserMessage from '@/Components/UserMessage';
import ChatBotResponse from '@/Components/ChatBotResponse';
import axios from 'axios';
import PromptError from '@/Components/PromptError';

export default function ChatPage(props){

    const [messages, setMessages] = useState([]);
    const [userPrompt, setUserPrompt] = useState('');

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(userPrompt === ''){
            setErrors([...errors, {message: 'Error: cant sent an empty message', type: 'default'}]);
            setTimeout(() => {
                setErrors(prevErrs => prevErrs.slice(0, -1));
            }, 5000);
            return;
        }
        let date = new Date();
        let formatedDate = `${date.getFullYear}/${date.getFullYear}/${date.getDay} ${date.getHours}:${date.getMinutes}:${date.getSeconds}`;

        axios.post(route('generateResp'), {prompt: userPrompt}, {
            headers: {
                'Accept': 'Application/json'
            }
        }).then(res => {
            console.log(res);
            if(res.status == 200){
                setMessages([...messages, {content: userPrompt, messageType: 'user', date: formatedDate}, res.data.messageObj]);
                setUserPrompt('');
            }else{
                setErrors([...errors, 'something went wrong please try again.'])
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <AuthenticatedLayout>
            <Head title='chat' />
            <div className='flex flex-col gap-2 mx-auto mt-5 p-4 rounded-md lg:w-[70%] md:w-[80%] sm:w-[95%] h-[100%] dark:text-white dark:bg-slate-800'>
                <ChatBotResponse content={'Hello how can i help you today?.'} />
                {messages.map((msg, idx) => {
                    return msg.messageType === 'user' ? <UserMessage content={JSON.stringify(msg.content)} date={msg.date} key={idx} />
                    : msg.messageType === 'assistant' ? <ChatBotResponse content={JSON.stringify(msg.content)} date={msg.date} key={idx} /> : null
                })}
            </div>
            <div className='flex flex-col gap-2 w-[95%] max-w-[500px] mx-auto mt-5'>
                {errors.map((err, idx) => (
                    <PromptError message={err.message ?? 'default'} key={idx}/>
                ))}
            </div>
            <div className='flex gap-2 mx-auto mt-5 p-4 rounded-md lg:w-[70%] md:w-[80%] sm:w-[95%] h-[100%] dark:text-white dark:bg-slate-800'>
                <form action={route('generateResp')} method='POST' className='w-[100%] flex gap-1' onSubmit={handleSubmit}>
                        <textarea name="prompt" id="prompt" onChange={(e) => setUserPrompt(e.target.value)} value={userPrompt}
                            placeholder='your question here...'
                            className='rounded-md w-[100%] bg-slate-700 text-white'
                        ></textarea>
                        <input type="submit" value="➤" className='flex items-center bg-green-600 rounded-md px-3 py-1 w-auto text-white'/>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
