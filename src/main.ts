import "@std/dotenv/load";
import {
  Client,
  Intents,
  SlashCommandInteraction,
} from "@confis/discordapiwrapper";
import { get_save } from "./commands/get_save.ts";
import { server_info } from "./commands/server_info.ts";

const CLIENT_TOKEN = Deno.env.get("CLIENT_TOKEN");
if (!CLIENT_TOKEN) {
  throw new Error("CLIENT_TOKEN env var is required");
}

const client = new Client(CLIENT_TOKEN, {
  cacheAllUsers: true,
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  shards: "auto",
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);

  client.setGlobalCommands(get_save.data, server_info.data);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction instanceof SlashCommandInteraction) {
    const command = interaction.name;
    switch (command) {
      case "get_save":
        await get_save.execute(interaction);
        break;
      case "server_info":
        await server_info.execute(interaction);
        break;
    }
  }
});

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  client.connect();
}
