<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/chat', function(){
        return Inertia::render('ChatPage');
    })->name('chatPage');

    Route::post('/generate', function(Request $request){

        // {content: userPrompt, messageType: 'user', date: formatedDate}

        $userPrompt = $request->prompt;
        $ollamaResponse = Http::withheaders([
            "Accept"=> "Application/json",
        ])
        ->post(env('OLLAMA_API_ENDPOINT_GENERATE'),
        [
            "system" => "answer in less than 10 words in plain text",
            "model" => "llama3.1:latest",
            "prompt" => "$userPrompt",
            "keep_alive" => "5m",
            "stream" => false
        ]);

        $messageObj = [
            'content' => 'hello brother',
            'messageType' => 'assistant',
            'date' => date('Y M d h:i:s')
        ];

        if($ollamaResponse->successful()){

            $data = $ollamaResponse->json();
            $messageObj = [
                'content' => $data['response'],
                'messageType' => 'assistant',
                'date' => date('Y M d h:i:s')
            ];
        }else{
            return response()->json([$ollamaResponse])->setStatusCode(417);
        }

        return response()->json(['messageObj' => $messageObj]);
    })->name('generateResp');
});



require __DIR__.'/auth.php';
