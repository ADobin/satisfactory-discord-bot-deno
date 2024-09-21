FROM denoland/deno:1.46.3

WORKDIR /app

USER deno

COPY deno.* .
RUN deno cache deno.json

COPY . .
RUN deno cache src/main.ts
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "src/main.ts"]
