import { Message, GuildChannel } from "discord.js";

/**
 * User Regex.
 */
const userPattern = /^(?:<@!?)?([0-9]+)>?$/;
/**
 * Discord Text Channel Regex.
 */
const channelPattern = /^(?:<#?)?([0-9]+)>?$/;

/**
 * Resolves a Discord User
 */
function userResolvable(input: string, message: Message) {
  if (userPattern.test(input)) input = input.replace(userPattern, "$1");
  let members = message.guild.members;
  const filter = (member) =>
    member.user.id === input ||
    member.displayName.toLowerCase() === input.toLowerCase() ||
    member.user.username.toLowerCase() === input.toLowerCase() ||
    member.user.tag.toLowerCase() === input.toLowerCase();
  return members.filter(filter).first();
}

/**
 * Resolves to a Boolean
 */
function booleanResolveable(input: any) {
  return Boolean(input);
}

/**
 * Resolves a Discord Text Channel
 */
function channelResolveable(input: string, message: Message) {
  if (channelPattern.test(input)) input = input.replace(channelPattern, "$1");
  let channels = message.guild.channels;
  const filter = (channel: GuildChannel) =>
    (channel.id === input ||
      channel.name.toLowerCase() === input.toLowerCase()) &&
    channel.type != "category";
  return channels.filter(filter).first();
}

/**
 * Resolves a Date
 */
function dateResolveable(input: string) {
  const date = new Date(argument);
  if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return date;
  throw "Invalid Date";
}

/**
 * Resolves to a number
 */
function numberResolveable(input: string) {
  return parseInt(input);
}
function snowflakeResolve(input: string | number) {
  input = input.toString();
}
export {
  userPattern,
  channelPattern,
  userResolvable,
  booleanResolveable,
  channelResolveable,
  dateResolveable,
  numberResolveable,
};
