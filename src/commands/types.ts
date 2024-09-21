import {
  SlashCommandBuilder,
  SlashCommandInteraction,
} from "@confis/discordapiwrapper";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: SlashCommandInteraction) => Promise<void>;
}
