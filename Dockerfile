FROM denoland/deno:latest as base

WORKDIR /app

COPY . ./

RUN deno cache server.js
RUN deno cache https://deno.land/std@0.140.0/http/file_server.ts

CMD ["run", "--allow-net", "--allow-read" ,"server.js"]