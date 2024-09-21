import {
  SlashCommandBuilder,
  type SlashCommandInteraction,
} from "@confis/discordapiwrapper";
import { Command } from "./types.ts";
import { getLatestSave } from "../saves.ts";

export const get_save: Command = {
  data: new SlashCommandBuilder().setName("get_save")
    .setDescription("Get the save data for the server"),

  execute: async (interaction: SlashCommandInteraction) => {
    const latestSave = await getLatestSave();
    if (latestSave === null) {
      await interaction.reply("No save data found");
      return;
    }

    const fileBytes = await Deno.readFile(latestSave.path);

    await interaction.reply({
      content: `The latest save is ${latestSave.path}
Last modified at ${latestSave.stat.mtime}`,
      file: { name: latestSave.name, buffer: fileBytes },
    });
  },
};
