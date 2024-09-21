import {
  SlashCommandBuilder,
  type SlashCommandInteraction,
} from "@confis/discordapiwrapper";
import { Command } from "./types.ts";

let ipAddress = "Unkonwn";
let lastUpdate = 0;

export const server_info: Command = {
  data: new SlashCommandBuilder().setName("server_info").setDescription(
    "Get the server info",
  ),
  execute: async (interaction: SlashCommandInteraction) => {
    if (ipAddress === "Unkonwn" || Date.now() - lastUpdate > 1000 * 60 * 5) {
      const info = await (await fetch("https://api.ipify.org?format=json"))
        .json();
      ipAddress = info.ip;
      lastUpdate = Date.now();
    }
    await interaction.reply(`The server IP address is ${ipAddress}`);
  },
};
