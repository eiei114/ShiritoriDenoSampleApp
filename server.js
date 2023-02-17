import {serve} from "https://deno.land/std@0.138.0/http/server.ts"
import {serveDir} from "https://deno.land/std@0.138.0/http/file_server.ts";

let room1PreviousWord = "しりとり";
let room2PreviousWord = "しりとり";
let room3PreviousWord = "しりとり";
//文字列型の配列を作成
const room1WordsList = [room1PreviousWord];
const room2WordsList = [room2PreviousWord];
const room3WordsList = [room3PreviousWord];

let room1Count = 0;
let room2Count = 0;
let room3Count = 0;

let isGameOverRoom1 = false;
let isGameOverRoom2 = false;
let isGameOverRoom3 = false;

console.log("Listening on http://localhost:8000");
serve(async req => {
    const pathname = new URL(req.url).pathname;
    if (req.method === "GET" && pathname === "/room1Init") {
        return new Response(room1PreviousWord);
    }

    if (req.method === "GET" && pathname === "/room2Init") {
        return new Response(room2PreviousWord);
    }

    if (req.method === "GET" && pathname === "/room3Init") {
        return new Response(room3PreviousWord);
    }

    if (req.method === "GET" && pathname === "/room1Count") {
        return new Response(room1Count);
    }

    if (req.method === "GET" && pathname === "/room2Count") {
        return new Response(room2Count);
    }

    if (req.method === "GET" && pathname === "/room3Count") {
        return new Response(room3Count);
    }

    if (req.method === "POST" && pathname === "/room1CountUp") {
        ++room1Count;
        isGameOverRoom1 = false;
        console.log("room1Count + ：" + room1Count);
        return new Response(room1Count);
    }

    if (req.method === "POST" && pathname === "/room2CountUp") {
        ++room2Count;
        isGameOverRoom2 = false;
        console.log("room2Count ：" + room2Count);
        return new Response(room2Count);
    }

    if (req.method === "POST" && pathname === "/room3CountUp") {
        ++room3Count;
        isGameOverRoom3 = false;
        console.log("room3Count ：" + room3Count);
        return new Response(room3Count);
    }

    if (req.method === "DELETE" && pathname === "/room1CountUp") {
        if(room1Count > 0)
        --room1Count;
        console.log("room1Count ：" + room1Count);
    }

    if (req.method === "DELETE" && pathname === "/room2CountUp") {
        if (room2Count > 0)
        --room2Count;
        console.log("room2Count ：" + room2Count);
    }

    if (req.method === "DELETE" && pathname === "/room3CountUp") {
        if (room3Count > 0)
        --room3Count;
        console.log("room3Count ：" + room3Count);
    }

    if (req.method === "GET" && pathname === "/room1History") {
        return new Response(JSON.stringify(room1WordsList), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    if (req.method === "GET" && pathname === "/room2History") {
        return new Response(JSON.stringify(room2WordsList), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    if (req.method === "GET" && pathname === "/room3History") {
        return new Response(JSON.stringify(room3WordsList), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    if(req.method === "POST" && pathname === "/room1Shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;

        if (//文字が合わない
            nextWord.length > 0 &&
            room1PreviousWord.charAt(room1PreviousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", { status: 400 });
        }

        if (//すでに使われている
            room1WordsList.includes(nextWord)
        ) {
            return new Response("すでに使われている単語です。", { status: 400 });
        }

        if(//んで終わっている
            nextWord.charAt(nextWord.length - 1) === "ん"
        ) {
            room1PreviousWord = "しりとり";
            room1WordsList.length = 0;
            room1WordsList.push(room1PreviousWord);
            return new Response("「ん」で終わっています。", { status: 400 });
        }

        //文字列型の配列に追加
        room1WordsList.push(nextWord);
        room1PreviousWord = room1WordsList[room1WordsList.length - 1];
        console.log("投稿した単語 ：" + nextWord);
        return new Response((room1PreviousWord),{post: 8000});
    }

    if(req.method === "POST" && pathname === "/room2Shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;

        if (//文字が合わない
            nextWord.length > 0 &&
            room2PreviousWord.charAt(room2PreviousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", { status: 400 });
        }

        if (//すでに使われている
            room2WordsList.includes(nextWord)
        ) {
            return new Response("すでに使われている単語です。", { status: 400 });
        }

        if(//んで終わっている
            nextWord.charAt(nextWord.length - 1) === "ん"
        ) {
            room2PreviousWord = "しりとり";
            room2WordsList.length = 0;
            room2WordsList.push(room2PreviousWord);
            return new Response("「ん」で終わっています。", { status: 400 });
        }

        //文字列型の配列に追加
        room2WordsList.push(nextWord);
        room2PreviousWord = room2WordsList[room2WordsList.length - 1];
        console.log("投稿した単語 ：" + nextWord);
        return new Response((room2PreviousWord),{post: 8000});
    }

    if(req.method === "POST" && pathname === "/room3Shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;

        if (//文字が合わない
            nextWord.length > 0 &&
            room3PreviousWord.charAt(room3PreviousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", { status: 400 });
        }

        if (//すでに使われている
            room3WordsList.includes(nextWord)
        ) {
            return new Response("すでに使われている単語です。", { status: 400 });
        }

        if(//んで終わっている
            nextWord.charAt(nextWord.length - 1) === "ん"
        ) {
            room3PreviousWord = "しりとり";
            room3WordsList.length = 0;
            room3WordsList.push(room3PreviousWord);
            return new Response("「ん」で終わっています。", { status: 400 });
        }

        //文字列型の配列に追加
        room3WordsList.push(nextWord);
        room3PreviousWord = room3WordsList[room3WordsList.length - 1];
        console.log("投稿した単語 ：" + nextWord);
        return new Response((room3PreviousWord),{post: 8000});
    }

    if (req.method === "POST" && pathname === "/room1Reset") {
        room1PreviousWord = "しりとり";
        room1WordsList.length = 0;
        room1WordsList.push(room1PreviousWord);
        console.log("リセットしました。");
        return new Response(room1PreviousWord);
    }

    if (req.method === "POST" && pathname === "/room2Reset") {
        room2PreviousWord = "しりとり";
        room2WordsList.length = 0;
        room2WordsList.push(room2PreviousWord);
        console.log("リセットしました。");
        return new Response(room2PreviousWord);
    }

    if (req.method === "POST" && pathname === "/room3Reset") {
        room3PreviousWord = "しりとり";
        room3WordsList.length = 0;
        room3WordsList.push(room3PreviousWord);
        console.log("リセットしました。");
        return new Response(room3PreviousWord);
    }

    if (req.method === "POST" && pathname === "/room1GameOver") {
        isGameOverRoom1 = true;
    }

    if (req.method === "POST" && pathname === "/room2GameOver") {
        isGameOverRoom2 = true;
    }

    if (req.method === "POST" && pathname === "/room3GameOver") {
        isGameOverRoom3 = true;
    }

    if (req.method === "GET" && pathname === "/room1GameOver") {
        return new Response(isGameOverRoom1);
    }

    if (req.method === "GET" && pathname === "/room2GameOver") {
        return new Response(isGameOverRoom2);
    }

    if (req.method === "GET" && pathname === "/room3GameOver") {
        return new Response(isGameOverRoom3);
    }



        return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });
});