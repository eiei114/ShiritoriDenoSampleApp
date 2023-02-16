import {serve} from "https://deno.land/std@0.138.0/http/server.ts"
import {serveDir} from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = "しりとり";
//文字列型の配列を作成
const wordsList = [previousWord];

console.log("Listening on http://localhost:8000");
serve(async req => {
    const pathname = new URL(req.url).pathname;
    console.log(pathname);

    if (req.method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord,wordsList);
    }
    if(req.method === "POST" && pathname === "/shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;

        if (//文字が合わない
            nextWord.length > 0 &&
            previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", { status: 400 });
        }

        if (//すでに使われている
            wordsList.includes(nextWord)
        ) {
            return new Response("すでに使われている単語です。", { status: 400 });
        }

        if(//んで終わっている
            nextWord.charAt(nextWord.length - 1) === "ん"
        ) {
            return new Response("「ん」で終わっています。", { status: 400 });
        }

        //文字列型の配列に追加
        wordsList.push(nextWord);
        console.log(wordsList);
        previousWord = wordsList[wordsList.length - 1];
        return new Response((previousWord),{post: 8000});
    }

    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });
});